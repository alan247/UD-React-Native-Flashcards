import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { getDecks } from '../utils/api';

export default class DeckList extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    this.getDecks();

    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.getDecks
    );
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  getDecks = () => {
    getDecks().then((results) =>
      this.setState({
        decks: results
      })
    )
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.deck} onPress={() => this.props.navigation.navigate(
        'Deck',
        { deck: item }
      )}>
        <Text style={styles.deckTitle}>
          {item.title}
        </Text>
        <Text style={styles.cardCount}>
          {item.cards.length} {item.cards.length === 1 ? 'Card' : 'Cards'}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.state;

    return (
      <View style={decks.length === 0 ? styles.textContainer : null}>
        {decks.length === 0 &&
          <Text style={styles.noDecksText}>There are no decks</Text>
        }
        {decks.length > 0 &&
          <FlatList
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10
  },
  deck: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomWidth: 1
  },
  deckTitle: {
    fontSize: 30,
    marginBottom: 10
  },
  cardCount: {
    color: '#666',
    fontSize: 16
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDecksText: {
    color: 'grey',
    fontSize: 20
  },
})
