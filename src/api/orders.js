import axios from "axios";
import { BASE_URL } from "../const";

export const GetOrders = () => axios.get(`${BASE_URL}/orderPlaced`);

export const GetOrdersByID = (id) => axios.get(`${BASE_URL}/order/${id}`);

export const deleteProductImage = (id) => axios.delete(`${BASE_URL}/gallery/${id}`);

export const uploadImage = (payload) => {
  const { product_id = 0, file } = payload;

  const formData = new FormData();
  formData.append("product_id", product_id);
  formData.append("file", file);

  return axios.post(`${BASE_URL}/gallery/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllDemos = () => axios.get(`${BASE_URL}/demo/book`);

export const updateDemoById = (id, payload) => axios.put(
  `${BASE_URL}/demo/book/${id}`,
  payload
)

export const getTestimonials = () => axios.get(`${BASE_URL}/testimonials`);

export const updateTestById = (data) => {
  const { id, ...rest } = data;
  return axios.put(`${BASE_URL}/testimonials/${id}`, rest);
};

export const deleteTestById = (id) => axios.delete(`${BASE_URL}/testimonials/${id}`);

export const addTest = (payload) => axios.post(`${BASE_URL}/testimonials`, payload);


export const getBlogs = () => axios.get(`${BASE_URL}/blogs`);
export const updateBlogsById = (id, data) => {
  const { ...rest } = data;
  return axios.put(`${BASE_URL}/blogs/${id}`, rest);
};
export const deleteBlogsById = (id) => axios.delete(`${BASE_URL}/blogs/${id}`);
export const addBlogs = (payload) => axios.post(`${BASE_URL}/blogs`, payload);
