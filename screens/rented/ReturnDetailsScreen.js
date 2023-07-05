import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import { LanguageContext } from '../../language/languageContext';

const toolLabel = {
  en: 'Tool',
  sv: 'Verktyg',
  es: 'Herramienta',
};

const companyLabel = {
  en: 'Rental company',
  sv: 'Uthyrnings företag',
  es: 'Empresa de alquiler',
};

const projectLabel = {
  en: 'Rented to project',
  sv: 'Inhyrd till projekt',
  es: 'Alquilado para projecto',
};

const projectNumberLabel = {
  en: 'Project nr',
  sv: 'Projekt nr',
  es: 'Nr de proyecto',
};

const startDateLabel = {
  en: 'Date of rental',
  sv: 'Inhyrnings datum',
  es: 'Fecha de alquiler',
};

const returnDateLabel = {
  en: 'Return date',
  sv: 'Retur datum',
  es: 'Fecha de retorno',
};

export default function ReturnDetailsScreen({ route }) {
  const { language } = useContext(LanguageContext);

  const { tool, rentStartDate, returnDate, rentCompany } = route.params;

  const dateOfReturn = new Date(returnDate);
  const startDate = new Date(rentStartDate);

  return (
    <Screen style={styles.screen}>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.label}>{toolLabel[language]}</AppText>
          <AppText style={styles.info}>{tool.name}</AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="tools"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.label}>{companyLabel[language]}</AppText>
          <AppText style={styles.info}>{rentCompany}</AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="city"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.label}>{projectLabel[language]}</AppText>
          <AppText style={styles.info}>{tool.project.name}</AppText>
          <AppText style={styles.label}>
            {projectNumberLabel[language]}: {tool.project.projectNumber}
          </AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="city"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.label}>{startDateLabel[language]}</AppText>
          <AppText style={styles.info}>
            {startDate.toLocaleDateString()}
          </AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="calendar"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <AppText style={styles.label}>{returnDateLabel[language]}</AppText>
          <AppText style={styles.info}>
            {dateOfReturn.toLocaleDateString()}
          </AppText>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    minHeight: '100%',
  },
  label: {
    color: colors.medium,
    fontSize: 21,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: colors.primaryOpacity,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 20,
  },
});
