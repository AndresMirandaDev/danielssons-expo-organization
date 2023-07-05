import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useContext, useEffect } from 'react';

import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/AppText';
import HomeInfoList from '../components/HomeInfoList';
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

import { LanguageContext } from '../language/languageContext';

export default function HomeScreen() {
  const { user } = useAuth(AuthContext);
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const restoreLanguage = async () => {
    const storedLanguage = await authStorage.getLanguage();
    // Set the language in the LanguageProvider context

    updateLanguage(storedLanguage);
  };

  useEffect(() => {
    restoreLanguage();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.headBar}>
          <AppText style={styles.username}>{user.name}</AppText>
        </View>
        <HomeInfoList />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryOpacity,
    flex: 1,
    paddingBottom: 50,
  },
  container: {
    backgroundColor: colors.light,
  },
  headBar: {
    backgroundColor: colors.primary,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: { height: 10, width: 5 },
    shadowOpacity: 0.1,
    elevation: 20,
    marginTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoContainer: {
    backgroundColor: colors.primaryOpacity,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 10,
    top: -10,
    left: 20,
  },
  username: {
    fontSize: 25,
    color: colors.light,
    textTransform: 'capitalize',
  },
});
