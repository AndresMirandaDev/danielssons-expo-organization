import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useContext, useState } from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import AppButton from '../../components/AppButton';
import appStyles from '../../config/styles';
import { LanguageContext } from '../../language/languageContext';
import RemovedScreen from '../RemovedScreen';
import projectsApi from '../../api/projects';

const addressLabel = {
  en: 'Address',
  sv: 'Address',
  es: 'Dirección',
};

const projectNumberLabel = {
  en: 'Project number',
  sv: 'Projekt nummer',
  es: 'Número de proyecto',
};

const supervisorLabel = {
  en: 'Supervisor',
  sv: 'Arbetsledare',
  es: 'Supervisor',
};

const startDateLabel = {
  en: 'Start date',
  sv: 'Start datum',
  es: 'Fecha de inicio',
};

const endDateLabel = {
  en: 'End date',
  sv: 'Slut datum',
  es: 'Fecha de término',
};

const updateButtonText = {
  en: 'Edit',
  sv: 'Regidera',
  es: 'Editar',
};

const dispatchButtonText = {
  en: 'Dispatch tool',
  sv: 'Avsänd verktyg',
  es: 'Despachar herramientas',
};

const deleteButtonText = {
  en: 'Delete project',
  sv: 'Radera Projekt',
  es: 'Eliminar proyecto',
};

//alert text options

const handleDeletePressText = {
  title: {
    en: 'Do you want to continue?',
    sv: 'Vill du forsätta?',
    es: '¿Quieres continuar?',
  },
  message: {
    en: `will be deleted, are you sure?`,
    sv: 'skall raderas, är du säker?',
    es: 'será eliminado, ¿estás seguro?',
  },
  buttonTexts: {
    yes: {
      en: 'Delete',
      sv: 'Radera',
      es: 'Eliminar',
    },
    no: {
      en: 'No',
      sv: 'Nej',
      es: 'No',
    },
  },
};

const errorAlertText = {
  en: 'Project could not be deleted.',
  sv: 'Det gick inte att radera projekt.',
  es: 'El proyecto no se pudo eliminar.',
};

export default function ProjectInfoScreen({ route, navigation }) {
  const { language } = useContext(LanguageContext);
  const {
    name,
    address,
    projectNumber,
    active,
    supervisor,
    startDate,
    endDate,
  } = route.params;

  const [removedVisible, setRemovedVisible] = useState(false);

  const projectStartDate = new Date(startDate);
  const projectEndDate = new Date(endDate);

  const handleDelete = async () => {
    setRemovedVisible(true);

    const result = await projectsApi.deleteProject(route.params);

    if (!result) {
      setRemovedVisible(false);
      alert(errorAlertText[language]);
    }
  };

  const handleDeleteButtonPress = () => {
    Alert.alert(
      handleDeletePressText['title'][language],

      `${name}${handleDeletePressText['message'][language]}`,
      [
        {
          text: handleDeletePressText['buttonTexts']['no'][language],
        },
        {
          text: handleDeletePressText['buttonTexts']['yes'][language],
          style: 'destructive',
          onPress: handleDelete,
        },
      ]
    );
  };

  return (
    <Screen style={styles.screen}>
      <RemovedScreen
        visible={removedVisible}
        onDone={() => {
          setRemovedVisible(false);
          setTimeout(() => {
            navigation.navigate('SearchProjectScreen');
          }, 500);
        }}
      />
      <ScrollView>
        <View style={appStyles.heading}>
          <AppText style={appStyles.headingText}>{name}</AppText>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            size={30}
            color={colors.primaryOpacity}
          />
          <AppText style={styles.label}>{addressLabel[language]}</AppText>
          <AppText style={styles.info}>{address}</AppText>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons
            name="identifier"
            size={30}
            color={colors.primaryOpacity}
          />
          <AppText style={styles.label}>{projectNumberLabel[language]}</AppText>
          <AppText style={styles.info}>{projectNumber}</AppText>
        </View>
        {supervisor && (
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={colors.primaryOpacity}
            />
            <AppText style={styles.label}>{supervisorLabel[language]}</AppText>
            <AppText style={styles.info}>{supervisor.name}</AppText>
          </View>
        )}
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons
            name="calendar"
            size={30}
            color={colors.primaryOpacity}
          />
          <AppText style={styles.label}>{startDateLabel[language]}</AppText>
          <AppText style={styles.info}>
            {projectStartDate.toLocaleDateString()}
          </AppText>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={30}
            color={colors.primaryOpacity}
          />
          <AppText style={styles.label}>{endDateLabel[language]}</AppText>
          <AppText style={styles.info}>
            {projectEndDate.toLocaleDateString()}
          </AppText>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title={updateButtonText[language]}
            color="green"
            onPress={() => {
              navigation.navigate('EditProjectScreen', route.params);
            }}
          />
          <AppButton
            title={dispatchButtonText[language]}
            onPress={() => {
              navigation.navigate('DispatchToolScreen', route.params);
            }}
          />
          <AppButton
            title={deleteButtonText[language]}
            color="danger"
            onPress={handleDeleteButtonPress}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: '100%',
    backgroundColor: colors.white,
  },
  projectName: {
    textAlign: 'center',
    fontSize: 40,
    textTransform: 'capitalize',
    color: colors.primary,
    margin: 5,
    padding: 20,
  },
  infoContainer: {
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
  label: {
    color: colors.medium,
    textTransform: 'capitalize',
    fontSize: 20,
  },
  info: {
    color: colors.primaryOpacity,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 10,
    margin: 10,
  },
});
