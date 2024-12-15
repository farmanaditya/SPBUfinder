import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const SPBUManager = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    Nama: '',
    Alamat: '',
    Latitude: '',
    Longitude: '',
    JamBuka: '',
    JamTutup: '',
  });

  // Fetch data from Firebase
  const fetchSPBUData = async () => {
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
        setData(formattedData);
      } else {
        setData([]); // Jika data kosong
      }
    } catch (error) {
      console.error('Error fetching SPBU data:', error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSPBUData();
  }, []);

  // Open Add/Edit Modal
  const handleOpenModal = (item = null) => {
    setIsEditing(!!item);
    setCurrentItem(item);
    setFormData(
      item || {
        Nama: '',
        Alamat: '',
        Latitude: '',
        Longitude: '',
        JamBuka: '',
        JamTutup: '',
      }
    );
    setModalVisible(true);
  };

  // Handle Save (Add or Edit)
  const handleSave = async () => {
    try {
      if (isEditing) {
        // Update existing item in Firebase
        await fetch(
          `https://spbu-finder-1bd24-default-rtdb.firebaseio.com/spbu/${currentItem.id}.json`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // Add new item to Firebase
        await fetch(
          'https://spbu-finder-1bd24-default-rtdb.firebaseio.com/spbu.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
      }
      fetchSPBUData();
    } catch (error) {
      console.error('Error saving SPBU data:', error);
    } finally {
      setModalVisible(false);
      setFormData({
        Nama: '',
        Alamat: '',
        Latitude: '',
        Longitude: '',
        JamBuka: '',
        JamTutup: '',
      });
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await fetch(
              `https://spbu-finder-1bd24-default-rtdb.firebaseio.com/spbu/${id}.json`,
              {
                method: 'DELETE',
              }
            );
            fetchSPBUData();
          } catch (error) {
            console.error('Error deleting SPBU data:', error);
          }
        },
      },
    ]);
  };
if (isLoading) {
  return (
    <SafeAreaView style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="blue" />
      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => handleOpenModal()}>
        <FontAwesomeIcon icon={faPlus} size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* List Section */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardtitle}>{item.Nama}</Text>
              <Text>{item.Alamat}</Text>
              <Text>Latitude: {item.Latitude}</Text>
              <Text>Longitude: {item.Longitude}</Text>
              <Text>Jam Buka: {item.JamBuka}</Text>
              <Text>Jam Tutup: {item.JamTutup}</Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleOpenModal(item)}
            >
              <FontAwesomeIcon icon={faEdit} size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(item.id)}
            >
              <FontAwesomeIcon icon={faTrash} size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => handleOpenModal()}>
        <FontAwesomeIcon icon={faPlus} size={24} color="white" />
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit SPBU' : 'Add SPBU'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nama SPBU"
              value={formData.Nama}
              onChangeText={(text) => setFormData({ ...formData, Nama: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              value={formData.Alamat}
              onChangeText={(text) => setFormData({ ...formData, Alamat: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={formData.Latitude}
              keyboardType="numeric"
              onChangeText={(text) =>
                setFormData({ ...formData, Latitude: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={formData.Longitude}
              keyboardType="numeric"
              onChangeText={(text) =>
                setFormData({ ...formData, Longitude: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Jam Buka"
              value={formData.JamBuka}
              onChangeText={(text) =>
                setFormData({ ...formData, JamBuka: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Jam Tutup"
              value={formData.JamTutup}
              onChangeText={(text) =>
                setFormData({ ...formData, JamTutup: text })
              }
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SPBUManager;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: 'blue',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
});