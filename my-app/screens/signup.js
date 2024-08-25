// const mongoose = require("mongoose");
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import React, { Component } from 'react';
import { Button, TextInput, View, StyleSheet, Text, Image, TouchableOpacity, Linking, Animated, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { width: screenWidth } = Dimensions.get('window');
import { auth, createUserWithEmailAndPasswordAsync, signInWithEmailAndPasswordAsync, sendPasswordResetEmailAsync } from '../firebase';
console.log(auth)
// Update with the correct path
// import HomeScreen from '../App';

const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      username: '',
      myname: '',
      title: '',
      dob: '',
      gender: '',
      age: '',
      isSidebarOpen: false,
    };

    // this.contentTranslateX = new Animated.Value(0);
  }
  handleSubmit = async () => {
    try {
      // Replace createUserWithEmailAndPasswordAsync with your actual implementation
      const user = await createUserWithEmailAndPasswordAsync(this.state.username, this.state.password);
      console.log('Registered with:', user.email);
      alert("Successfully Registered");
      this.props.navigation.navigate('Question', {
        username: this.state.username.substring(0, this.state.username.indexOf('@')).toUpperCase(),
      })
    } catch (error) {
      alert(error.message);
    }

  };

  openGoogleLink = () => {
    // Linking.openURL('https://myaccount.google.com/');
    this.props.navigation.navigate('Login');
  };

  toggleSidebar = () => {
  };

  render() {

    return (
      <View style={styles.container}>
        {/* Sidebar */}
        {this.state.isSidebarOpen && (
          <View style={[styles.sidebar, { zIndex: 3 }]}>
            <TouchableOpacity onPress={this.toggleSidebar}>
              <Text style={styles.closeSidebar}>X</Text>
            </TouchableOpacity>

            <View style={styles.sidebarSection}>
              <TouchableOpacity
                style={styles.sidebarButton}
              >
                <Text style={styles.sidebarButtonText}
                  onPress={() => {
                    this.props.navigation.navigate('Welcome');
                    this.toggleSidebar(); // Close the sidebar after navigation
                  }}
                >HOME</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                  this.toggleSidebar(); // Close the sidebar after navigation
                }}
              >
                <Text style={styles.sidebarButtonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>CONTACT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>DASHBOARD</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {},
          ]}
        >
          {/* Icon in the top left corner */}
          <View style={styles.topLeftIcon}>
            <TouchableOpacity>
              <Image

                source={require('../assets/logo.png')} // Relative path to the image
                // style={styles.googleLogo}
                // />
                style={styles.topLeftIconImage}
              />
            </TouchableOpacity>
          </View>

          {/* Top right button */}
          <TouchableOpacity
            style={styles.topRightButton}
            onPress={() => alert("Dark mode isn't currently available")}
          >
            <Image
              source={{
                uri: 'https://static.thenounproject.com/png/765894-200.png',
              }}
              style={styles.topRightButtonImage}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Welcome!</Text>

          {/* Space below "Welcome Back!" text */}
          <View style={styles.space}></View>

          <Text style={styles.subHeading}>Create a new account</Text>

          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Email ID'}
            placeholderTextColor="grey" // Light blue color for the placeholder text
            style={styles.input}
          />
          {/* <View style={styles.didebyside}>
            <TextInput
              value={this.state.myname}
              onChangeText={(myname) => this.setState({ myname })}
              placeholder={'Name'}
              placeholderTextColor="grey"
              style={[styles.inp, { flex: 1, marginRight: 5 }]} // Use flex: 1 to distribute space evenly
            />
            <TextInput
              value={this.state.title}
              onChangeText={(title) => this.setState({ title })}
              placeholder={'Title'}
              placeholderTextColor="grey"
              style={[styles.inp, { flex: 1, marginLeft: 5 }]} // Use flex: 1 to distribute space evenly
            />
          </View> */}


          <View style={styles.sidebyside}>
            <TextInput
              value={this.state.dob}
              onChangeText={(dob) => this.setState({ dob })}
              placeholder={'Date of Birth'}
              placeholderTextColor="grey"
              style={styles.inp}
            />
            <TextInput
              // placeholder="Placeholder 2"
              value={this.state.gender}
              onChangeText={(gender) => this.setState({ gender })}
              placeholder={'Gender'}
              placeholderTextColor="grey"
              style={styles.inp}
            />
            <TextInput
              // placeholder="Placeholder 3"
              value={this.state.age}
              onChangeText={(age) => this.setState({ age })}
              placeholder={'Age'}
              placeholderTextColor="grey"
              style={styles.inp}
            />
          </View>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password  (More than 6 digits)'}
            placeholderTextColor="grey" // Light blue color for the placeholder text
            secureTextEntry={true}
            style={styles.input2}
          />

          <Button
            title={'Sign Up'}
            style={styles.loginButton}
            onPress={this.handleSubmit} // Call the handleSubmit function
          />

          <View style={styles.orContainer}>
            <Text style={styles.orText}>or</Text>
          </View>

          <View style={styles.loginWithGoogleContainer}>
            {
              <Image
                source={require('../assets/logo.png')} // Relative path to the image
                style={styles.googleLogo}
              />
            }
            <TouchableOpacity
              style={styles.googleLoginButton}
              onPress={this.openGoogleLink} // Call the openGoogleLink function to open the link
            >
              <Text style={styles.loginButtonText}>Already have an account ?</Text>
            </TouchableOpacity>
          </View>

          {/* Additional image below "Login with Google" */}
          <Image
            source={{
              uri:
                'https://img.freepik.com/free-vector/cute-woman-meditation-yoga-cartoon-vector-icon-illustration-people-sport-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4062.jpg?w=2000',
            }}
            style={styles.additionalImage}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sidebyside:
  {
    flexDirection: 'row', // Display children in a row
    justifyContent: 'space-between',
    width: '100%'
  },
  didebyside:
  {

    flexDirection: 'row', // Display children in a row
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#DAC4FF',
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
    backgroundColor: 'white',
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


  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DAC4FF',
    padding: 30,
  },
  heading: {
    marginTop: 70,
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    marginBottom: 10,
  },
  space: {
    height: 10,
  },
  // contain:
  // {
  //   flexDirection: 'row', // This makes the TextInput components side by side
  //   justifyContent: 'space-between',
  // },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#87CEEB',
  },
  input2: {
    width: '100%',
    height: 44,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#87CEEB',
  },
  inp: {
    width: '33%',
    height: 44,
    padding: 10,
    backgroundColor: '#ffffff',
    // backgroundColor: 'red',
    // marginBottom: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#87CEEB',
    // marginLeft: 4,


  },
  loginButton: {
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
  loginWithGoogleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 34,
  },
  googleLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  googleLoginButton: {
    backgroundColor: '#4169E1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 15,
  },
  loginButtonText: {
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
    marginTop: 40,
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
    marginTop: 40,
  },
  additionalImage: {
    width: '100%',
    height: 270,
    marginTop: 15,
  },
});
