import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';

import { LanguageContext } from '../../language/languageContext';
import Screen from '../../components/Screen';
import AppFormField from '../../components/forms/AppFormField';
import colors from '../../config/colors';
import AppForm from '../../components/forms/AppForm';
import AppText from '../../components/AppText';
import SubmitButton from '../../components/SubmitButton';
import toolGroupsApi from '../../api/toolGroups';
import UploadScreen from '../UploadScreen';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/AppButton';
import RemovedScreen from '../RemovedScreen';
import appStyles from '../../config/styles';

const headingText = {
  en: 'Edit tool group',
  sv: 'Redigera verktygs grupp',
  es: 'Editar grupo de herramientas',
};

const updateButtonText = {
  en: 'Update group',
  sv: 'Uppdatera grupp',
  es: 'Actualizar grupo',
};

const deleteButtonText = {
  en: 'Delete tool group',
  sv: 'Radera verktygs grupp',
  es: 'Eliminar grupo de herramientas',
};

export default function EditToolGroupScreen({ route }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const navigation = useNavigation();
  const group = route.params;

  const [uploadVisible, setUploadVisible] = useState(false);
  const [removedVisble, setRemovedVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (groupInfo, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const groupToupdate = {
      name: groupInfo.name ? groupInfo.name : group.name,
      description: groupInfo.description
        ? groupInfo.description
        : group.description,
      id: group._id,
    };

    const result = await toolGroupsApi.updateGroup(
      groupToupdate,
      (progress) => {
        setProgress(progress);
      }
    );
    if (!result.ok) {
      setUploadVisible(false);
      alert('Verktyg Kunde inte uppdateras.');
    }
  };
  const handleDelete = async (group) => {
    setRemovedVisible(true);
    const result = await toolGroupsApi.deleteGroup(group);
    if (!result.ok) {
      setRemovedVisible(false);
      alert('Det gick inte att radera verktygs grupp.');
    }
  };

  const handleDeleteButtonPress = (group) => {
    Alert.alert(
      'Är du säkert?',
      `Verktygs grupp kommer att raderas, vill du forsätta?`,
      [
        { text: 'Nej' },
        {
          text: 'Radera',
          onPress: () => handleDelete(group),
          style: 'destructive',
        },
      ]
    );
  };
  return (
    <Screen style={styles.screen}>
      <UploadScreen
        visible={uploadVisible}
        progress={progress}
        onDone={() => {
          setUploadVisible(false);
          setTimeout(() => {
            navigation.navigate('ToolsScreen');
          }, 1000);
        }}
      />
      <RemovedScreen
        visible={removedVisble}
        onDone={() => {
          setRemovedVisible(false);
          setTimeout(() => {
            navigation.navigate('ToolGroupsScreen');
          }, 1000);
        }}
      />
      <View style={appStyles.heading}>
        <AppText style={appStyles.headingText}>{headingText[language]}</AppText>
      </View>
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{
            name: '',
            description: '',
          }}
          onSubmit={handleSubmit}
        >
          <AppFormField
            name="name"
            placeholder={group.name}
            icon="alphabetical-variant"
          />
          <AppFormField
            name="description"
            placeholder={group.description}
            icon="information"
          />
          <SubmitButton title={updateButtonText[language]} color="green" />
        </AppForm>
        <AppButton
          title={deleteButtonText[language]}
          color="danger"
          onPress={() => handleDeleteButtonPress(group)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },

  formContainer: {
    padding: 7,
  },
});
