import client from './client';

const endpoint = '/projects';

const getProjects = () => {
  return client.get(endpoint);
};

const addProject = (project, onUploadProgress) => {
  const newProject = {
    name: project.name,
    address: project.address,
    supervisor: project.supervisor._id,
    startDate: project.startDate,
    endDate: project.endDate,
    projectNumber: project.projectNumber,
  };

  return client.post(endpoint, newProject, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

const updateProject = (project, onUploadProgress) => {
  const updatedProject = {
    name: project.name,
    address: project.address,
    supervisor: project.supervisor,
    startDate: project.startDate,
    endDate: project.endDate,
    projectNumber: project.projectNumber,
  };

  return client.put(endpoint + '/' + project._id, updatedProject, {
    onUploadProgress: (progress) => {
      onUploadProgress(progress.loaded / progress.total);
    },
  });
};

const deleteProject = (project) => {
  return client.delete(endpoint + '/' + project._id);
};

export default {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
};
