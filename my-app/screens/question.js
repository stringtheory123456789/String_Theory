import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Sentiment from 'sentiment';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const SentimentScreen = ({ username, result, depression }) => {
  const [responses, setResponses] = useState(Array(5).fill(''));
  const [sentimentScores, setSentimentScores] = useState([]);
  const navigation = useNavigation(); // Initialize the navigation hook

  const questions = [
    'How do you feel today?',
    'What did you enjoy most this week?',
    'What are you looking forward to?',
    'How would you describe your current mood?',
    'What can improve your day?'
  ];

  const analyzeSentiment = () => {
    const sentiment = new Sentiment();
    const scores = responses.map((response) => sentiment.analyze(response).score);
    setSentimentScores(scores);
    
    // Here you can calculate the result based on the sentiment scores
    const calculatedResult = scores.reduce((acc, score) => acc + score, 0); // Example calculation
    const depressionResult = calculatedResult < 0 ? 'High' : 'Low'; // Example logic

    // Navigate to the Dashboard screen with the calculated results
    navigation.navigate('Dashboard', {
      result: result,
      username: username,
      depression: depression,
    });
  };

  const handleInputChange = (text, index) => {
    const newResponses = [...responses];
    newResponses[index] = text;
    setResponses(newResponses);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentiment Analysis</Text>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          <TextInput
            style={styles.input}
            value={responses[index]}
            onChangeText={(text) => handleInputChange(text, index)}
          />
        </View>
      ))}
      <Button title="Analyze Sentiment" onPress={analyzeSentiment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DAC4FF'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20
  },
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  results: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
  },
});

export default SentimentScreen;
