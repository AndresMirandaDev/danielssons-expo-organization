import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import toolsApi from '../../api/tools';
import ToolListItem from '../../components/ToolListItem';
import ListItemSeparator from '../../components/ListItemSeparator';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import AppButton from '../../components/AppButton';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const toolText = {
  en: 'Tools',
  sv: 'Verktyg',
  es: 'Herramientas',
};

const editButtonText = {
  en: 'Edit group',
  sv: 'Redigera grupp',
  es: 'Editar grupo',
};
export default function ToolGroupDetailScreen({ route, navigation }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const group = route.params;
  const [tools, setTools] = useState([]);

  const [loading, setLoading] = useState(false);

  const getToolsInGroup = () => {
    setLoading(true);
    toolsApi.getTools().then((json) => {
      const toolsInGroup = json.data.filter((t) => {
        return t.toolGroup && t.toolGroup._id === group._id;
      });
      setTools(toolsInGroup);
      setLoading(false);
    });
  };

  useEffect(() => {
    getToolsInGroup();
  }, []);
  return (
    <Screen style={styles.screen}>
      <View style={appStyles.heading}>
        <AppText style={appStyles.headingText}>{group.name}</AppText>
      </View>
      <View style={styles.descriptionContainer}>
        <AppText style={styles.description}>{group.description}</AppText>
      </View>
      <View style={styles.toolsHeadingContainer}>
        <View>
          <MaterialCommunityIcons
            name="tools"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
        <AppText style={styles.toolsHeading}>{toolText[language]}</AppText>
      </View>
      <View style={styles.listContainer}>
        <AppActivityIndicator visible={loading} />
        <FlatList
          data={tools}
          renderItem={({ item }) => {
            return (
              <ToolListItem
                tool={item}
                onPress={() => {
                  navigation.navigate('ToolDetailsScreen', item);
                }}
              />
            );
          }}
          ItemSeparatorComponent={<ListItemSeparator />}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title={editButtonText[language]}
          onPress={() => navigation.navigate('EditToolGroupScreen', group)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },
  descriptionContainer: {
    borderStyle: 'solid',
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
  description: {
    color: colors.primaryOpacity,
    padding: 10,
  },

  toolsHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.light,
  },
  toolsHeading: {
    fontSize: 30,
    color: colors.primaryOpacity,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  buttonContainer: {
    padding: 20,
  },
});
