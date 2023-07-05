import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useContext } from 'react';
import AppText from './AppText';
import colors from '../config/colors';
import { LanguageContext } from '../language/languageContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const rentedCompanyText = {
  en: 'Rent Company',
  sv: 'Uthyrnings företag',
  es: 'Empresa de arriendo',
};

const rentedFromText = {
  en: 'Rented from',
  sv: 'Inhyrd från den',
  es: 'Arriendo desde el',
};
export default function RentedToolListItem({ tool, onPress }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  const { name, rentedTo, rentStart } = tool;

  //converting the date string to a date object so its possible to display locale date string
  const startDate = new Date(rentStart);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <AppText style={styles.toolName}>{name}</AppText>
          </View>
          <View style={styles.infoContainer}>
            <AppText style={styles.info}>
              {rentedCompanyText[language]} : {rentedTo}
            </AppText>
          </View>
          <View style={styles.infoContainer}>
            <AppText style={styles.info}>
              {rentedFromText[language]}: {startDate.toLocaleDateString()}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: colors.white,
    width: '100%',
    padding: 20,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
  toolName: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primaryOpacity,
    textTransform: 'capitalize',
  },
  info: {
    textTransform: 'capitalize',
    color: colors.medium,
    padding: 5,
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
