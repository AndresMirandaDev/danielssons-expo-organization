import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import SubmitButton from '../../components/SubmitButton';
import AppFormPicker from '../../components/forms/AppFormPicker';
import AppDatePicker from '../../components/forms/AppDatePicker';
import useApi from '../../hooks/useApi';
import usersApi from '../../api/users';
import UploadScreen from '../UploadScreen';
import projectsApi from '../../api/projects';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const validationSchema = Yup.object().shape({
  project: Yup.object().required().label('projekt'),
});

const editText = {
  en: 'Edit Project',
  sv: 'Redigera projekt',
  es: 'Editar proyecto',
};

const nameLabel = {
  en: 'Name',
  sv: 'Namn',
  es: 'Nombre',
};

const addressLabel = {
  en: 'Address',
  sv: 'Address',
  es: 'Direccion',
};

const projectNumberLabel = {
  en: 'Project number',
  sv: 'Projekt nummer',
  es: 'Numero de proyecto',
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
  en: 'Update',
  sv: 'Uppdatera',
  es: 'Actualizar',
};

export default function EditProjectScreen({ route }) {
  const { language } = useContext(LanguageContext);

  const project = route.params;

  const {
    data: users,
    error,
    loading,
    request: loadUsers,
  } = useApi(usersApi.getAllUsers);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (projectToUpdate) => {
    setProgress(0);
    setUploadVisible(true);

    const updatedProject = {
      _id: project._id,
      name: !projectToUpdate.name ? project.name : projectToUpdate.name,
      address: !projectToUpdate.address
        ? project.address
        : projectToUpdate.address,
      projectNumber: !projectToUpdate.projectNumber
        ? project.projectNumber
        : projectToUpdate.projectNumber,
      startDate: !projectToUpdate.startDate
        ? project.startDate
        : projectToUpdate.startDate,
      endDate: !projectToUpdate.endDate
        ? project.endDate
        : projectToUpdate.endDate,
    };

    if (projectToUpdate.supervisor === '' && project.supervisor === null) {
      updatedProject.supervisor = null;
    } else if (projectToUpdate.supervisor) {
      updatedProject.supervisor = projectToUpdate.supervisor._id;
    } else if (!projectToUpdate.supervisor && project.supervisor) {
      updatedProject.supervisor = project.supervisor._id;
    }

    const result = await projectsApi.updateProject(
      updatedProject,
      (progress) => {
        setProgress(progress);
      }
    );

    if (!result.ok) {
      setUploadVisible(false);
      alert('Projekt gick inte att uppdateras');
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never" bounces={false}>
      <Screen style={styles.screen}>
        <UploadScreen
          progress={progress}
          visible={uploadVisible}
          onDone={() => setUploadVisible(false)}
        />
        <View style={appStyles.heading}>
          <AppText style={appStyles.headingText}>{editText[language]}</AppText>
        </View>
        <View style={{ padding: 10 }}>
          <AppForm
            initialValues={{
              name: '',
              address: '',
              startDate: '',
              endDate: '',
              projectNumber: '',
              supervisor: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppText style={styles.label}>{nameLabel[language]}</AppText>
            <AppFormField
              name="name"
              placeholder={project.name}
              icon="alphabetical-variant"
            />
            <AppText style={styles.label}>{addressLabel[language]}</AppText>
            <AppFormField
              name="address"
              placeholder={project.address}
              icon="map-marker"
            />
            <AppText style={styles.label}>
              {projectNumberLabel[language]}
            </AppText>
            <AppFormField
              name="projectNumber"
              placeholder={project.projectNumber.toString()}
              icon="identifier"
            />
            <AppText style={styles.label}>{supervisorLabel[language]}</AppText>
            <AppFormPicker
              items={users}
              placeholder={
                project.supervisor
                  ? project.supervisor.name
                  : supervisorLabel[language]
              }
              name="supervisor"
            />
            <AppText style={styles.label}>{startDateLabel[language]}</AppText>
            <AppDatePicker name="startDate" />
            <AppText style={styles.label}>{endDateLabel[language]}</AppText>
            <AppDatePicker name="endDate" />
            <SubmitButton title={updateButtonText[language]} color="green" />
          </AppForm>
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
  label: {
    color: colors.medium,
    padding: 5,
  },
});
