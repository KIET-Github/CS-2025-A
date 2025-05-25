// api.js
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");

export const updateData = async (endpoint, data) => {
  const url = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
