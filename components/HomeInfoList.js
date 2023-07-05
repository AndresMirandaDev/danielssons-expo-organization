import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import InfoCard from './InfoCard';
import DateInfoCard from './DateInfoCard';
import useApi from '../hooks/useApi';
import rentedApi from '../api/rented';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from '../language/languageContext';
import AppActivityIndicator from './AppActivityIndicator';

const rentedToolsText = {
  en: 'Rented tools',
  sv: 'Inhyrda verktyg',
  es: 'Herramientas alquiladas',
};

export default function HomeInfoList() {
  const { language } = useContext(LanguageContext);
  const navigation = useNavigation();

  const {
    data: rentedTools,
    request: loadRentedTools,
    loading,
    error,
  } = useApi(rentedApi.getRentedTools);

  useEffect(() => {
    console.log('useeffect homeinfolist.js');
    loadRentedTools();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <DateInfoCard />
          <View style={styles.infoContainer}>
            <AppActivityIndicator visible={loading} />
            <InfoCard
              infoToDisplay={rentedToolsText[language]}
              data={rentedTools.length}
              onPress={() => navigation.navigate('RentedToolsListScreen')}
              icon="tools"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 10,
  },
  infoContainer: {
    justifyContent: 'space-around',
  },
});
