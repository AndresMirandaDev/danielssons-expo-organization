import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Screen from '../../components/Screen';
import { FlatList } from 'react-native-gesture-handler';
import ReturnListItem from '../../components/ReturnListItem';
import colors from '../../config/colors';
import ListItemSeparator from '../../components/ListItemSeparator';
import useApi from '../../hooks/useApi';
import returnsApi from '../../api/returns';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import ConnectivityError from '../../components/ConnectivityError';

export default function ReturnsScreen() {
  const {
    data: returns,
    loading,
    request: loadReturns,
    error,
  } = useApi(returnsApi.getReturns);

  useEffect(() => {
    loadReturns();
  }, []);
  console.log(returns);
  return (
    <Screen style={styles.screen}>
      <AppActivityIndicator visible={loading} />
      {error && <ConnectivityError loadDataFunction={loadReturns} />}
      <FlatList
        data={returns}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <ReturnListItem data={item} />;
        }}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    minHeight: '100%',
  },
});
