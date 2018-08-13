import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const SubmitButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.btn}
    onPress={onPress}>
      <Text style={styles.btnText}>Submit</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: 100
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  }
})

export default SubmitButton;
