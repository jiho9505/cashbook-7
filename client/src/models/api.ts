const API_ENDPOINT = 'http://localhost:8080/api';

const getData = async (url, accessToken) => {
  try {
    const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('error occur');
    return await res.json();
  } catch (e) {
    throw e;
  }
};

const postData = async (url, data, accessToken) => {
  try {
    const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('error occur');
    return await res.json();
  } catch (e) {
    throw e;
  }
};

const deleteData = async (url, accessToken) => {
  try {
    const res = await fetch(`${API_ENDPOINT}` + `${url}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('error occur');
    return await res.json();
  } catch (e) {
    throw e;
  }
};

/**
 * TODO:
 * e(error) 값은 백에서 어떻게 넘어오는지 확인 후 가공할 예정입니다 :)
 */
export const api = {
  get: async (url, accessToken = '') => {
    try {
      const data = await getData(url, accessToken);

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

  post: async (url, datas, accessToken) => {
    try {
      const data = await postData(url, datas, accessToken);

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

  delete: async (url, accessToken) => {
    try {
      const data = await deleteData(url, accessToken);

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
