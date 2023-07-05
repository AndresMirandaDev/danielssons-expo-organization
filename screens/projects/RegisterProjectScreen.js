import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import AppFormPicker from '../../components/forms/AppFormPicker';
import SubmitButton from '../../components/SubmitButton';
import FormResetButton from '../../components/forms/FormResetButton';
import colors from '../../config/colors';
import AppDatePicker from '../../components/forms/AppDatePicker';
import useApi from '../../hooks/useApi';
import usersApi from '../../api/users';
import projectsApi from '../../api/projects';
import UploadScreen from '../UploadScreen';
import AppText from '../../components/AppText';
import appStyles from '../../config/styles';
import { LanguageContext } from '../../language/languageContext';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  address: Yup.string().required().label('Address'),
  projectNumber: Yup.string().required().label('Project Number'),
  supervisor: Yup.object(),
  startDate: Yup.date().required().label('Start date'),
  endDate: Yup.date().required().label('End date'),
});

const titleText = {
  en: 'Register new project',
  sv: 'Registrera ny projekt',
  es: 'Registrar nuevo proyecto',
};

const nameLabel = {
  en: 'Name',
  sv: 'Namn',
  es: 'Nombre',
};

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

const registerButtonText = {
  en: 'Register new project',
  sv: 'Registrera ny projekt',
  es: 'Registrar nuevo proyecto',
};

const resetButtonText = {
  en: 'Reset',
  sv: 'Återstålla',
  es: 'Reestablecer',
};

export default function RegisterProjectScreen() {
  const { language } = useContext(LanguageContext);

  const { data: users, request: loadUsers } = useApi(usersApi.getAllUsers);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (project, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await projectsApi.addProject(project, (progress) => {
      setProgress(progress);
    });

    console.log(result);
    if (!result.ok) {
      setUploadVisible(false);
      alert('Det gick inte att registrera nya projektet.');
    }
    resetForm();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never" scrollEnabled={false}>
      <Screen style={styles.screen}>
        <UploadScreen
          visible={uploadVisible}
          progress={progress}
          onDone={() => setUploadVisible(false)}
        />
        <View style={styles.container}>
          <View style={appStyles.heading}>
            <AppText style={appStyles.headingText}>
              {titleText[language]}
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={{
                name: '',
                address: '',
                projectNumber: '',
                supervisor: '',
                startDate: '',
                endDate: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <AppFormField
                icon="alphabetical-variant"
                name="name"
                placeholder={nameLabel[language]}
              />
              <AppFormField
                icon="identifier"
                name="projectNumber"
                placeholder={projectNumberLabel[language]}
                keyboardType="numeric"
              />
              <AppFormField
                icon="map-marker"
                name="address"
                placeholder={addressLabel[language]}
              />
              <AppFormPicker
                items={users}
                placeholder={supervisorLabel[language]}
                name="supervisor"
              />
              <AppDatePicker
                placeholder={startDateLabel[language]}
                name="startDate"
              />
              <AppDatePicker
                placeholder={endDateLabel[language]}
                name="endDate"
              />

              <View style={styles.buttonContainer}>
                <SubmitButton
                  title={registerButtonText[language]}
                  color="green"
                />
                <FormResetButton
                  title={resetButtonText[language]}
                  color="secondary"
                />
              </View>
            </AppForm>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: '100%',
    backgroundColor: colors.white,
  },
  buttonContainer: {
    margin: 10,
    marginTop: 50,
  },
  container: {
    backgroundColor: colors.white,
  },
  formContainer: {
    padding: 7,
  },
  text: {
    color: colors.primary,
    textAlign: 'center',
    padding: 10,
    fontSize: 23,
  },
});
