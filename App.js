import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './auth/context';
import authStorage from './auth/storage';
import * as SplashScreen from 'expo-splash-screen';
import { LanguageContext, LanguageProvider } from './language/languageContext';

export default function App() {
  const [user, setUser] = useState();

  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    const languageSetting = await authStorage.getLanguage();
    console.log(languageSetting);

    if (user) setUser(user);
  };

  useEffect(() => {
    console.log('useeffect app.js');
    async function loadPersistedUser() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Promise.all([restoreUser()]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
      setIsReady(true);
      SplashScreen.hideAsync();
    }
    loadPersistedUser();
  }, []);
  if (!isReady) return null;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LanguageProvider>
        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </LanguageProvider>
    </AuthContext.Provider>
  );
}
