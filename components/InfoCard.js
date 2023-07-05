import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';

export default function InfoCard({ infoToDisplay, data, onPress, icon }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {icon && (
          <View>
            <MaterialCommunityIcons
              name={icon}
              size={30}
              color={colors.primaryOpacity}
            />
          </View>
        )}
        <AppText style={styles.text}>{infoToDisplay}</AppText>
        <AppText style={styles.data}>{data}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    margin: 10,
    shadowOpacity: 0.2,
    shadowColor: colors.dark,
    shadowOffset: { height: 10, width: 10 },
    shadowRadius: 12,
    borderRadius: 20,
    elevation: 12,
  },
  text: {
    color: colors.primaryOpacity,
    marginHorizontal: 15,
  },
  data: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: colors.primaryOpacity,
  },
});
