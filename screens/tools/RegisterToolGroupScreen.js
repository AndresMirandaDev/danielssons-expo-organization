import { StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';

import React, { useContext, useState } from 'react';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import AppText from '../../components/AppText';
import SubmitButton from '../../components/SubmitButton';
import toolGroupsApi from '../../api/toolGroups';
import UploadScreen from '../UploadScreen';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
});

const headingText = {
  en: 'Add new tool group',
  sv: 'Lägg till verktygs grupp',
  es: 'Agregar grupo de herramientas',
};

const buttonText = {
  en: 'Register new group',
  sv: 'Registrera ny grupp',
  es: 'Registrar nuevo grupo',
};

export default function RegisterToolGroupScreen() {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (group, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await toolGroupsApi.addGroup(group, (progress) => {
      setProgress(progress);
    });
    if (!result.ok) {
      setUploadVisible(false);
      alert('Det gick inte att registrera ny verktygs grupp.');
    }
    resetForm();
  };
  return (
    <Screen style={styles.screen}>
      <UploadScreen
        visible={uploadVisible}
        progress={progress}
        onDone={() => setUploadVisible(false)}
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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormField
            name="name"
            placeholder="namn"
            icon="alphabetical-variant"
          />
          <AppFormField
            name="description"
            placeholder="description"
            icon="information"
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
    padding: 7,
  },
});
