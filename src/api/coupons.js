import axios from "axios";
import { BASE_URL } from "../const";

export const getCoupons = () => axios.get(`${BASE_URL}coupons`);

export const updateCoupon = (data) => {
  const { id, ...rest } = data;
  return axios.put(`${BASE_URL}coupons/${id}`, rest);
};

export const deleteCoupon = (id) => axios.delete(`${BASE_URL}coupons/${id}`);

export const createCoupon = (payload) => axios.post(`${BASE_URL}coupons`, payload);