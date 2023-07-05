import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../AppText';
import colors from '../../config/colors';

export default function ToolGroupListItem({ group, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <AppText style={styles.name}>{group.name}</AppText>
          <AppText numberOfLines={1} style={styles.description}>
            {group.description}
          </AppText>
        </View>
        <View style={styles.chevron}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={40}
            color={colors.medium}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  name: {
    textTransform: 'capitalize',
    color: colors.primaryOpacity,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  container: {
    padding: 20,
    flexDirection: 'row',
  },
  chevron: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    color: colors.medium,
  },
});
