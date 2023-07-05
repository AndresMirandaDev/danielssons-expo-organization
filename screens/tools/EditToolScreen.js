import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppText from '../../components/AppText';
import AppFormField from '../../components/forms/AppFormField';
import SubmitButton from '../../components/SubmitButton';
import AppFormPicker from '../../components/forms/AppFormPicker';
import colors from '../../config/colors';
import UploadScreen from '../UploadScreen';
import useApi from '../../hooks/useApi';
import toolGroupApi from '../../api/toolGroups';
import toolsApi from '../../api/tools';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  serieNumber: Yup.string(),
  toolGroup: Yup.object(),
});

const headingText = {
  en: 'Edit tool',
  sv: 'Redigera verktyg',
  es: 'Editar herramienta',
};

const updateButtonText = {
  en: 'Update tool',
  sv: 'Uppdatera verktyg',
  es: 'Actualizar herramienta',
};

export default function EditToolScreen({ route, navigation }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const tool = route.params[0];
  const { data: toolGroups, request: loadToolGroups } = useApi(
    toolGroupApi.getToolGroups
  );
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadToolGroups();
  }, []);

  const handleSubmit = async (toolToUpdate) => {
    setProgress(0);
    setUploadVisible(true);
    const updatedTool = {
      _id: toolToUpdate._id,
      name: !toolToUpdate.name ? tool.name : toolToUpdate.name,
      serieNumber: !toolToUpdate.serieNumber
        ? tool.serieNumber
        : toolToUpdate.serieNumber,
      toolGroup: !toolToUpdate.toolGroup
        ? tool.toolGroup._id
        : toolToUpdate.toolGroup._id,
    };

    const result = await toolsApi.updateTool(updatedTool, (progress) => {
      setProgress(progress);
    });

    if (!result.ok) {
      setUploadVisible(false);
      alert('Verktyg kunde inte uppdateras');
    }
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
      <View style={appStyles.heading}>
        <AppText style={appStyles.headingText}>{headingText[language]}</AppText>
      </View>
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{
            name: '',
            serieNumber: '',
            toolGroup: '',
            _id: tool._id,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormField name="name" icon="tools" placeholder={tool.name} />
          <AppFormField
            name="serieNumber"
            icon="identifier"
            placeholder={tool.serieNumber.toString()}
          />
          <AppFormPicker
            items={toolGroups}
            name="toolGroup"
            icon="select-group"
            placeholder={
              tool.toolGroup ? tool.toolGroup.name : 'Verktygs grupp'
            }
            width="60%"
          />
          <SubmitButton title={updateButtonText[language]} color="green" />
        </AppForm>
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
