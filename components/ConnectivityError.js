import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import AppText from './AppText';
import AppButton from './AppButton';
import { LanguageContext } from '../language/languageContext';

const errorMessage = {
  en: "Couldn't retrieve the data ",
  sv: 'Data kunde inte hämtas',
  es: 'No se pudo obtener los datos',
};

export default function ConnectivityError({ loadDataFunction }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  return (
    <View style={styles.errorScreen}>
      <AppText>{errorMessage[language]}</AppText>
      <AppButton title="försök igen" onPress={loadDataFunction} />
    </View>
  );
}

const styles = StyleSheet.create({
  errorScreen: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
