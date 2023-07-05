import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import AppForm from '../../components/forms/AppForm';
import AppFormField from '../../components/forms/AppFormField';
import AppText from '../../components/AppText';
import SubmitButton from '../../components/SubmitButton';
import colors from '../../config/colors';
import toolsApi from '../../api/tools';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const validationSchema = Yup.object().shape({
  serieNumber: Yup.string().required().label('serie nummer'),
});

const headingText = {
  en: 'Edit tool',
  sv: 'Redigera verktyg',
  es: 'Editar herramienta',
};

const labelText = {
  en: 'Enter serie number',
  sv: 'Ange serie nummer',
  es: 'Ingresa numero de serie',
};

const buttonText = {
  en: 'Search',
  sv: 'Sök',
  es: 'Buscar',
};

export default function SearchToolScreen({ navigation }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const {
    data: tools,
    error,
    loading,
    request: loadTools,
  } = useApi(toolsApi.getTools);

  useEffect(() => {
    loadTools();
  }, []);

  const handleSubmit = ({ serieNumber }) => {
    const tool = tools.filter((tool) => {
      return tool.serieNumber === parseInt(serieNumber);
    });
    if (tool.length === 0) return alert('No tool was found');

    navigation.navigate('EditToolScreen', tool);
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
            initialValues={{ serieNumber: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <AppFormField
              name="serieNumber"
              placeholder="XXXXXX"
              icon="identifier"
              keyboardType="numeric"
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
