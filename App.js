/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useReducer, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {getIssues} from './src/services';
import {SORT_BY_TYPE, ACTIONS, OWNER_REPO} from './src/const';
import {initialState, reducer} from './src/reducer';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TopMenu} from './src/components/TopMenu';
import {NavigationMenu} from './src/components/NavigationMenu';
import {OwnerRepoInput} from './src/components/OwnerRepoInput';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState(SORT_BY_TYPE.CREATED);
  const [ownerRepo, onChangeOwnerRepo] = useState(OWNER_REPO);

  const getPreviousPage = useCallback(() => {
    const newPage = page - 1;
    setPage(newPage);
  }, [page]);

  const getNextPage = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
  }, [page]);

  const getData = useCallback(async () => {
    const result = await getIssues(ownerRepo, {
      page: page,
      state: 'open',
      sort: sortType,
    });
    dispatch({type: ACTIONS.ADD_ISSUES, issues: result});
  }, [page, sortType, ownerRepo]);

  useEffect(() => {
    getData();
  }, [sortType, page, ownerRepo]);

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
    <KeyboardAvoidingView
      style={[backgroundStyle, styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={[backgroundStyle, styles.container]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TopMenu sortType={sortType} setSortType={setSortType} />
        {state.issuesList.message ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{state.issuesList.message}</Text>
          </View>
        ) : !state.issuesList || state.issuesList.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No issues</Text>
          </View>
        ) : (
          <FlatList
            data={state.issuesList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
        <OwnerRepoInput
          ownerRepo={ownerRepo}
          onChangeOwnerRepo={onChangeOwnerRepo}
        />
        <NavigationMenu
          page={page}
          getNextPage={getNextPage}
          getPreviousPage={getPreviousPage}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  errorContainer: {
    flex: 1,
  },
  errorText: {
    padding: 20,
    backgroundColor: '#ffdee1',
  },
});

export default App;
