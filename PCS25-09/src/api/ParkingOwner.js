import axios from "./axios";

export const getMySpaces = async () => {
  try {
    const res = await axios.get("/parking-owner/my-spaces");
    return { success: true, data: res.data };
  } catch {
    return { success: false };
  }
};

export const getUnbookedSlotsToday = async () => {
  try {
    const res = await axios.get("/parking-owner/today-unbooked-slots");
    return { success: true, data: res.data };
  } catch {
    return { success: false };
  }
};
