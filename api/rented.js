import client from './client';

const endpoint = '/rentedtools';

const getRentedTools = () => {
  return client.get(endpoint);
};

const addRentedTool = (rentedTool, onUploadProgress) => {
  return client.post(endpoint, rentedTool, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

const deleteRentedTool = (tool) => {
  console.log(tool._id);
  return client.delete(endpoint + '/' + tool._id);
};

export default {
  addRentedTool,
  getRentedTools,
  deleteRentedTool,
};
