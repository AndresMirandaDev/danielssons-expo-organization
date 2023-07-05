import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup';

import usersApi from '../../api/users';
import useApi from '../../hooks/useApi';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
import AppForm from '../../components/forms/AppForm';
import AppFormPicker from '../../components/forms/AppFormPicker';
import SubmitButton from '../../components/SubmitButton';
import AppText from '../../components/AppText';
import salaryreportsApi from '../../api/salaryreports';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import { LanguageContext } from '../../language/languageContext';
import useMonth from '../../hooks/useMonth';

const validationSchema = Yup.object().shape({
  user: Yup.object().required(),
});

const placeholderText = {
  en: 'Choose worker to show reports',
  sv: 'Välj jobbare för att visa rapporter',
  es: 'Escoge un trabajador para mostrar sus reportes',
};

const errorText = {
  en: 'No worker has been picked.',
  sv: 'Ingen jobbare har valts.',
  es: 'No se a escogido ningún trabajador.',
};

const sentReportsText = {
  en: 'Sent reports in',
  sv: 'Inskickade rapporter i',
  es: 'Reportes enviados en',
};

const buttonText = {
  en: 'Show reports',
  sv: 'Visa rapporter',
  es: 'Mostrar reportes',
};

export default function SearchSalaryReportScreen({ navigation }) {
  const { language } = useContext(LanguageContext);
  const month = useMonth(new Date());

  const currentDate = new Date();
  const { data: users, request: loadUsers } = useApi(usersApi.getAllUsers);
  const { data: reports, request: loadReports } = useApi(
    salaryreportsApi.getReports
  );

  const [sentReports, setSentReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSentSalaryReports = () => {
    setLoading(true);
    salaryreportsApi.getReports().then((json) => {
      const sent = json.data.filter((r) => {
        return new Date(r.date).getMonth() === currentDate.getMonth(); //fix this to make it check also the year and not only month
      });

      setSentReports(sent);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadUsers();
    getSentSalaryReports();
    loadReports();
  }, []);

  const handleSubmit = ({ user }) => {
    const reportsToShow = reports.filter((r) => {
      return r.worker._id === user._id;
    });

    if (!user) {
      return alert(errorText[language]);
    }
    navigation.navigate('UserSalaryReportsScreen', {
      user: user,
      reports: reportsToShow,
    });
  };
  return (
    <Screen style={styles.screen}>
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{
            user: '',
          }}
          onSubmit={handleSubmit}
        >
          <AppFormPicker
            name="user"
            items={users}
            icon="text-account"
            placeholder={placeholderText[language]}
          />
          <SubmitButton title={buttonText[language]} />
        </AppForm>
      </View>
      <View style={styles.info}>
        <AppActivityIndicator visible={loading} />
        <AppText style={styles.returnsNumber}>{sentReports.length}</AppText>
        <AppText style={styles.text}>
          {sentReportsText[language]} {month}
        </AppText>
        <View>
          <MaterialCommunityIcons
            name="file-check"
            size={50}
            color={colors.primaryOpacity}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },
  formContainer: {
    marginTop: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.light,
    marginTop: 30,
  },
  text: {
    color: colors.medium,
  },
  returnsNumber: {
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: 50,
    marginRight: 10,
    color: colors.primaryOpacity,
  },
});
