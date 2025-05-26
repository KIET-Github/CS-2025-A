const baseUrl = process.env.REACT_APP_API_BASE_URL;

const apiCall = async (endpoint, method, body,) => {
  const url = `${baseUrl}${endpoint}`;

  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
    
  }

  const response = await fetch(url, options);
  if (!response?.ok) {
    throw new Error(`Error:${response?.status} ${response?.statusText}`);
  }
  return response?.json();
};

export default apiCall;
