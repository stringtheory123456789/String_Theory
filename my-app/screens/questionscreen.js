import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      selectedAnswers: Array(9).fill(null),
    };
  }

  questions = [
    {
      text: 'Over the last two weeks, how often have you experienced little interest or pleasure in doing things?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, how often have you felt down, depressed, or hopeless?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, how often have you had trouble falling or staying asleep, or sleeping too much?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, how often have you felt tired or had little energy?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, how often have you had poor appetite or overeating?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, how often have you felt bad about yourself or that you are a failure or have let yourself or your family down?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, have you been moving or speaking so slowly that other people could have noticed? Or have you been so fidgety or restless that you have been moving around a lot more than usual?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
    {
      text: 'Over the last two weeks, have you had thoughts that you would be better off dead or of hurting yourself in some way?',
      answers: [
        { text: 'Not at all', value: 0, additionalValue: 'Low' },
        { text: 'Several days', value: 1, additionalValue: 'Moderate' },
        { text: 'More than half the days', value: 2, additionalValue: 'High' },
        { text: 'Nearly everyday', value: 3, additionalValue: 'Very High' },
      ],
    },
  ];

  selectAnswer = (answerValue) => {
    const { currentQuestionIndex, selectedAnswers } = this.state;
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerValue;
    this.setState({ selectedAnswers: updatedAnswers });
  };

  nextQuestion = () => {
    const { currentQuestionIndex } = this.state;
    if (currentQuestionIndex < this.questions.length - 1) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
      });
    }
  };

  previousQuestion = () => {
    const { currentQuestionIndex } = this.state;
    if (currentQuestionIndex > 0) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex - 1,
      });
    }
  };

  handleLogin = async () => {
    const { selectedAnswers } = this.state;
    const user = this.props.route.params.username;
  
    const sum = selectedAnswers.reduce((acc, answer) => acc + answer, 0);

    let depressionResult;

    if (sum >= 0 && sum <= 4) {
      depressionResult = "Minimal depression";
    } else if (sum >= 5 && sum <= 9) {
      depressionResult = "Mild depression";
    } else if (sum >= 10 && sum <= 14) {
      depressionResult = "Moderate depression";
    } else if (sum >= 15 && sum <= 19) {
      depressionResult = "Moderately severe depression";
    } else if (sum >= 20 && sum <= 27) {
      depressionResult = "Severe depression";
    } else {
      depressionResult = "Invalid sum or out of range";
    }
    
    alert(depressionResult);
    
    const result = Math.round((sum / 27) * 100);
  
    console.log('Here are the selected Answers:', selectedAnswers);
    console.log('Sum of selected answers:', sum);
    console.log('Result:', result);
  
    this.props.navigation.navigate('Sentiment', {
      result: result,username: user,depression: depressionResult,
      
    });
  };
  

  render() {
    const { currentQuestionIndex, selectedAnswers } = this.state;
    const currentQuestion = this.questions[currentQuestionIndex];

    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
        {}
        <View style={styles.answerContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.selectAnswer(answer.value)}
              style={[
                styles.answerOption,
                selectedAnswers[currentQuestionIndex] === answer.value
                  ? styles.selectedAnswer
                  : null,
              ]}
            >
              <Text style={styles.answerText}>
                {`${answer.text} (${answer.additionalValue})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={this.previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={() => {
              if (currentQuestionIndex === this.questions.length - 1) {
                this.handleLogin();
              } else {
                this.nextQuestion();
              }
            }}
          >
            <Text style={styles.buttonText}>
              {currentQuestionIndex === this.questions.length - 1
                ? 'Submit'
                : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DAC4FF',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerContainer: {
    width: '100%',
  },
  answerOption: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
  },
  selectedAnswer: {
    backgroundColor: 'lightblue',
    borderColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  previousButton: {
    backgroundColor: 'blue',
  },
  nextButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;
