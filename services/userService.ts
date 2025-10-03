import axiosClient from "../lib/axiosclient";

// *** User type define ***

export interface User {
    id: number;
    name: string;
    email: string;
}

// *** will call all users ***

export const getUsers = async (): Promise<User[]> => {
    const res = await axiosClient.get<User[]>("/users");
    return res.data;
};

// *** Create New User ***

export const createUser = async (payload: Omit<User, "id">): Promise<User> => {
    const res = await axiosClient.post<User>("/users", payload);
    return res.data;
};

// *** Update user ***

export const updateUser = async (
    id: number,
    payload: Partial<User>
): Promise<User> => {
    const res = await axiosClient.put<User>(`/users/${id}`, payload);
    return res.data;
};

// *** Delete user ***

export const deleteUser = async (id:number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
};