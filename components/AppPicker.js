import {
  FlatList,
  Modal,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import AppText from './AppText';
import Screen from './Screen';
import AppPickerItem from './AppPickerItem';
import { LanguageContext } from '../language/languageContext';

const closeButtonText = {
  en: 'close',
  sv: 'stäng',
  es: 'cerrar',
};

export default function AppPicker({
  icon,
  items,
  nummberOfColumns = 1,
  placeholder,
  onSelectItem,
  selectedItem,
  width = '100%',
  PickerItemComponent = AppPickerItem,
}) {
  const [modal, setModalVisible] = useState(false);
  const { language, options, updateLanguage } = useContext(LanguageContext);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          <AppText style={selectedItem ? styles.text : styles.placeholder}>
            {selectedItem ? selectedItem.name : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.secondary}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modal} animationType="slide">
        <Screen>
          <View style={styles.modal}>
            <Button
              title={closeButtonText[language]}
              onPress={() => setModalVisible(false)}
              color={colors.primary}
            />
            <FlatList
              data={items}
              keyExtractor={(item) => item._id}
              numColumns={nummberOfColumns}
              renderItem={({ item }) => {
                return (
                  <AppPickerItem
                    item={item}
                    label={item.name}
                    onPress={() => {
                      setModalVisible(false);
                      onSelectItem(item);
                    }}
                  />
                );
              }}
            />
          </View>
        </Screen>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  modal: {
    backgroundColor: colors.white,
  },
});
