import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function ResponseButton ({ correct, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.btn, {backgroundColor: correct ? 'green' : 'red'}]}
      onPress={onPress}>
        <Text style={styles.btnText}>{correct ? 'Mark as correct' : 'Mark as incorrect'}</Text>
    </TouchableOpacity>
  )
}

export default class Card extends Component {
  state = {
      showingAnswer: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.card !== nextProps.card) {
      this.setState({
        showingAnswer: false
      });
    }
  }

  flipCard = () => {
    this.setState({
      showingAnswer: !this.state.showingAnswer
    })
  }

  render() {
    const { card, onAnswerSelection } = this.props;
    const { showingAnswer } = this.state;

    return (
      <View style={styles.questionContainer}>
        <View style={styles.question}>
          <Text style={styles.questionAnswerText}>
            {showingAnswer ? card.answer : card.question }
          </Text>
          <TouchableOpacity onPress={() => this.flipCard() }>
            <Text style={styles.questionAnswerBtn}>
              {showingAnswer ? 'Show question' : 'Show answer' }
            </Text>
          </TouchableOpacity>
        </View>
        <ResponseButton correct={true} onPress={() =>
          onAnswerSelection(true)
        } />
        <ResponseButton correct={false} onPress={() =>
          onAnswerSelection(false)
        } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  question: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 150
  },
  questionAnswerText: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    width: 300
  },
  questionAnswerBtn: {
    backgroundColor: 'white',
    borderRadius: 5,
    color: 'black',
    borderWidth: 1,
    fontSize: 16,
    marginTop: 60,
    paddingTop: 10,
    paddingBottom: 10,
    width: 150,
    textAlign: 'center',
    alignItems: 'center'
  },
  btn: {
    borderRadius: 5,
    padding: 10,
    width: 150,
    marginBottom: 10,
    alignItems: 'center'
  },
  btnText: {
    color: 'white'
  }
})
