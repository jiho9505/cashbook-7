const API_ENDPOINT = '/api';

const getData = async (url) => {
  const res = await fetch(`${API_ENDPOINT}` + `${url}`);
  return await res.json();
};

const postData = async (url, data) => {
  const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

const deleteData = async (url) => {
  const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
    method: 'DELETE',
  });
  return await res.json();
};

/*
    e값은 추후에 확인 후 가공한다!
*/
export const api = {
  get: async (url) => {
    try {
      const data = await getData(url);
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  },

  post: async (url, datas) => {
    try {
      const data = await postData(url, datas);
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  },

  delete: async (url) => {
    try {
      const data = await deleteData(url);
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      return {
        success: false,
        message: e,
      };
    }
  },
};
