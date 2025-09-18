import axios from "axios";
import { BASE_URL } from "../const";

export const getAllEmployees = () => axios.get(`${BASE_URL}/employees`);

export const addNewEmployee = (payload) => axios.post(`${BASE_URL}/employees`, payload);

export const updateEmployeeById = (data) => {
  const { id, ...rest } = data;
  return axios.put(`${BASE_URL}/employees/${id}`, rest);
};

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/employees/${id}`);
