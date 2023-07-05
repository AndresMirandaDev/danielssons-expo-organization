import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';
import Icon from './Icon';

export default function NavButton({ title, onPress, icon }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon
          backgroundColor={colors.yellow}
          name={icon}
          size={90}
          iconColor={colors.primary}
        />
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: colors.light,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },
});
