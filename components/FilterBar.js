import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup';

import colors from '../config/colors';
import AppFormField from './forms/AppFormField';
import AppForm from './forms/AppForm';
import AppText from './AppText';
import SubmitButton from './SubmitButton';
import Screen from './Screen';
import AppFormPicker from './forms/AppFormPicker';
import AppPickerItem from './AppPickerItem';
import AppButton from './AppButton';
import FormResetButton from './forms/FormResetButton';
import toolGroupsApi from '../api/toolGroups';
import projectsApi from '../api/projects';
import useApi from '../hooks/useApi';
import { LanguageContext } from '../language/languageContext';
import FormCheckbox from './forms/FormCheckBox';

//validation schema for form component

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).label('Name'),
  serieNumber: Yup.number().label('Serie Number'),
  project: Yup.object().nullable().label('Project'),
  toolGroup: Yup.object().nullable().label('Tool Group'),
  available: Yup.boolean().label('Status'),
});

//language text options

const filterText = {
  en: 'Filter',
  sv: 'Filter',
  es: 'Filtro',
};

const closeButtonText = {
  en: 'Close',
  sv: 'Stäng',
  es: 'Cerrar',
};

const submitButtonText = {
  en: 'Search',
  sv: 'Sök',
  es: 'Buscar',
};

const resetButtonText = {
  en: 'Reset',
  sv: 'återställa',
  es: 'Reset',
};

//placeholders

const namePlaceholder = {
  en: 'Name',
  sv: 'Namn',
  es: 'Nombre',
};

const serieNumberPlaceholder = {
  en: 'Serial number',
  sv: 'Serie nummer',
  es: 'Numero de serie',
};

const projectPlaceholder = {
  en: 'Project',
  sv: 'Projekt',
  es: 'Projecto',
};

const toolGroupPlaceholder = {
  en: 'Tool group',
  sv: 'Verktygs grupp',
  es: 'Grupo',
};

const status = {
  label: {
    en: 'Avaliable tools',
    sv: 'Tillgängliga verktyg',
    es: 'Herramientas disponibles',
  },
};
export default function FilterBar({ data: tools, setData }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  const {
    data: toolGroups,
    error: toolGropupsError,
    request: loadToolGroups,
    loading: loadingToolGroups,
  } = useApi(toolGroupsApi.getToolGroups);

  const {
    data: projects,
    error: projectsError,
    request: loadProjects,
    loading: loadingProjects,
  } = useApi(projectsApi.getProjects);

  useEffect(() => {
    console.log('useeffect filterbar.js');
    loadProjects(), loadToolGroups();
  }, []);

  const [showFilter, setShowFilter] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    // Apply filtering based on the form values
    const filteredTools = tools.filter((tool) => {
      if (
        values.name &&
        !tool.name.toLowerCase().includes(values.name.toLowerCase())
      ) {
        return false;
      }
      if (
        values.serieNumber &&
        tool.serieNumber !== parseInt(values.serieNumber)
      ) {
        return false;
      }
      if (values.project && values.project._id !== tool.project?._id) {
        return false;
      }
      if (values.toolGroup && values.toolGroup._id !== tool.toolGroup?._id) {
        return false;
      }
      if (values.available !== '' && values.available !== tool.available) {
        return false;
      }
      return true;
    });
    setData(filteredTools);
    setShowFilter(false);
  };

  const showFilterBar = () => {
    setShowFilter(!showFilter);
  };
  return (
    <View style={showFilter ? styles.container : styles.hiddenFilterBar}>
      <View style={styles.head}>
        <MaterialCommunityIcons
          name="filter-outline"
          color={colors.primary}
          size={30}
        />
        <AppText style={styles.headText}>{filterText[language]}</AppText>
        <TouchableWithoutFeedback onPress={showFilterBar}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={colors.medium}
          />
        </TouchableWithoutFeedback>
      </View>

      <Modal visible={showFilter} animationType="fade">
        <ScrollView keyboardShouldPersistTaps="never" scrollEnabled={false}>
          <Screen>
            <View style={styles.formContainer}>
              <Button
                title={closeButtonText[language]}
                onPress={() => setShowFilter(false)}
                color={colors.primary}
              />
              <AppForm
                initialValues={{
                  name: '',
                  serieNumber: '',
                  project: '',
                  available: '',
                  toolGroup: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppFormField
                  icon="text-search"
                  name="name"
                  placeholder={namePlaceholder[language]}
                />
                <AppFormField
                  icon="text-search"
                  name="serieNumber"
                  placeholder={serieNumberPlaceholder[language]}
                />
                <AppFormPicker
                  icon="text-search"
                  items={projects}
                  name="project"
                  placeholder={projectPlaceholder[language]}
                  width="50%"
                  PickerItemComponent={AppPickerItem}
                />
                <AppFormPicker
                  icon="text-search"
                  name="toolGroup"
                  placeholder={toolGroupPlaceholder[language]}
                  items={toolGroups}
                  width="50%"
                  PickerItemComponent={AppPickerItem}
                />
                <FormCheckbox name="available">
                  {status.label[language]}
                </FormCheckbox>
                <SubmitButton title={submitButtonText[language]} />
                <FormResetButton
                  title={resetButtonText[language]}
                  color="secondary"
                />
              </AppForm>
            </View>
          </Screen>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 8,
  },
  head: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  headText: {
    color: colors.primaryOpacity,
    fontSize: 25,
  },
  hiddenFilterBar: {
    height: 60,
    overflow: 'hidden',
    backgroundColor: colors.yellow,
  },
  formContainer: {
    backgroundColor: colors.white,
  },
});
