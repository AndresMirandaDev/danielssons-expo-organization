import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import colors from '../../config/colors';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import rentedApi from '../../api/rented';
import returnsApi from '../../api/returns';
import UploadScreen from '../UploadScreen';
import appStyles from '../../config/styles';
import { LanguageContext } from '../../language/languageContext';

const companyLabel = {
  en: 'Rental company',
  sv: 'Uthyrnings företag',
  es: 'Empresa de alquiler',
};

const projectLabel = {
  en: 'Current project',
  sv: 'Nuvarande projekt',
  es: 'Proyecto actual',
};

const startDateLabel = {
  en: 'rent start date',
  sv: 'Inhyrd från den',
  es: 'Inicio de arriendo',
};

const buttonText = {
  en: 'Return tool',
  sv: 'Återvända verktyg',
  es: 'Retornar herramienta',
};

const errorAlertText = {
  en: 'Tool could not be registered as returned',
  sv: 'Det gick inte att registrera verktyg som återvänt',
  es: 'No se pudo registrar la herramienta como retornada',
};

const handleReturnButtonText = {
  en: {
    title: 'Return tool?',
    message: 'Tool is going to be registered as returned',
    buttonTexts: {
      yes: 'Return',
      no: 'No',
    },
  },
  sv: {
    title: 'Återvända verktyg?',
    message: 'Verktyg kommer att registrera som återvänt',
    buttonTexts: {
      yes: 'Återvända',
      no: 'Nej',
    },
  },
  es: {
    title: '¿Retornar herramienta?',
    message: 'La herramienta se registrará como retornada',
    buttonTexts: {
      yes: 'Retornar',
      no: 'No',
    },
  },
};

export default function RentedToolDetailsScreen({ route, navigation }) {
  const { language } = useContext(LanguageContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const tool = route.params;

  const rentStartDate = new Date(tool.rentStart);

  const handleReturn = async () => {
    setProgress(0);
    setUploadVisible(true);

    const newReturn = {
      tool: tool._id,
      rentStartDate: rentStartDate,
      rentCompany: tool.rentedTo,
    };

    const result = await returnsApi.addReturn(newReturn, (progress) => {
      setProgress(progress);
    });

    if (!result) {
      setUploadVisible(false);
      return alert(errorAlertText[language]);
    }

    await rentedApi.deleteRentedTool(tool);
  };

  const handleReturnButtonPress = () => {
    Alert.alert(
      handleReturnButtonText[language]['title'],
      handleReturnButtonText[language]['message'],
      [
        { text: handleReturnButtonText[language]['buttonTexts']['no'] },
        {
          text: handleReturnButtonText[language]['buttonTexts']['yes'],
          onPress: handleReturn,
        },
      ]
    );
  };
  return (
    <Screen style={styles.screen}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => {
          setUploadVisible(false);
          setTimeout(() => {
            navigation.navigate('RentedToolsScreen');
          }, 500);
        }}
      />
      <View style={styles.container}>
        <View style={appStyles.heading}>
          <AppText style={appStyles.headingText}>{tool.name}</AppText>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons
          name="home-city"
          size={30}
          color={colors.primaryOpacity}
        />
        <AppText style={styles.label}>{companyLabel[language]}</AppText>
        <AppText style={styles.info}>{tool.rentedTo}</AppText>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons
          name="city"
          size={30}
          color={colors.primaryOpacity}
        />
        <AppText style={styles.label}>{projectLabel[language]}</AppText>
        <AppText style={styles.info}>{tool.project.name}</AppText>
      </View>

      <View style={styles.infoContainer}>
        <MaterialCommunityIcons
          name="calendar"
          size={30}
          color={colors.primaryOpacity}
        />
        <AppText style={styles.label}>{startDateLabel[language]}</AppText>
        <AppText style={styles.info}>
          {rentStartDate.toLocaleDateString()}
        </AppText>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title={buttonText[language]}
          color="green"
          onPress={handleReturnButtonPress}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    marginTop: 70,
  },
  label: {
    color: colors.primary,
    textTransform: 'capitalize',
  },
  info: {
    color: colors.primaryOpacity,
    fontSize: 20,
    padding: 5,
    textTransform: 'capitalize',
  },
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
});
