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
      en: 'Search Tool',
      sv: 'Sök verktyg',
      es: 'Buscar herramienta',
    },
    path: 'ToolListScreen',
    icon: 'magnify',
  },
  {
    title: {
      en: 'Register tool',
      sv: 'Registrera verktyg',
      es: 'Registrar herramienta',
    },
    path: 'RegisterToolScreen',
    icon: 'plus',
  },
  {
    title: {
      en: 'Edit tool',
      sv: 'Redigera verktyg',
      es: 'Editar herramienta',
    },
    path: 'SearchToolScreen',
    icon: 'circle-edit-outline',
  },
  {
    title: {
      en: 'Tool groups',
      sv: 'Verktygs grupper',
      es: 'Grupos de herramientas',
    },
    path: 'ToolGroupsScreen',
    icon: 'tools',
  },
];

export default function ToolsScreen({ navigation }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);
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
