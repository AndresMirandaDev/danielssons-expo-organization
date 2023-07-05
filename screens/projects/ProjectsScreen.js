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
      en: 'Show project',
      sv: 'Visa projekt',
      es: 'Ver proyecto',
    },
    path: 'SearchProjectScreen',
    icon: 'magnify',
  },
  {
    title: {
      en: 'New project',
      sv: 'Ny projekt',
      es: 'Nuevo proyecto',
    },
    path: 'RegisterProjectScreen',
    icon: 'plus',
  },
];

export default function ProjectsScreen({ navigation }) {
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
          ); //remember to pass onpress for navigation
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
