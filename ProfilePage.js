import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const ProfilePage = () => {
  const openLinkedIn = async () => {
    try {
      await Linking.openURL('https://www.linkedin.com/in/farmana-ditya-5a81a8266/');
    } catch (error) {
      console.error('Failed to open LinkedIn:', error);
    }
  };

  const openInstagram = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/frmnalya/');
    } catch (error) {
      console.error('Failed to open Instagram:', error);
    }
  };

  const openGithub = async () => {
    try {
      await Linking.openURL('https://github.com/farmanaditya');
    } catch (error) {
      console.error('Failed to open Github:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {/* Foto Profil */}
        <View style={styles.avatarContainer}>
        <Text style={styles.createdByText}>Dikembangkan oleh:</Text>
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/v2/D4D03AQFgiMt2pNxpzg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706357673555?e=1740009600&v=beta&t=3abDU3HFWyHVxrDQTitmcChYEWnQTU8ksO7w7IGLkUY', 
            }}
            style={styles.avatar}
          />
        </View>

        {/* Informasi Profil */}
        <Title style={styles.profileName}>Farmana Ditya Alya Safiri</Title>
        <Paragraph style={styles.profileBio}>GIS Student</Paragraph>

        {/* Tentang Aplikasi */}
        <Card.Content>
          <Title style={styles.cardTitle}>Tentang Aplikasi</Title>
          <Paragraph style={styles.paragraph}>
            SPBU Finder adalah aplikasi yang dirancang untuk membantu menemukan lokasi SPBU
            terdekat dengan cepat dan mudah. Aplikasi ini dilengkapi dengan fitur peta interaktif clustering,
            navigasi dengan Google Maps, serta kemampuan untuk menambahkan data SPBU baru.
            Aplikasi ini disusun untuk memenuhi penugasan responsi Praktikum PGPBL 2024.
          </Paragraph>

          {/* Let's Connect */}
          <Title style={styles.cardTitle}>Let's Connect!</Title>
          <View style={styles.socialContainer}>
            {/* LinkedIn */}
            <TouchableOpacity onPress={openLinkedIn} style={styles.socialIcon}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
                }}
                style={styles.iconImage}
              />
            </TouchableOpacity>

            {/* Instagram */}
            <TouchableOpacity onPress={openInstagram} style={styles.socialIcon}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/600px-Instagram_logo_2022.svg.png',
                }}
                style={styles.iconImage}
              />
            </TouchableOpacity>

            {/* GitHub */}
            <TouchableOpacity onPress={openGithub} style={styles.socialIcon}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
                }}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  card: {
    backgroundColor: '#EEF5FF',
    shadowColor: '#000',
    borderRadius: 20, // Hapus border radius agar Card penuh
    marginHorizontal: 5, // Hilangkan margin horizontal
    marginVertical: 5,   // Hilangkan margin vertikal jika perlu
    paddingTop: 55,      // Tambahkan padding di atas agar avatar tidak terpotong
    paddingBottom: 40,   // Tambahkan padding bawah agar teks tidak kepotong
    overflow: 'visible', 
    elevation: 10,        
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  profileBio: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 15,
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginTop: 5,
    marginHorizontal: 10,
    lineHeight: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  createdByText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10, // Spasi antara teks dan atas Card
  },  
});

export default ProfilePage;
