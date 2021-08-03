const API_ENDPOINT = '/api';

const getData = async (url) => {
  try {
    const res = await fetch(`${API_ENDPOINT}` + `${url}`);
    if (!res.ok) throw new Error('error occur');
    return await res.json();
  } catch (e) {
    throw e;
  }
};

const postData = async (url, data) => {
  try {
    const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('error occur');
    return await res.json();
  } catch (e) {
    throw e;
  }
};

const deleteData = async (url) => {
  try {
    const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('error occur');
    return await res.json();
  } catch (e) {
    throw e;
  }
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
