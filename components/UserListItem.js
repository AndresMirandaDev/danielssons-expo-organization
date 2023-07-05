import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import AppText from './AppText';
import colors from '../config/colors';
import AppButton from './AppButton';
import { LanguageContext } from '../language/languageContext';
import RemovedScreen from '../screens/RemovedScreen';
import usersApi from '../api/users';

const isAdminText = {
  en: {
    is: 'Administrator',
    not: 'Not Administrator',
  },
  sv: {
    is: 'Administratör',
    not: 'Inte Administratör',
  },
  es: {
    is: 'Administrador',
    not: 'No administrador',
  },
};

const buttonText = {
  en: {
    makeAdmin: 'give admin permission',
    cancelAdmin: 'Revoke admin permission',
  },
  sv: {
    makeAdmin: 'Ge admin behörigheter',
    cancelAdmin: 'Upphäva admin behörigheter',
  },
  es: {
    makeAdmin: 'Dar permisos de admin',
    cancelAdmin: 'Revocar permisos de admin',
  },
};

const deleteButtonText = {
  en: 'Delete user',
  sv: 'Radera användare',
  es: 'Eliminar usuario',
};

const errorAlertText = {
  en: 'User could not be deleted.',
  sv: 'Det gick inte att radera användare.',
  es: 'No se pudo eliminar el usuario.',
};

export default function UserListItem({
  user,
  onPress,
  onDelete,
  removedVisible,
  onDeleteDone,
}) {
  const { name, email, isAdmin } = user;
  const { language, options, updateLanguage } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <RemovedScreen
        visible={removedVisible}
        onDone={() => onDeleteDone(false)}
      />
      <AppText style={[styles.text, { textTransform: 'capitalize' }]}>
        {name}
      </AppText>
      <AppText style={styles.text}>{email}</AppText>
      <AppText
        style={{
          color: isAdmin ? colors.green : colors.danger,
          fontWeight: 600,
        }}
      >
        {isAdmin ? isAdminText[language]['is'] : isAdminText[language]['not']}
      </AppText>
      <AppButton
        title={
          isAdmin
            ? buttonText[language]['cancelAdmin']
            : buttonText[language]['makeAdmin']
        }
        color="primaryOpacity"
        onPress={onPress}
      />
      <AppButton
        title={deleteButtonText[language]}
        color="danger"
        onPress={onDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    color: colors.primaryOpacity,
  },
});
