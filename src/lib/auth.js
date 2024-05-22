import { apiClient } from "./axios";

export const logout = async (token) => {
  try {
    const response = await apiClient.post(
      "/logouttest",
      {},
      {
        headers: {
          "X-AUTH-TOKEN": `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
