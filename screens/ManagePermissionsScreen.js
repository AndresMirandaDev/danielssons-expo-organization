import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import usersApi from '../api/users';
import UserListItem from '../components/UserListItem';
import AppActivityIndicator from '../components/AppActivityIndicator';
import ConnectivityError from '../components/ConnectivityError';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../language/languageContext';

const alertTitle = {
  en: 'Delete user',
  sv: 'Radera användare',
  es: 'Eliminar usuario',
};

const alertMessage = {
  en: 'User will be deleted, are you sure that you want to continue?',
  sv: 'Användare kommer att raderas, är du säker du vill forsätta?',
  es: 'El usuario sera eliminado, ¿estas seguro que quieres continuar?',
};

const alertButtonNoText = {
  en: 'No',
  sv: 'Nej',
  es: 'No',
};

const alertButtonDeleteText = {
  en: 'Delete',
  sv: 'Radera',
  es: 'Eliminar',
};

export default function ManagePermissionsScreen() {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  const [removedVisible, setRemovedVisible] = useState(false);
  const {
    data: users,
    error,
    loading,
    request: loadUsers,
  } = useApi(usersApi.getAllUsers);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadUsers();
    }
  }, [isFocused]);

  const handleAdminPermission = async (user) => {
    const result = await usersApi.updatePermission(user);

    if (result.ok) loadUsers();
  };

  const handleDelete = async (user) => {
    setRemovedVisible(true);
    const result = await usersApi.deleteUser(user);

    if (!result) {
      alert(errorAlertText[language]);
    }

    loadUsers();
  };

  const handleDeleteButtonPress = (user) => {
    Alert.alert(`${alertTitle[language]}`, `${alertMessage[language]}`, [
      { text: alertButtonNoText[language] },
      {
        text: alertButtonDeleteText[language],
        onPress: () => handleDelete(user),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AppActivityIndicator visible={loading} />
      {error && <ConnectivityError loadDataFunction={loadUsers} />}
      <FlatList
        data={users}
        keyExtractor={(user) => user._id}
        renderItem={({ item }) => {
          return (
            <UserListItem
              user={item}
              onPress={() => handleAdminPermission(item)}
              onDelete={() => {
                handleDeleteButtonPress(item);
              }}
              removedVisible={removedVisible}
              onDeleteDone={setRemovedVisible}
            />
          );
        }}
        ItemSeparatorComponent={<ListItemSeparator color={colors.light} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },
});
