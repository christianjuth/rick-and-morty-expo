import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props: { onPress: () => void; title?: string, disabled?: boolean }) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={[styles.button, props.disabled && styles.buttonDisabled]} onPress={onPress} disabled={props.disabled}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
