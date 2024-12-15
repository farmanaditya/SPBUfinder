import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import spbuData from './spbu.json'; // Local JSON data

const DataSPBU = () => {
  const [leafletMap, setLeafletMap] = useState('');
  const [firebaseData, setFirebaseData] = useState([]);

  // Fetch data from Firebase
  const fetchFirebaseData = async () => {
    try {
      const response = await fetch(
        'https://spbu-finder-1bd24-default-rtdb.firebaseio.com/spbu.json'
      );
      const result = await response.json();
      if (result) {
        const formattedData = Object.keys(result).map((key) => ({
          id: key,
          ...result[key],
        }));
        setFirebaseData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching SPBU data from Firebase:', error);
    }
  };

  useEffect(() => {
    fetchFirebaseData();
  }, []);

  useEffect(() => {
    // Combine local JSON data and Firebase data
    const combinedData = [...spbuData, ...firebaseData];

    // Generate markers for both datasets
    const generateMarkers = () => {
      return combinedData
        .map(
          (spbu) => `
            L.marker([${spbu.Latitude}, ${spbu.Longitude}])
              .addTo(map)
              .bindPopup('<b>${spbu.Nama || spbu["Nama SPBU"]}</b><br>${spbu.Alamat || ''}<br>Jam Buka: ${spbu.JamBuka || ''}<br>Jam Tutup: ${spbu.JamTutup || ''}<br><button onclick="openInGoogleMaps(${spbu.Latitude}, ${spbu.Longitude})">Open in Google Maps</button>');
          `
        )
        .join('');
    };

    // Generate the full Leaflet map HTML
    const mapHtml = `
      <!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
</head>
<body style="margin:0; padding:0;">
  <div id="map" style="height:100vh;"></div>
  <script>
    function openInGoogleMaps(lat, lng) {
      const gmapsUrl = \`https://www.google.com/maps?q=\${lat},\${lng}\`;
      window.open(gmapsUrl, '_blank');
    }

    var map = L.map('map').setView([-7.797068, 110.370529], 13);

    // Define base layers
    var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'farmanaditya@2024'
    });

    var esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    });

    var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'farmanaditya@2024'
    });

    // Add default layer
    openStreetMap.addTo(map);

    // Add layer control
    var baseMaps = {
      "OpenStreetMap": openStreetMap,
      "ESRI Satellite": esriSatellite,
      "OpenTopoMap": openTopoMap
    };
    L.control.layers(baseMaps).addTo(map);

    // Marker Cluster
    var markers = L.markerClusterGroup();

    // Add markers
    ${combinedData
      .map(
        (spbu) => `
          var marker = L.marker([${spbu.Latitude}, ${spbu.Longitude}])
            .bindPopup('<b>${spbu.Nama || spbu["Nama SPBU"]}</b><br>${spbu.Alamat || ''}<br>Jam Buka: ${spbu.JamBuka || ''}<br>Jam Tutup: ${spbu.JamTutup || ''}<br><button onclick="openInGoogleMaps(${spbu.Latitude}, ${spbu.Longitude})">Open in Google Maps</button>');
          markers.addLayer(marker);
        `
      )
      .join('')}

    // Add marker clusters to map
    map.addLayer(markers);
  </script>
</body>
</html>
    `;

    setLeafletMap(mapHtml);
  }, [firebaseData]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletMap }}
        style={styles.map}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default DataSPBU;