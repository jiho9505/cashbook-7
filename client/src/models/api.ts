const API_ENDPOINT = '';

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

/**
 * TODO:
 * e(error) 값은 백에서 어떻게 넘어오는지 확인 후 가공할 예정입니다 :)
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
