import { toast } from "react-toastify";

// api.js
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("token");

export const putCall = async (endpoint, data) => {
  const url = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        response?.statusText
          ? response?.statusText
          : "Network response was not ok"
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in API call:", error);
    return error;
  }
};
