import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import SubmitButton from '../../components/SubmitButton';
import AppFormPicker from '../../components/forms/AppFormPicker';
import useApi from '../../hooks/useApi';
import projectsApi from '../../api/projects';
import appStyles from '../../config/styles';
import { LanguageContext } from '../../language/languageContext';
import { useIsFocused } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  project: Yup.object().required().label('projekt'),
});

const headingText = {
  en: 'Show project',
  sv: 'Visa projekt',
  es: 'Ver proyecto',
};

const labelText = {
  en: 'Choose project to show',
  sv: 'Välj projekt att visa',
  es: 'Escoge proyecto para mostrar',
};

const placeholderText = {
  en: 'Choose project',
  sv: 'Välj projekt',
  es: 'Escoge un proyecto',
};

const buttonText = {
  en: 'Show',
  sv: 'Visa',
  es: 'Mostrar',
};
export default function SearchProjectScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  const {
    data: projects,
    loading,
    error,
    request: loadProjects,
  } = useApi(projectsApi.getProjects);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadProjects();
      console.log('effect called');
    }
  }, [isFocused]);

  const handleSubmit = ({ project }, { resetForm }) => {
    if (!project) return alert('Projekt hittades inte');
    navigation.navigate('ProjectInfoScreen', project);
    resetForm();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <Screen style={styles.screen}>
        <View style={appStyles.heading}>
          <AppText style={appStyles.headingText}>
            {headingText[language]}
          </AppText>
        </View>
        <View style={styles.container}>
          <AppText>{labelText[language]}</AppText>
          <AppForm
            initialValues={{ project: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <AppFormPicker
              name="project"
              items={projects}
              placeholder={placeholderText[language]}
            />
            <SubmitButton title={buttonText[language]} />
          </AppForm>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: '100%',
    backgroundColor: colors.light,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    shadowOffset: { height: 20, width: 10 },
    shadowColor: colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 30,
  },
});
