import QS from 'query-string';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import Toast from 'react-native-simple-toast';

const parseResponse = response => {
  const { status, ok: responseOK } = response;
  const ok = responseOK && status >= 200 && status < 300;

  return response.text().then(body => {
    const result = isEmpty(body) ? {} : JSON.parse(body);
    if (!ok) {
      const {data = {message: 'something is error.'}} = result;
      Toast.show(data.message);
      throw new Error(data.message);
    }
    return {
      status,
      ok,
      result
    };
  });
};

export const fetchGetWithToken = (url, customHeaders, payload = {}) => {
  const realUrl = isEmpty(payload) ? url : `${url}?${QS.stringify(payload)}`;

  return fetch(realUrl, {
    method: 'GET',
    headers: {
      ...customHeaders,
      'Content-Type': 'application/json',
    },
  })
    .then(parseResponse);
};

export const fetchBasicToken = (url, customHeaders, payload) => {
  const form = new FormData();
  map(payload, (value, key) => form.append(key, value))
  const realUrl = `${url}?${QS.stringify(payload)}`;

  return fetch(realUrl, {
    method: 'POST',
    headers: { ...customHeaders, 'Content-Type': 'application/json' },
  }).then(parseResponse)
};

export const fetchPostWithToken = async (url, customHeaders, payload = {}, qs = {}) => {
  const realUrl = isEmpty(payload) ? url : `${url}?${QS.stringify(qs)}`;
  return fetch(realUrl, {
    method: 'POST',
    headers: {
      ...customHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }).then(parseResponse);
}

export const fetchPatchWithToken = async (url, customHeaders, payload = {}, qs = {}) => {
  const realUrl = isEmpty(payload) ? url : `${url}?${QS.stringify(qs)}`;
  return fetch(realUrl, {
    method: 'PATCH',
    headers: {
      ...customHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }).then(parseResponse);
}

export const fetchWithToken = async (
  url,
  method,
  authorization,
  payload = {},
  qs = {}
) => {
  try {
    const realUrl = `${url}?${QS.stringify(qs)}`;
    const { access_token } = authorization;

    const requestBody = {
      method,
      headers: { Authorization: `bearer ${access_token}`, "Content-Type": "application/json", 'Content-Type': 'application/json', },
      body: JSON.stringify(payload)
    };

    const { ok, result } = await fetch(realUrl, requestBody).then(
      parseResponse
    );

    if (ok) return { ok, result };
    throw new Error(result.data);
  } catch (error) {
    throw error;
  }
};

export const fetchWithoutToken = async (
  url,
  method = "GET",
  payload = {},
  qs = {}
) => {
  try {
    const realUrl = isEmpty(qs)
      ? url
      : `${url}?${QS.stringify(qs)}`;

    const requestBody = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    const res = await fetch(realUrl, requestBody);
    const { statusCode, ok, result } = await parseResponse(res);

    return {
      statusCode,
      ok,
      result
    };

  } catch (error) {
    throw error;
  }
};

export const fetchWithFormData = async (url, customHeaders, formData) => {
  try {
    return fetch(url, {
      method: 'POST',
      headers: {
        ...customHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mimeType: 'multipart/form-data',
      body: formData
    }).then((resp) => resp.json());
  }catch(error) {
    throw error;
  }
};

export const fetchDeleteWithFormData = async (url, customHeaders, formData={}) => {
  try {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        ...customHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mimeType: 'multipart/form-data',
      body: formData
    }).then((resp) => resp.json());
  } catch(error) {
    throw error;
  };
};