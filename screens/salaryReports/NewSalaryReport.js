import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import Screen from '../../components/Screen';

import colors from '../../config/colors';
import AppForm from '../../components/forms/AppForm';
import useAuth from '../../auth/useAuth';
import AuthContext from '../../auth/context';
import AppText from '../../components/AppText';
import useMonth from '../../hooks/useMonth';
import WorkDayFormInput from '../../components/reports/WorkDayFormInput';
import SubmitButton from '../../components/SubmitButton';
import salaryreportsApi from '../../api/salaryreports';
import UploadScreen from '../UploadScreen';
import { LanguageContext } from '../../language/languageContext';
import appStyles from '../../config/styles';

const errorText = {
  en: 'Salary report could not be sent.',
  sv: 'Det gick inte att skicka lön rapport.',
  es: 'No se pudo enviar reporte salarial.',
};

const headingText = {
  en: 'Send report for',
  sv: 'Skicka rapport för',
  es: 'Enviar reporte para',
};

const buttonText = {
  en: 'Send in report',
  sv: 'Skicka in rapport',
  es: 'Enviar reporte',
};
export default function NewSalaryReport() {
  const { language } = useContext(LanguageContext);
  const auth = useAuth(AuthContext);
  const month = useMonth(new Date());

  const { user } = auth;

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (report, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    let newReport = JSON.parse(JSON.stringify(report));

    newReport.workDays.map((workday) => {
      workday.places.forEach((place) => {
        place.project = place.project._id;
      });
      newReport.worker = user._id;
    });

    const result = await salaryreportsApi.newSalaryReport(
      newReport,
      (progress) => {
        setProgress(progress);
      }
    );

    if (!result.ok) {
      setUploadVisible(false);
      alert(errorText[language]);
    }
    resetForm();
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        progress={progress}
        visible={uploadVisible}
        onDone={() => setUploadVisible(false)}
      />
      <View style={styles.container}>
        <View style={appStyles.heading}>
          <AppText style={appStyles.headingText}>
            {headingText[language]} {month}
          </AppText>
        </View>
        <AppForm
          initialValues={{
            worker: user,
            date: new Date(),
            workDays: [],
          }}
          onSubmit={handleSubmit}
        >
          <WorkDayFormInput name="workDays" />

          <SubmitButton title={buttonText[language]} color="green" />
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryOpacity,
  },
  container: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },
});
