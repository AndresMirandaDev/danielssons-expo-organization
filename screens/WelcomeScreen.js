import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React, { useContext } from 'react';
import AppButton from '../components/AppButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppText from '../components/AppText';
import { LanguageContext } from '../language/languageContext';

const buttonText = {
  en: 'Log in',
  sv: 'Logga in',
  es: 'Inicia Sesion',
};

const slogan = {
  en: 'A ToolMaster application.',
  sv: 'En Toolmaster Applikation.',
  es: 'Una aplicacion ToolMaster',
};

const copyright = {
  en: 'Developed by Andres Miranda',
  sv: 'Utvecklad av Andres Miranda',
  es: 'Desarrollado por Andres Miranda',
};
export default function WelcomeScreen({ navigation }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <AppText style={styles.tagLine}>{slogan[language]}</AppText>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title={buttonText[language]}
          color="primary"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />

        <AppText style={styles.copyright}>
          {copyright[language]}{' '}
          <MaterialCommunityIcons name="copyright" color={colors.yellow} />{' '}
        </AppText>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 100,
    margin: 10,
  },
  logo: {
    width: 200,
    height: 200,
    margin: 10,
  },
  tagLine: {
    color: colors.white,
    textAlign: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  copyright: {
    color: colors.light,
    textAlign: 'center',
    fontSize: 12,
  },
});
