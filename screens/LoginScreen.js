import { StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppForm from '../components/forms/AppForm';
import ErrorMessage from '../components/ErrorMessage';
import AppFormField from '../components/forms/AppFormField';
import colors from '../config/colors';
import SubmitButton from '../components/SubmitButton';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import { LanguageContext } from '../language/languageContext';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const buttonText = {
  en: 'Log in',
  sv: 'Logga in',
  es: 'Iniciar Sesion',
};

export default function LoginScreen() {
  const auth = useAuth();
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);

    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);

    auth.logIn(result.data['este es el token']);
  };
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      blurRadius={20}
    >
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error={'Invalid email and/or password'}
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          keyboardType="email-address"
          placeholder="email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title={buttonText[language]} />
      </AppForm>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    paddingTop: 100,
  },

  logo: {
    width: 200,
    height: 200,
    margin: 10,
  },
});
