import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import { saveDeck } from '../utils/api';

export default class DeckCreate extends Component {
  state = {
    deckName: ''
  }

  handleTextChange = (input) => {
    this.setState({
      deckName: input
    })
  }

  submit(deckName) {
    if (deckName) {
      saveDeck(deckName)
        .then((deck) => {
          this.setState({
            deckName: ''
          });

          this.props.navigation.navigate(
            'Deck',
            { deck }
          )
        })
    }
  }

  render() {
    const { deckName } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>
          Choose a title
        </Text>
        <TextInput
          value={deckName}
          placeholder="Deck name"
          style={styles.input}
          onChangeText={this.handleTextChange}
        />
        <SubmitButton onPress={() =>
          this.submit(deckName)
        } />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: 'center',
    width: 300
  },
  input: {
    width: 300,
    height: 44,
    padding: 8,
    marginBottom: 40
  }
})
