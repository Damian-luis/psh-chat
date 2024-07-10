import apiClient from "@/utils/axios";

export async function getNewUserData(): Promise<any> {
  try {
    const response = await apiClient.get("https://randomuser.me/api");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}