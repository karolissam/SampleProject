import React, {useState, memo} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';

import {OWNER_REPO} from '../const';

export const OwnerRepoInput = memo(({ownerRepo, onChangeOwnerRepo}) => {
  const [input, onChangeInput] = useState(ownerRepo);

  return (
    <View style={styles.inputField}>
      <Text style={styles.inputFieldText}>owner/repo: </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput}
        value={input}
        placeholder={OWNER_REPO}
        onBlur={() => {
          onChangeOwnerRepo(input);
          Keyboard.dismiss();
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputField: {
    padding: 20,
    backgroundColor: '#edeeff',
    flexDirection: 'row',
  },
  inputFieldText: {
    fontWeight: 'bold',
  },
});
