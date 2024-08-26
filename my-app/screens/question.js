import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Sentiment from 'sentiment';

class SentimentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      sentimentResult: '',
    };
    this.sentiment = new Sentiment();
  }

  handleInputChange = (text) => {
    this.setState({ userInput: text });
  };

  analyzeSentiment = () => {
    const { userInput } = this.state;
    const result = this.sentiment.analyze(userInput);
    const sentimentScore = result.score;

    let sentimentResult;

    // if (sentimentScore <= -3) {
    //   sentimentResult = 'Negative';
    // } else if (sentimentScore < 0) {
    //   sentimentResult = 'Somewhat Negative';
    // } else if (sentimentScore === 0) {
    //   sentimentResult = 'Neutral';
    // } else {
    //   sentimentResult = 'Positive';
    // }
    sentimentResult='Score has been calculated successffully'

    this.setState({ sentimentResult }, () => {

      Alert.alert('Sentiment Analysis Result', `Sentiment: ${sentimentResult}`, [
        {
          text: 'OK',
          onPress: () => this.navigateToDashboard(sentimentResult),
        },
      ]);
    });
  };

  navigateToDashboard = (sentimentResult) => {

    const user = this.props.route.params.username;
    const depression = this.props.route.params.depression;
    const result = this.props.route.params.result;
    const { navigation } = this.props;
    navigation.navigate('Dashboard', { sentimentResult, username: user, depression: depression, result: result });
  };

  render() {
    const { userInput } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter your text for Sentiment Analysis:</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Type your thoughts here..."
          onChangeText={this.handleInputChange}
          value={userInput}
        />
        <TouchableOpacity style={styles.button} onPress={this.analyzeSentiment}>
          <Text style={styles.buttonText}>Analyze Sentiment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#DAC4FF',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SentimentScreen;
