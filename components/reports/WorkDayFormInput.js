import {
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Swipeable } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppDatePicker from '../forms/AppDatePicker';
import AppFormPicker from '../forms/AppFormPicker';
import projectsApi from '../../api/projects';
import useApi from '../../hooks/useApi';
import colors from '../../config/colors';
import AppFormField from '../forms/AppFormField';
import AppForm from '../forms/AppForm';
import PlaceSubmitButton from './PlaceSubmitButton';
import SubmitButton from '../SubmitButton';
import { useFormikContext } from 'formik';
import SubmittedDayListitem from './SubmittedDayListitem';
import SubmittedDaysHeader from './SubmittedDaysHeader';
import SubmittedWorkDaysListFooter from './SubmittedWorkDaysListFooter';
import ListItemDeleteAction from '../ListItemDeleteAction';
import { LanguageContext } from '../../language/languageContext';

const projectsButtons = [
  {
    placeholder: {
      en: 'Project',
      sv: 'Projekt',
      es: 'Proyecto',
    },
    id: 1,
  },
];

const placeSchema = Yup.object().shape({
  project: Yup.object().required(),
  hours: Yup.string().required(),
});

const workDaySchema = Yup.object().shape({
  date: Yup.date().required(),
});

const datePlaceholderText = {
  en: 'Date',
  sv: 'Datum',
  es: 'Fecha',
};

const hoursPlaceholderText = {
  en: 'Hours',
  sv: 'Timmar',
  es: 'Horas',
};

const addProjectButtonText = {
  en: '+ Add project',
  sv: '+ Lägg till projekt',
  es: '+ Agregar proyecto',
};

const submitWorkdayButtonText = {
  en: 'Submit in workday',
  sv: 'Skicka in arbetsdag',
  es: 'Enviar dia de trabajo',
};

const noProjectErrorText = {
  en: 'No project has been chosen.',
  sv: 'Inga projekt har valts.',
  es: 'No se ha escogido ningun proyecto.',
};

export default function WorkDayFormInput({ name }) {
  const { language } = useContext(LanguageContext);
  const { setFieldValue, values } = useFormikContext();

  const [workPlaces, setWorkPlaces] = useState([]);
  const [projectButtons, setProjectButtons] = useState(projectsButtons);
  const { data: projects, request: loadProjects } = useApi(
    projectsApi.getProjects
  );
  const [submittedDays, setSubmittedDays] = useState([]);

  useEffect(() => {
    setSubmittedDays(values[name]);
  }, [values[name]]);

  const submittedDaysScrollView = useRef();
  useEffect(() => {
    loadProjects();
  }, []);

  const resetPlaces = () => {
    setProjectButtons([]);
    setWorkPlaces([]);
  };

  const handleAddProjectInput = () => {
    setProjectButtons((s) => {
      return [
        ...s,
        {
          placeholder: {
            en: 'Project',
            sv: 'Projekt',
            es: 'Proyecto',
          },
          id: s.length + 1,
        },
      ];
    });
  };

  const handleRemoveProjectInput = (button) => {
    setProjectButtons(
      projectButtons.filter((b) => {
        return b.id !== button.id;
      })
    );
  };

  const handlePlaceSubmit = (place) => {
    setWorkPlaces((w) => {
      return [
        ...w,
        {
          project: place.project,
          hours: place.hours,
        },
      ];
    });
  };

  const handleWorkDaySubmit = (workDay, { resetForm }) => {
    if (workPlaces.length > 0) {
      const newWorkDay = {
        date: workDay.date,
        places: [...workPlaces],
      };

      setFieldValue(name, [...values[name], newWorkDay]);
    } else {
      alert(noProjectErrorText[language]);
    }

    resetForm();
    resetPlaces();
  };

  const handleDeleteSubmittedDay = (workDay) => {
    const newWorkDays = values[name].filter((i) => {
      return i.date !== workDay.date;
    });
    setFieldValue(name, newWorkDays);
  };

  return (
    <View style={{ flex: 1, padding: 7 }}>
      <ScrollView>
        <AppForm
          initialValues={{
            date: '',
            workPlaces: [],
          }}
          onSubmit={handleWorkDaySubmit}
          validationSchema={workDaySchema}
        >
          <AppDatePicker
            name="date"
            placeholder={datePlaceholderText[language]}
          />
          {projectButtons.map((button) => {
            return (
              <View style={styles.projectInput} key={button.id}>
                <AppForm
                  initialValues={{
                    project: '',
                    hours: '',
                  }}
                  onSubmit={handlePlaceSubmit}
                  validationSchema={placeSchema}
                >
                  <View>
                    <AppFormPicker
                      placeholder={button.placeholder[language]}
                      items={projects}
                      width={200}
                      name="project"
                      icon="city"
                    />
                    <AppFormField
                      width={200}
                      placeholder={hoursPlaceholderText[language]}
                      name="hours"
                      icon="clock"
                      keyboardType="numeric"
                    />
                  </View>
                  <PlaceSubmitButton />
                </AppForm>
                <TouchableWithoutFeedback
                  onPress={() => handleRemoveProjectInput(button)}
                >
                  <View style={styles.removeInputIcon}>
                    <MaterialCommunityIcons
                      name="close"
                      size={30}
                      color={colors.medium}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
          <Button
            title={addProjectButtonText[language]}
            onPress={handleAddProjectInput}
            color={colors.primaryOpacity}
          />
          <SubmitButton title={submitWorkdayButtonText[language]} />
        </AppForm>
        <View style={styles.separator} />
      </ScrollView>
      <ScrollView
        ref={submittedDaysScrollView}
        onContentSizeChange={() =>
          submittedDaysScrollView.current.scrollToEnd()
        }
        stickyHeaderIndices={[0]}
      >
        {submittedDays.length > 0 && <SubmittedDaysHeader />}
        {submittedDays.map((item) => {
          return (
            <Swipeable
              renderRightActions={() => {
                return (
                  <ListItemDeleteAction
                    onPress={() => handleDeleteSubmittedDay(item)}
                  />
                );
              }}
              key={item.places[0].project._id + item.date}
            >
              <View>
                <SubmittedDayListitem workDay={item} />
              </View>
            </Swipeable>
          );
        })}
        {submittedDays.length > 0 && (
          <SubmittedWorkDaysListFooter workDays={values[name]} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  projectInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeInputIcon: {
    backgroundColor: colors.light,
    marginLeft: 10,
    borderRadius: 50,
    padding: 10,
  },
  separator: {
    width: '100%',
    minHeight: 2,
    backgroundColor: colors.light,
  },
});
