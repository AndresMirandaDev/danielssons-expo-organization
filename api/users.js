import client from './client';

const endpoint = '/users';

const getAllUsers = () => {
  return client.get(endpoint);
};

const updatePermission = (user) => {
  const updatedUser = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
  };

  if (user.isAdmin) {
    updatedUser.isAdmin = false;
  } else {
    updatedUser.isAdmin = true;
  }

  return client.put(endpoint + '/' + user._id, updatedUser);
};

const addUser = (user, onUploadProgress) => {
  return client.post(endpoint, user, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

const deleteUser = (user, onUploadProgress) => {
  return client.delete(endpoint + '/' + user._id);
};
export default {
  addUser,
  getAllUsers,
  updatePermission,
  deleteUser,
};
