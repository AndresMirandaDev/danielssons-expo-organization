import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import SubmitButton from '../../components/SubmitButton';
import UploadScreen from '../UploadScreen';
import toolsApi from '../../api/tools';
import useApi from '../../hooks/useApi';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const headingText = {
  en: 'Dispatch tool to',
  sv: 'Avsända verktyg till',
  es: 'Despachar herramienta a',
};

const instructionsText = {
  en: 'Fill in the tools serial number to dispatch',
  sv: 'Fyll in verktygs serie nummer för avsändning',
  es: 'Ingresa el numero de serie de la herramienta para despachar',
};

const buttonText = {
  en: 'Dispatch tool',
  sv: 'Avsända verktyg',
  es: 'Despachar herramienta',
};
export default function DispatchToolScreen({ route }) {
  const { language } = useContext(LanguageContext);

  const project = route.params;
  const { data: tools, request: loadTools } = useApi(toolsApi.getTools);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadTools();
  }, []);

  const handleSubmit = async ({ serieNumber }, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const toolToDispatch = tools.filter((tool) => {
      return tool.serieNumber === parseInt(serieNumber);
    });

    toolToDispatch[0].project = project._id;

    const result = await toolsApi.dispatchTool(
      toolToDispatch[0],
      (progress) => {
        setProgress(progress);
      }
    );

    if (!result.ok) {
      setUploadVisible(false);
      alert('Det gick inte att avsända vertkyg');
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
        <AppText style={appStyles.headingText}>
          {headingText[language]} {project.name}
        </AppText>
      </View>
      <View style={styles.container}>
        <AppText style={{ color: colors.medium, fontStyle: 'italic' }}>
          {instructionsText[language]}
        </AppText>
        <AppForm
          initialValues={{
            serieNumber: '',
          }}
          onSubmit={handleSubmit}
        >
          <AppFormField
            name="serieNumber"
            icon="identifier"
            placeholder="Serie nummer"
            keyboardType="numeric"
          />
          <SubmitButton title={buttonText[language]} />
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
  container: {
    padding: 20,
  },
});
