import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import AppFormPicker from '../../components/forms/AppFormPicker';
import SubmitButton from '../../components/SubmitButton';
import colors from '../../config/colors';
import AppText from '../../components/AppText';
import useApi from '../../hooks/useApi';
import toolGroupsApi from '../../api/toolGroups';
import toolsApi from '../../api/tools';
import UploadScreen from '../UploadScreen';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';
import SerieNumberGenerator from '../../components/forms/SerieNumberGenerator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  serieNumber: Yup.string().required(),
  toolGroup: Yup.object(),
});

const headingText = {
  en: 'Register tool',
  sv: 'Registrera verktyg',
  es: 'Registrar herramienta',
};

const buttonText = {
  en: 'Register new tool',
  sv: 'Registrera ny verktyg',
  es: 'Registrar nueva herramienta',
};

const namePlaceholder = {
  en: 'Name',
  sv: 'Namn',
  es: 'Nombre',
};

const serieNumberPlaceholder = {
  en: 'Serial number',
  sv: 'Serie nummer',
  es: 'Número de serie',
};

const toolGroupPlaceholder = {
  en: 'Tool group',
  sv: 'Verktygs grupp',
  es: 'Grupo de herramientas',
};

const alertMessageText = {
  en: 'New tool could not be registered.',
  sv: 'Det gick inte att spara nya verktyg.',
  es: 'No se pudo registrar la nueva herramienta.',
};

export default function RegisterToolScreen() {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    data: toolGroups,
    error,
    loading,
    request: loadToolGroups,
  } = useApi(toolGroupsApi.getToolGroups);

  useEffect(() => {
    loadToolGroups();
  }, []);

  const handleSubmit = async (tool, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const newTool = {
      name: tool.name,
      serieNumber: tool.serieNumber,
      toolGroup: tool.toolGroup._id,
    };
    const result = await toolsApi.addTool(newTool, (progress) => {
      setProgress(progress);
    });

    if (!result.ok) {
      setUploadVisible(false);
      return alert(alertMessageText[language]);
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
          initialValues={{
            name: '',
            serieNumber: '',
            toolGroup: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            icon="tools"
            name="name"
            placeholder={namePlaceholder[language]}
          />
          <SerieNumberGenerator name="serieNumber" />

          <AppFormPicker
            name="toolGroup"
            items={toolGroups}
            icon="select-group"
            placeholder={toolGroupPlaceholder[language]}
          />
          <SubmitButton title={buttonText[language]} color="green" />
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: '100%',
    backgroundColor: colors.white,
  },
  formContainer: {
    padding: 10,
  },
});
