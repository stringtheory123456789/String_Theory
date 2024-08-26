
import React, { Component, useState } from 'react';
import WebView from 'react-native-webview';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';
import { LogBox } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
// import { WebView } from 'react-native-webview';
// import { WebView } from 'react-native-webview'
const { width: screenWidth } = Dimensions.get('window');

LogBox.ignoreAllLogs();

console.disableYellowBox = true;

import LoginScreen from './login';

const currentDate = new Date().toLocaleDateString();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  handlePostEntry = async () => {

  };


  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={() => <HomeScreen username={this.props.route.params.username} result={this.props.route.params.result} depression={this.props.route.params.depression} />}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{
                  uri:
                    'https://cdn-icons-png.flaticon.com/128/8166/8166618.png',
                }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={JournalScreen}

          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{
                  uri:
                    'https://cdn-icons-png.flaticon.com/128/3021/3021066.png',
                }

                }
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={() => <ProfileScreen username={this.props.route.params.username} result={this.props.route.params.result} depression={this.props.route.params.depression} />}

          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{
                  uri:
                    'https://cdn-icons-png.flaticon.com/128/747/747376.png',
                }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={() => <ChatScreen username={this.props.route.params.username} result={this.props.route.params.result} depression={this.props.route.params.depression} />}

          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={{
                  uri: `${require('../assets/bubble-chat.png')}`,
                }}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        { }
      </Tab.Navigator>
    );
  }
}

const HomeScreen = ({ username, result, depression }) => {
  const navigation = useNavigation();
  const cards = [
    {
      id: '1',
      imageSource: require('../assets/logo.png'),
      text: 'Therapy',
    },
    {
      id: '2',
      imageSource: require('../assets/cute.png'),
      text: 'Meditation',
    },
    {
      id: '3',
      imageSource: require('../assets/medit.jpg'),
      text: 'Music',
    },
  ];

  return (

    <View style={styles.container}>
      <ScrollView

      >
        <View style={styles.circle}>
          <Text style={styles.circleText}>{result}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hi {username} !</Text>
        </View>
        <Text style={styles.reel}>You are under {depression}</Text>




        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                if (card.id === '1') {
                  navigation.navigate('Therapy', {
                    username: username,
                    result: result,
                    depression: depression
                  });
                } else if (card.id === '2') {
                  navigation.navigate('Meditation', {
                    username: username,
                    result: result,
                    depression: depression
                  });
                } else if (card.id === '3') {
                  navigation.navigate('Music', {
                    username: username,
                    result: result,
                    depression: depression
                  });
                }
              }}
            >

              <Image source={card.imageSource} style={styles.cardImage} /></TouchableOpacity>
            <Text style={styles.cardText}>{card.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>

  );
};

const JournalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Journal, Your Feelings</Text>
      <Text style={styles.date}>Date: {currentDate}</Text>
      {
      }
      <View style={styles.loginWithGoogleContainer}>
        {
          <Image
            source={require('../assets/logo.png')}
            style={styles.googleLogo}
          />
        }
        <TouchableOpacity
          style={styles.googleLoginButton}
          onPress={
            () => alert('You are loved :)')
          }
        >
          <Text style={styles.loginButtonText}>How are you feeling today ?</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your journal entry here..."
      />


      <TouchableOpacity style={styles.postButton} onPress={this.handlePostEntry}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>

  )
};


const ProfileScreen = ({ username }) => {
  const us = username.toLowerCase()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri:
              'https://cdn-icons-png.flaticon.com/128/747/747376.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileRole}>@{us}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.detailItem}>
          <Icon name="calendar" size={24} color="#007bff" />
          <Text style={styles.detailText}>DOB: November 17, 2003</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="map-marker" size={24} color="#007bff" />
          <Text style={styles.detailText}>Location: Kolkata, West Bengal</Text>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.sectionTitle}>Weekly Assessment</Text>
        <View style={styles.assessmentItem}>
          <Text style={styles.weekLabel}>Week 1</Text>
          <Text style={styles.scoreLabel}>Score: 8/10</Text>
        </View>
        <View style={styles.assessmentItem}>
          <Text style={styles.weekLabel}>Week 2</Text>
          <Text style={styles.scoreLabel}>Score: 7/10</Text>
        </View>
        <View style={styles.assessmentItem}>
          <Text style={styles.weekLabel}>Week 3</Text>
          <Text style={styles.scoreLabel}>Score: 9/10</Text>
        </View>
        <View style={styles.assessmentItem}>
          <Text style={styles.weekLabel}>Week 4</Text>
          <Text style={styles.scoreLabel}>Score: 10/10</Text>
        </View>
        <View style={styles.assessmentItem}>
          <Text style={styles.weekLabel}>Week 5</Text>
          <Text style={styles.scoreLabel}>Score: 7/10</Text>

        </View>
        <Text style={styles.moreassesment}>For more check the previous assesments</Text>
        { }
        <Button
          title="Previous Aseesments"
          type="solid"
          buttonStyle={styles.historyButton}
          titleStyle={styles.buttonTitle}
          onPress={() => {
          }}
        />
      </View>
    </ScrollView>

  )
};

const ChatScreen = ({ username }) => {

  return (
    <WebView source={{ uri: "https://prernaprojectv10-rwitam-r-devs-projects.vercel.app/" }}
    scalesPageToFit={true}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  meditationContainer: {
    paddingVertical: 8,
  },
  sidebar: {
    width: '60%',
    backgroundColor: 'antiquewhite',
    zIndex: 3,
  },

  closeSidebar: {
    alignSelf: 'flex-end',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sidebarSection: {
    marginTop: 30,
  },
  sidebarButton: {
    marginTop: 7,
    backgroundColor: 'antiquewhite',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sidebarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  header: {
    marginTop: 50,
    fontSize: 40,
    fontWeight: '500',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    minHeight: 200,
    fontSize: 16,
    color: '#000',
  },
  postButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonAboveInput: {
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    padding: 16,
    marginTop: 230,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
    right: 4,
    width: '65%',
    position: 'absolute',
  },
  loginWithGoogleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 34,
    left: 25,
    marginBottom: 40
  },
  googleLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  googleLoginButton: {
    backgroundColor: '#DCF8C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 15,
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 5
  },


  containers: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#DAC4FF',
  },
  card: {
    backgroundColor: '#ffd2d2',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,

  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,

  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  headings: {
    marginTop: 40,
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
  },
  space: {
    height: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  inputs: {
    width: '100%',
    height: 44,
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#87CEEB',
  },
  loginButtons: {
    width: '100%',
    backgroundColor: '#4169E1',
    paddingVertical: 15,
    borderRadius: 4,
    elevation: 15,
  },
  orContainer: {
    marginTop: 8,
  },
  orText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginWithgooglyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 34,
  },
  googlyLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  googlyLoginButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 15,
  },
  loginButtonTexts: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  topRightButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  topRightButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    backgroundColor: 'white',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 0,
    left: 20,
  },
  topLeftIconImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginTop: 10,
  },
  additionalImage: {
    width: '100%',
    height: '78%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  containerd: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    marginTop: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileRole: {
    marginTop: 2,
    fontSize: 16,
    color: '#555',
  },
  profileInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#555',
  },
  assessmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#555',
  },
  historyButton: {
    backgroundColor: 'blue',
    marginTop: 15,
  },
  buttonTitle: {
    color: 'white',
  },
  containerq:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreassesment:
  {
    marginTop: 35,
    fontSize: 15

  },
  circle: {
    marginTop: 10,
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  circleText: {
    color: 'white',
    fontSize: 24,
  },
  textContainer: {

    marginLeft: '30%',
    marginTop: 30,
  },
  welcomeText: {
    fontWeight: '500',
    fontSize: 26,
    color: 'black'
  },
  buttonContainerd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainerd: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    marginBottom: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  feel:
  {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  reel:
  {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 45,
    color: 'red',
  }
});
