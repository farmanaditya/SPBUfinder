import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faGear, faMapLocation, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { WebView } from 'react-native-webview';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import DataSPBU from './DataSPBU'
import Listdata from './Listdata'
import ProfilPage from './ProfilePage'

function HomeScreen() {
  return (
    <DataSPBU />
  );
}

function DataMahasiswaScreen() {
  return (
    <Listdata />
  );
}

function EditScreen() {
  return (
    <Editdata />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Maps" component={HomeScreen}
          options={{
            headerShown: false,
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