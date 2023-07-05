import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import colors from '../config/colors';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/SubmitButton';
import usersApi from '../api/users';
import UploadScreen from './UploadScreen';
import { LanguageContext } from '../language/languageContext';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Namn'),
  email: Yup.string().required().label('Email'),
  password: Yup.string().label('Lösenord').required(),
  phone: Yup.number().label('Mobil nummer').required(),
});

const namePlaceholderText = {
  en: 'Name',
  sv: 'Namn',
  es: 'Nombre',
};

const passwordPlaceholderText = {
  en: 'Password',
  sv: 'Lösenord',
  es: 'Contraseña',
};

const phoneNumberPlaceholderText = {
  en: 'Cellphone number',
  sv: 'Mobil nummer',
  es: 'Numero móvil',
};

const registerButtonText = {
  en: 'Register',
  sv: 'Registrera',
  es: 'Registrar',
};

const errorText = {
  en: 'New user could not be registered.',
  sv: 'Ny användare gick inte att registreras.',
  es: 'No se pudo registrar el nuevo usuario.',
};

export default function RegisterUserScreen() {
  const { language } = useContext(LanguageContext);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (user, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const newUser = {
      ...user,
    };
    newUser.phone = parseInt(user.phone);

    const result = await usersApi.addUser(newUser, (progress) => {
      setProgress(progress);
    });

    if (!result.ok) {
      setUploadVisible(false);
      alert(errorText[language]);
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
      <AppForm
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="name"
          icon="account"
          placeholder={namePlaceholderText[language]}
        />
        <AppFormField name="email" icon="email" placeholder="Email" />
        <AppFormField
          name="password"
          icon="lock"
          placeholder={passwordPlaceholderText[language]}
        />
        <AppFormField
          name="phone"
          icon="phone"
          placeholder={phoneNumberPlaceholderText[language]}
          keyboardType="numeric"
        />
        <View style={styles.button}>
          <SubmitButton title={registerButtonText[language]} color="green" />
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: '100%',
    backgroundColor: colors.white,
  },
  button: {
    padding: 10,
  },
});
