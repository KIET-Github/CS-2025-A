// api.js
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");

export const postApiCall = async (endpoint, data) => {
  const url = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Return the result even if response is not OK
    // This allows us to handle specific error codes and messages from the server
    return result;
  } catch (error) {
    console.error("Error in API call:", error);
    return error;
  }
};
