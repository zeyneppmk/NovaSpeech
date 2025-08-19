import axios from 'axios';

const getAdminToken = () => localStorage.getItem('admin_token');
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getAdminToken()}`,
  },
});
const USERS_API = 'http://127.0.0.1:8000/api/users';
const CONTENTS_API = 'http://127.0.0.1:8000/api/contents';

export const fetchUsers = () =>
  axios.get(`${USERS_API}/all-users/`, authHeader());

export const deleteUser = (id) =>
  axios.delete(`${USERS_API}/${id}/`, authHeader());

export const fetchBlogs = () =>
  axios.get(`${CONTENTS_API}/blogs/`, authHeader());

export const createBlog = (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('link', data.link);
  if (data.image) {
    formData.append('image', data.image);
  }

  return axios.post(`${CONTENTS_API}/blogs/`, formData, {
    headers: {
      Authorization: `Bearer ${getAdminToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateBlog = (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('link', data.link);

  // 🔥 image alanı sadece dosya türündeyse eklenir. string URL ise gönderilmez.
  if (data.image && typeof data.image !== 'string') {
    formData.append('image', data.image);
  }

  return axios.put(
    `http://127.0.0.1:8000/api/contents/blogs/${id}/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const deleteBlog = (id) =>
  axios.delete(`${CONTENTS_API}/blogs/${id}/`, authHeader());

export const fetchPublicBlogs = () =>
  axios.get(`${CONTENTS_API}/blogs/public/`);

// Home içerikleri
export const fetchHomeContents = () =>
  axios.get(`${CONTENTS_API}/home/`, authHeader());

export const createHomeContent = (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('type', data.type); // hero / card / tech gibi
  if (data.image) formData.append('image', data.image);

  return axios.post(`${CONTENTS_API}/home/`, formData, {
    ...authHeader(),
    headers: {
      ...authHeader().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateHomeContent = (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('type', data.type);
  if (data.image) formData.append('image', data.image);

  return axios.put(`${CONTENTS_API}/home/${id}/`, formData, {
    ...authHeader(),
    headers: {
      ...authHeader().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteHomeContent = (id) =>
  axios.delete(`${CONTENTS_API}/home/${id}/`, authHeader());
