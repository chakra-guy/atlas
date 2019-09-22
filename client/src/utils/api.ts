const API = process.env.REACT_APP_API_URL

function headers() {
  let token: string | null = null
  try {
    token = JSON.parse(localStorage.getItem("token") || "{}")
  } catch (error) {
    // ignore
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  }
}

function parseResponse(response: any) {
  return response.json().then((json: any) => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    return json
  })
}

function queryString(params: any) {
  const query = Object.keys(params)
    // .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`) // FIXME ?
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join("&")
  return `${query.length ? "?" : ""}${query}`
}

export default {
  get(url: any, params = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: "GET",
      headers: headers(),
    }).then(parseResponse)
  },

  post(url: any, data: any) {
    const body = JSON.stringify(data)

    return fetch(`${API}${url}`, {
      method: "POST",
      headers: headers(),
      body,
    }).then(parseResponse)
  },

  patch(url: any, data: any) {
    const body = JSON.stringify(data)

    return fetch(`${API}${url}`, {
      method: "PATCH",
      headers: headers(),
      body,
    }).then(parseResponse)
  },

  delete(url: any) {
    return fetch(`${API}${url}`, {
      method: "DELETE",
      headers: headers(),
    }).then(parseResponse)
  },
}
