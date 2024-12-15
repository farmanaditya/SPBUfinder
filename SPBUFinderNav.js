import * as React from 'react';
import { Text, View, Image } from 'react-native'; // Added Image import
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faMapLocation, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import DataSPBU from './DataSPBU';
import Listdata from './Listdata';
import ProfilPage from './ProfilePage';

function HomeScreen() {
  return <DataSPBU />;
}

function DataMahasiswaScreen() {
  return <Listdata />;
}

function EditScreen() {
  return <Editdata />; // Make sure Editdata is correctly defined or imported
}

const Tab = createBottomTabNavigator();

function Editdata() { // Placeholder for Editdata component
  return <View><Text>Edit Data Screen</Text></View>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Maps" component={HomeScreen}
          options={{
            headerShown: true,
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: 'https://img.freepik.com/premium-vector/gas-station-isolated-white-simple-minimalist-vector-art-illustration_530563-1023.jpg' }}
                  style={{ width: 60, height: 60, marginRight: 10 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>SPBU Finder</Text>
              </View>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMapLocation} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen name="Tambah SPBU" component={DataMahasiswaScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMapMarker} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen name="Profil" component={ProfilPage}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
