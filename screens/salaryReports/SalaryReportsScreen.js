import { FlatList, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Screen from '../../components/Screen';
import NavButton from '../../components/NavButton';
import colors from '../../config/colors';
import ListItemSeparator from '../../components/ListItemSeparator';
import { LanguageContext } from '../../language/languageContext';

const menuButtons = [
  {
    title: {
      en: 'Show salary reports',
      sv: 'Visa lön rapporter',
      es: 'Ver reportes salariales',
    },
    path: 'SearchSalaryReportScreen',
    icon: 'magnify',
  },
  {
    title: {
      en: 'Send in salary report',
      sv: 'Skicka in lön rapport',
      es: 'Enviar reporte salarial',
    },
    path: 'NewSalaryReport',
    icon: 'file-send-outline',
  },
];

export default function SalaryReportsScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={menuButtons}
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
