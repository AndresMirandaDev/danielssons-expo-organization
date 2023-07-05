import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { LanguageContext } from '../language/languageContext';

const rentedToText = {
  en: 'Rented To',
  sv: 'Inhyrd till',
  es: 'Arrendado para',
};

const returnedText = {
  en: 'Returned',
  sv: 'Returnerat',
  es: 'Retornado',
};

export default function ReturnListItem({ data }) {
  const navigation = useNavigation();
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const { tool, rentStartDate, returnDate, rentCompany } = data;

  const dateOfReturn = new Date(returnDate);
  const startDate = new Date(rentStartDate);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ReturnDetailsScreen', data);
      }}
    >
      <View style={styles.container}>
        <View>
          <AppText style={styles.toolName}>{tool.name}</AppText>
          <AppText style={styles.info}>
            {rentedToText[language]} {tool.project.name}
          </AppText>
          <AppText style={styles.info}>
            {returnedText[language]} {dateOfReturn.toLocaleDateString()}
          </AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={35}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolName: {
    textTransform: 'capitalize',
    fontSize: 21,
    fontWeight: 'bold',
    color: colors.primaryOpacity,
  },
  info: {
    color: colors.medium,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
