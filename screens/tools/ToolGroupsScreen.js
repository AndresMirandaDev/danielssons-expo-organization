import { Button, FlatList, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import toolGroupsApi from '../../api/toolGroups';
import Screen from '../../components/Screen';
import useApi from '../../hooks/useApi';
import ConnectivityError from '../../components/ConnectivityError';
import colors from '../../config/colors';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import ToolGroupListItem from '../../components/toolGroups/ToolGroupListItem';
import AppText from '../../components/AppText';
import ListItemSeparator from '../../components/ListItemSeparator';
import { useIsFocused } from '@react-navigation/native';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const titleText = {
  en: 'Tool groups',
  sv: 'Verktygs grupper',
  es: 'Grupos de herramientas',
};

const buttonText = {
  en: '+ Add group',
  sv: '+ Lägg till grupp',
  es: '+ Agregar grupo',
};
export default function ToolGroupsScreen({ navigation }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);
  const {
    data: toolGroups,
    request: loadGroups,
    loading,
    error,
  } = useApi(toolGroupsApi.getToolGroups);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadGroups();
    }
  }, [isFocused]);

  return (
    <Screen style={styles.screen}>
      {error && <ConnectivityError loadDataFunction={loadGroups} />}
      <AppActivityIndicator visible={loading} />
      <View style={appStyles.heading}>
        <AppText style={appStyles.headingText}>{titleText[language]}</AppText>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={toolGroups}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ToolGroupListItem
                group={item}
                onPress={() =>
                  navigation.navigate('ToolGroupDetailScreen', item)
                }
              />
            );
          }}
          ItemSeparatorComponent={ListItemSeparator}
        />
        <Button
          title={buttonText[language]}
          color={colors.primaryOpacity}
          onPress={() => navigation.navigate('RegisterToolGroupScreen')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    minHeight: '100%',
  },

  listContainer: {
    flex: 1,
    paddingBottom: 50,
  },
});
