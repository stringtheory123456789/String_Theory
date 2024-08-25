
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import React, { Component } from 'react';
import { Button, TextInput, View, StyleSheet, Text, Image, TouchableOpacity, Linking, Animated, Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');
import { auth, createUserWithEmailAndPasswordAsync, signInWithEmailAndPasswordAsync, sendPasswordResetEmailAsync } from '../firebase';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isSidebarOpen: false,
    };

    this.contentTranslateX = new Animated.Value(0);
    
  };

  handleLogin = async () => {
    alert("Login is not yet implemented")
    return;
    try {
      const user = await signInWithEmailAndPasswordAsync(this.state.username, this.state.password);
      console.log('Logged in with:', user.email);
      alert("Successfully Logged in");
      this.props.navigation.navigate('Question', {
        username: this.state.username.substring(0, this.state.username.indexOf('@')).toUpperCase(),
      })
    } catch (error) {
      alert(error.message);
    }
    
  };

  openGoogleLink = () => {
    // Linking.openURL('https://myaccount.google.com/');
    this.props.navigation.navigate('Sign');
  };

  toggleSidebar = () => {
    this.setState(
      (prevState) => ({
        isSidebarOpen: !prevState.isSidebarOpen,
      }),
      () => {
        Animated.timing(this.contentTranslateX, {
          toValue: this.state.isSidebarOpen ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  render() {
    const contentTranslateX = this.contentTranslateX.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -0.6 * screenWidth], // Assuming 60% of the screen width
    });

    return (
      <View style={styles.container}>
        {/* Sidebar */}
        {this.state.isSidebarOpen && (
          <View style={[styles.sidebar, { zIndex: 3 }]}>
            <TouchableOpacity onPress={this.toggleSidebar}>
              <Text style={styles.closeSidebar}>X</Text>
            </TouchableOpacity>

            <View style={styles.sidebarSection}>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>HOME</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarButton}>
                <Text style={styles.sidebarButtonText}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sidebarButton}
                onPress={this.toggleSidebar}
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
            { transform: [{ translateX: contentTranslateX }] },
          ]}
        >
          {/* Icon in the top left corner */}
          <View style={styles.topLeftIcon}>
            <TouchableOpacity>
              <Image
                // source={{
                //   uri:
                //     'https://cdn-icons-png.flaticon.com/128/8166/8166618.png',
                // }}
                source={require('../assets/logo.png')}
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
                // uri:
                //   'https://as1.ftcdn.net/v2/jpg/02/22/70/72/1000_F_222707205_sfD8CXeJRIL5spG1f4jh9tH7fvBlB5xt.jpg',
                uri: 'https://static.thenounproject.com/png/765894-200.png',
              }}
              style={styles.topRightButtonImage}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Welcome Back!</Text>

          {/* Space below "Welcome Back!" text */}
          <View style={styles.space}></View>

          <Text style={styles.subHeading}>Login to your account</Text>

          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Email ID'}
            placeholderTextColor="#87CEEB" // Light blue color for the placeholder text
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            placeholderTextColor="#87CEEB" // Light blue color for the placeholder text
            secureTextEntry={true}
            style={styles.input}
          />

          <Button
            title={'Login'}
            style={styles.loginButton}
            onPress={this.handleLogin} // Call the handleLogin function
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
              <Text style={styles.loginButtonText}>Don't have an account ?</Text>
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
    // marginTop: 7,
    // backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'blue',
    // padding: 10,
    // borderRadius: 5,
    // marginBottom: 10,
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
    marginTop: 66,
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    marginBottom: 20,
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
    marginTop: 30,
  },
  topRightButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    backgroundColor:'white',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 0,
    left: 20,
    marginTop: 30,
  },
  topLeftIconImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginTop: 10,
  },
  additionalImage: {
    width: '100%',
    height: 295,
    marginTop: 15,
  },
});

