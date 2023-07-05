import { StyleSheet, View, Button, Clip } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import toolsApi from '../../api/tools';
import useApi from '../../hooks/useApi';
import { LanguageContext } from '../../language/languageContext';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';
import AppText from '../AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFormikContext } from 'formik';

const placeholderText = {
  en: 'Serie number',
  sv: 'Serie nummer',
  es: 'Número de serie',
};

const buttonText = {
  en: 'Generate',
  sv: 'Generera',
  es: 'Generar',
};

export default function SerieNumberGenerator({ name }) {
  const { language } = useContext(LanguageContext);
  const { data: tools, request: loadTools } = useApi(toolsApi.getTools);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    loadTools();
  }, []);

  const generateNumber = () => {
    const newNumber = Math.floor(Math.random() * 90000) + 10000;
    const checkAvailable = tools.filter((tool) => {
      return tool.serieNumber === newNumber;
    });
    if (checkAvailable.length === 0) setFieldValue(name, newNumber);
    else {
      generateNumber();
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="identifier"
          size={30}
          color={colors.medium}
        />
        <AppText style={styles.text}>
          {values[name] ? values[name] : placeholderText[language]}
        </AppText>
        <Button
          onPress={generateNumber}
          title={buttonText[language]}
          color={colors.green}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    textAlign: 'center',
    color: colors.medium,
  },
});
