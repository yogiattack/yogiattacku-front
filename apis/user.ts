import { api } from "./utils/apiClient";
import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
    const response = await api.get("/user");
    const body = await response.json();
    return body.data;
};
