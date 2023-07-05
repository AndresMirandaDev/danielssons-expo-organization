import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Screen from '../../components/Screen';
import NavButton from '../../components/NavButton';
import colors from '../../config/colors';
import ListItemSeparator from '../../components/ListItemSeparator';
import { LanguageContext } from '../../language/languageContext';

const toolsActions = [
  {
    title: {
      en: 'Show all rented tools',
      sv: 'Visa alla hyrda verktyg',
      es: 'Ver todas las herramientas alquiladas',
    },
    path: 'RentedToolsListScreen',
    icon: 'magnify',
  },
  {
    title: {
      en: 'Register rented tool',
      sv: 'Registrera hyrd verktyg',
      es: 'Registrar alquiler',
    },
    path: 'RegisterRentedTool',
    icon: 'plus',
  },
  {
    title: {
      en: 'Returns',
      sv: 'Returer',
      es: 'Retornos',
    },
    path: 'ReturnsScreen',
    icon: 'archive-check',
  },
];

export default function RentedToolsScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={toolsActions}
        keyExtractor={(item) => item.title[language]}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <NavButton
              icon={item.icon}
              title={item.title[language]}
              onPress={() => navigation.navigate(item.path)}
            />
          );
        }}
        ItemSeparatorComponent={<ListItemSeparator color={colors.primary} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryOpacity,
    minHeight: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
