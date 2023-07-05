import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';

import RentedToolListItem from '../../components/RentedToolListItem';
import colors from '../../config/colors';
import rentedToolsApi from '../../api/rented';
import useApi from '../../hooks/useApi';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import ConnectivityError from '../../components/ConnectivityError';
import appStyles from '../../config/styles';
import { LanguageContext } from '../../language/languageContext';

export default function RentedToolsListScreen({ navigation }) {
  const { language } = useContext(LanguageContext);

  const {
    data: rentedTools,
    request: loadRentedTools,
    error,
    loading,
    limitedData,
    loadMore,
  } = useApi(rentedToolsApi.getRentedTools);

  useEffect(() => {
    loadRentedTools();
  }, []);

  const titleText = {
    en: 'Rented tools',
    sv: 'Hyrda verktyg',
    es: 'Herramientas en alquiler',
  };

  return (
    <Screen style={styles.screen}>
      <View style={appStyles.heading}>
        <AppText style={appStyles.headingText}>{titleText[language]}</AppText>
      </View>
      <AppActivityIndicator visible={loading} />
      {error && <ConnectivityError loadDataFunction={loadRentedTools} />}

      <View style={styles.listContainer}>
        <FlatList
          data={limitedData}
          renderItem={({ item }) => {
            return (
              <RentedToolListItem
                tool={item}
                onPress={() =>
                  navigation.navigate('RentedToolDetailsScreen', item)
                }
              />
            );
          }}
          keyExtractor={(item) => item._id}
          onScrollEndDrag={loadMore}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainer: {
    flex: 1,
    paddingBottom: 50,
  },
});
