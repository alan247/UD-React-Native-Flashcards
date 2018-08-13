import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Card from './Card'
import {
  clearLocalNotification,
  setLocalNotification
} from './../utils/helpers';

export default class Quiz extends Component {
  state = {
    cards: [],
    activeCardIndex: 0,
    score: 0,
    questionsCompleted: 0
  }

  componentDidMount() {
    const deck = this.props.navigation.state.params.deck;

    this.setState({
      deck: deck,
      cards: deck.cards,
      activeCardIndex: 0,
      score: 0
    });

    // Clear local notification and create a new one for tomorrow
    clearLocalNotification()
      .then(setLocalNotification);
  }

  onAnswerSelection = (isCorrect) => {
    this.setState({
      activeCardIndex: this.state.activeCardIndex + 1,
      score: isCorrect ? this.state.score + 1 : this.state.score
    });
  }

  restartQuiz = () => {
    this.setState({
      activeCardIndex: 0,
      score: 0,
      questionsCompleted: 0
    });
  }

  render() {
    const { deck, cards, activeCardIndex, score } = this.state;
    const showScore = activeCardIndex === cards.length;
    const showCard = cards && cards.length && !showScore;

    return (
      <View style={styles.container}>
        {!!showCard &&
          <View>
            <Text style={styles.quizProgress}>
              {activeCardIndex + 1} / {cards.length}
            </Text>
            <Card card={cards[activeCardIndex]} onAnswerSelection={this.onAnswerSelection} />
          </View>
        }
        {!!showScore &&
          <View style={styles.scoreContainer}>
            <View style={styles.score}>
              <Text style={styles.scoreText}>Score:{'\n'} {score} / {cards.length}</Text>
            </View>
            <TouchableOpacity onPress={() => this.restartQuiz()}>
              <Text style={styles.optionBtn}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
              this.props.navigation.goBack()
            }>
              <Text style={styles.optionBtn}>Return to Deck</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  quizProgress: {
    fontSize: 16,
    padding: 15
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  score: {
    marginBottom: 20
  },
  cta: {
    marginBottom: 15,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16
  },
  scoreText: {
    fontSize: 30,
    marginBottom: 40
  },
  optionBtn: {
    backgroundColor: 'white',
    borderRadius: 5,
    color: 'black',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 150,
    textAlign: 'center',
    alignItems: 'center'
  },
})
