import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Image
} from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';

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
        <Title style={styles.profileName}>Farmana Ditya Alya Safiri</Title>
        <Paragraph style={styles.profileBio}>GIS Student</Paragraph>
        <Card.Content>
          <Title style={styles.cardTitle}>Tentang Aplikasi</Title>
          <Paragraph style={styles.Paragraph}>
            SPBU Finder adalah aplikasi yang dirancang untuk membantu menemukan lokasi SPBU
            terdekat dengan cepat dan mudah. Aplikasi ini dilengkapi dengan fitur peta interaktif clustering, dan navigasi dengan Google Maps untuk navigasi langsung ke lokasi melalui peta, serta kemampuan untuk
            menambahkan data SPBU baru.
          </Paragraph>
          <Paragraph style={styles.Paragraph}> Let's Connect!</Paragraph>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/* LinkedIn Icon */}
            <TouchableOpacity onPress={openLinkedIn} style={{ marginHorizontal: 10 }}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' }}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>

      {/* Instagram Icon */}
      <TouchableOpacity onPress={openInstagram} style={{ marginHorizontal: 10 }}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/600px-Instagram_logo_2022.svg.png' }}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>

      {/* GitHub Icon */}
      <TouchableOpacity onPress={openGithub} style={{ marginHorizontal: 10 }}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' }}
          style={{ width: 60, height: 60 }}
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
    marginBottom: 110,
    backgroundColor: 'white',
    paddingBottom: 100,
  },
  card: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#EEF5FF',
    shadowColor: '#000',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: -10,
    paddingBottom: 40,
  },
  Paragraph: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 20,
  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    resizeMode: 'cover',
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
    color: 'blue',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default ProfilePage;