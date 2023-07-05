import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import * as Yup from 'yup';

import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import SubmitButton from '../../components/SubmitButton';
import AppDatePicker from '../../components/forms/AppDatePicker';
import colors from '../../config/colors';
import rentedToolsApi from '../../api/rented';
import UploadScreen from '../UploadScreen';
import AppFormPicker from '../../components/forms/AppFormPicker';
import useApi from '../../hooks/useApi';
import projectsApi from '../../api/projects';
import AppText from '../../components/AppText';
import appStyles from '../../config/styles';
import { LanguageContext } from '../../language/languageContext';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  rentedTo: Yup.string().required(),
  rentStart: Yup.date().required().nullable(),
  project: Yup.object().required(),
});

const headingText = {
  en: 'Register rented tool',
  sv: 'Registrera hyrt verktyg',
  es: 'Registrar herramienta en arriendo',
};

const namePlaceholder = {
  en: 'Name',
  sv: 'Namn',
  es: 'Nombre',
};

const companyPlaceholder = {
  en: ' Rental company',
  sv: 'Uthyrnings företag',
  es: 'Empresa de alquiler',
};

const projectPlaceholder = {
  en: 'Project',
  sv: 'projekt',
  es: 'Proyecto',
};

const startDatePlaceholder = {
  en: 'Start date',
  sv: 'Start datum',
  es: 'Fecha de inicio',
};

const registerButtonText = {
  en: 'Register rent',
  sv: 'Registrera uthyrning',
  es: 'Registrar arriendo',
};

const errorAlertText = {
  en: 'Rented tool could not be registered',
  sv: 'Hyrt verktyg kunde inte registreras',
  es: 'No se pudo registrar la herramienta arrendada',
};

export default function RegisterRentedTool() {
  const { language } = useContext(LanguageContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { data: projects, request: loadProjects } = useApi(
    projectsApi.getProjects
  );

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (tool, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const newRentedTool = {
      name: tool.name,
      rentStart: tool.rentStart,
      rentedTo: tool.rentedTo,
      project: tool.project._id,
    };

    const result = await rentedToolsApi.addRentedTool(
      newRentedTool,
      (progress) => {
        setProgress(progress);
      }
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert(errorAlertText[language]);
    }
    resetForm();
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => setUploadVisible(false)}
      />
      <View style={appStyles.heading}>
        <AppText style={appStyles.headingText}>{headingText[language]}</AppText>
      </View>
      <View style={styles.formContainer}>
        <AppForm
          validationSchema={validationSchema}
          initialValues={{
            name: '',
            rentedTo: '',
            rentStart: '',
            project: '',
          }}
          onSubmit={handleSubmit}
        >
          <AppFormField
            name="name"
            placeholder={namePlaceholder[language]}
            icon="tools"
          />
          <AppFormField
            name="rentedTo"
            placeholder={companyPlaceholder[language]}
            icon="city"
          />

          <AppFormPicker
            items={projects}
            placeholder={projectPlaceholder[language]}
            name="project"
            icon="city"
          />
          <AppDatePicker
            name="rentStart"
            placeholder={startDatePlaceholder[language]}
          />
          <SubmitButton title={registerButtonText[language]} />
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  formContainer: {
    padding: 7,
  },
});
