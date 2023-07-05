import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Icon from '../components/Icon';

import Screen from '../components/Screen';
import AuthContext from '../auth/context';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import { LanguageContext } from '../language/languageContext';

const phoneText = {
  en: 'Mobile number',
  sv: 'Mobil nummer',
  es: 'Numero móvil',
};

const editButtonText = {
  en: 'Update my information',
  sv: 'Uppdatera min information',
  es: 'Actualizar mi informacion',
};

const permissionButtonText = {
  en: 'Manage users',
  sv: 'Hantera användare',
  es: 'Administrar usuarios',
};

const registerButtonText = {
  en: 'Register new user',
  sv: 'Registrera ny användare',
  es: 'Registrar nuevo usuario',
};

const logoutButtonText = {
  en: 'Log out',
  sv: 'Logga ut',
  es: 'Cerrar sesión',
};

const lamguageSettingsButton = {
  en: 'Language settings',
  sv: 'Språk inställningar',
  es: 'Configuración de idioma',
};
export default function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const { language, options, updateLanguage } = useContext(LanguageContext);

  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.icon}>
            <Icon
              name="account"
              iconColor={colors.white}
              backgroundColor={colors.primaryOpacity}
            />
          </View>
          <AppText style={styles.username}>{user.name}</AppText>
          <AppText style={styles.info}>{user.email}</AppText>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.icon}>
            <Icon
              name="phone"
              iconColor={colors.white}
              backgroundColor={colors.primaryOpacity}
            />
          </View>
          <AppText>{phoneText[language]}</AppText>
          <AppText style={styles.info}>{user.phone}</AppText>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title={editButtonText[language]}
            color="green"
            onPress={() => navigation.navigate('EditUserInfoScreen', user)}
          />
          {user.isAdmin && (
            <AppButton
              title={permissionButtonText[language]}
              onPress={() => navigation.navigate('ManagePermissionsScreen')}
            />
          )}
          {user.isAdmin && (
            <AppButton
              title={registerButtonText[language]}
              onPress={() => navigation.navigate('RegisterUserScreen')}
            />
          )}
          <AppButton
            title={lamguageSettingsButton[language]}
            color="medium"
            onPress={() => navigation.navigate('LanguageOptionsScreen')}
          />
          <AppButton
            title={logoutButtonText[language]}
            onPress={logOut}
            color="danger"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    minHeight: '100%',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: colors.white,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 25,
    textTransform: 'capitalize',
  },
  info: {
    color: colors.medium,
    marginVertical: 10,
  },
  icon: {
    marginVertical: 10,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    padding: 5,
  },
  screen: {
    backgroundColor: colors.primaryOpacity,
  },
});
