// api.js
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");

export const deleteData = async (endpoint, data) => {
  const url = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in API call:", error);
    return error;
  }
};
