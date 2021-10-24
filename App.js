/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useReducer, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {getIssues} from './src/services';
import {SORT_BY_TYPE} from './src/const';
import {initialState, reducer} from './src/reducer';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState(SORT_BY_TYPE.CREATED);

  const getPreviousPage = () => {
    const newPage = page - 1;
    setPage(newPage);
  };

  const getNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const getData = async () => {
    console.log('getData', page);
    try {
      const result = await getIssues('', {
        page: page,
        state: 'open',
        sort: sortType,
      });
      dispatch({type: 'ADD_ISSUES', issues: result});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [sortType, page]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.issueItem}>
          <Text>{item.title}</Text>
          {!item.pull_request ? (
            <Text style={styles.issueItemType}>[ISSUE]</Text>
          ) : (
            <Text style={styles.pullRequestItemType}>[PULL REQUEST]</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.topMenuContainer}>
        <Text>Sort by: </Text>
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
      <FlatList
        data={state.issuesList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {page === 0 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getData(1);
          }}>
          <Text>{'LOAD ISSUES'}</Text>
        </TouchableOpacity>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  issueItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5,
    borderColor: 'beige',
    backgroundColor: '#fffceb',
    borderWidth: 2,
    flexWrap: 1,
  },
  issueItemType: {
    backgroundColor: '#ffc7c7',
    marginLeft: 10,
  },
  pullRequestItemType: {
    backgroundColor: '#dcffd6',
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'azure',
  },
  topMenuContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  topMenuSortItemSelected: {
    backgroundColor: '#fffceb',
    borderColor: 'beige',
    borderWidth: 2,
    marginHorizontal: 10,
  },
  topMenuSortItem: {
    borderColor: 'beige',
    borderWidth: 2,
    marginHorizontal: 10,
  },
  navigationMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});

export default App;
