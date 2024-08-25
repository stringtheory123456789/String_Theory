import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function MusicScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState({
    positionMillis: 0,
    durationMillis: 0,
  });

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('./peace.mp3'), {}, onPlaybackStatusUpdate);
    setSound(sound);
    setIsPlaying(true);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function pauseSound() {
    if (sound) {
      console.log('Pausing Sound');
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function stopSound() {
    if (sound) {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  function onPlaybackStatusUpdate(status) {
    setPlaybackStatus(status);
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const progress = playbackStatus.positionMillis / playbackStatus.durationMillis || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Dashboard', {
              username: route.params.username,
              result: route.params.result,
              depression: route.params.depression,
            })
          }>
          <FontAwesome name="arrow-left" size={30} color="#333333" />
        </TouchableOpacity>
      </View>
      <View style={styles.con}>
        <Image style={styles.albumCover} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Calm Yourself</Text>
        <Text style={styles.artist}></Text>
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.controls}>
          <View style={styles.controlButtonContainer}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { paddingLeft: isPlaying ? 0 : 5 }, // Apply paddingLeft only when not playing
              ]}
              onPress={isPlaying ? pauseSound : playSound}
            >
              <FontAwesome name={isPlaying ? 'pause' : 'play'} size={25} color="#333333" />
            </TouchableOpacity>
          </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DAC4FF',
    padding: 10,
  },
  con: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  header: {
    alignSelf: 'flex-start',
    marginTop: 35,
    marginLeft: 10,
    marginBottom: 20
  },
  albumCover: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderColor: 'orange',
    borderWidth: 3
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    margin: 10,
  },
  controlButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 120,
    padding: 10,
    borderColor: 'orange',
    borderWidth: 3,
  },
  progressBarContainer: {
    height: 7,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 25,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'orange',
    borderRadius: 5,
  },
});
