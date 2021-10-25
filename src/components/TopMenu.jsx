import React, {useState, useReducer, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {SORT_BY_TYPE} from '../const';

export const TopMenu = memo(({ sortType, setSortType }) => {
  return (<View style={styles.topMenuContainer}>
      <Text style={styles.sortText}>Sort by: </Text>
      <View style={styles.topMenuContainer}>
        <TouchableOpacity
          style={
            sortType === SORT_BY_TYPE.CREATED
              ? styles.topMenuSortItemSelected
              : styles.topMenuSortItem
          }
          onPress={() => {
            setSortType(SORT_BY_TYPE.CREATED);
          }}>
          <Text>Created</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            sortType === SORT_BY_TYPE.UPDATED
              ? styles.topMenuSortItemSelected
              : styles.topMenuSortItem
          }
          onPress={() => {
            setSortType(SORT_BY_TYPE.UPDATED);
          }}>
          <Text>Updated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            sortType === SORT_BY_TYPE.COMMENTS
              ? styles.topMenuSortItemSelected
              : styles.topMenuSortItem
          }
          onPress={() => {
            setSortType(SORT_BY_TYPE.COMMENTS);
          }}>
          <Text>Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  topMenuContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  sortText: {
    padding: 3,
    marginBottom: 10,
  },
  topMenuSortItemSelected: {
    backgroundColor: '#fffceb',
    borderColor: 'beige',
    borderWidth: 2,
    marginHorizontal: 10,
    padding: 3
  },
  topMenuSortItem: {
    borderColor: 'beige',
    borderWidth: 2,
    marginHorizontal: 10,
    padding: 3
  },
});
