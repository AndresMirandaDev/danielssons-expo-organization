import client from './client';

const endpoint = '/salaryreports';

const getReports = () => {
  return client.get(endpoint);
};

const newSalaryReport = (report, onUploadProgress) => {
  return client.post(endpoint, report, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};
export default {
  getReports,
  newSalaryReport,
};
