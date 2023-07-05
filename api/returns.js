import client from './client';

const endpoint = '/returns';

const getReturns = () => {
  return client.get(endpoint);
};

const addReturn = (newReturn, onUploadProgress) => {
  return client.post(endpoint, newReturn, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

export default {
  addReturn,
  getReturns,
};
