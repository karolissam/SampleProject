import React, {useState, useReducer, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export const NavigationMenu = memo(({ page, getNextPage, getPreviousPage }) => {
  return (
    <View style={styles.navigationMenuContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (page <= 1) {
            return;
          }
          getPreviousPage();
        }}>
        <Text>{'Previous page'}</Text>
      </TouchableOpacity>
      <Text>{page}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getNextPage();
        }}>
        <Text>{'Next page'}</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'azure',
      },
      navigationMenuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
      },
});
