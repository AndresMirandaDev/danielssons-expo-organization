import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import AppForm from '../components/forms/AppForm';
import { LanguageContext } from '../language/languageContext';
import Screen from '../components/Screen';
import AppFormPicker from '../components/forms/AppFormPicker';
import colors from '../config/colors';
import SubmitButton from '../components/SubmitButton';
import authStorage from '../auth/storage';

const placeholder = {
  en: 'Choose language',
  sv: 'Välj språk',
  es: 'Escoge un idioma',
};

const buttonText = {
  en: 'Change language',
  sv: 'Ändra språk',
  es: 'Cambiar idioma',
};

export default function LanguageOptionsScreen() {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const handleSubmit = ({ language }) => {
    updateLanguage(language.code);
    authStorage.saveLanguage(language.code);
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.formContainer}>
        <AppForm initialValues={{ language: '' }} onSubmit={handleSubmit}>
          <AppFormPicker
            name="language"
            icon="web"
            items={options}
            placeholder={placeholder[language]}
          />
          <SubmitButton title={buttonText[language]} color="green" />
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
