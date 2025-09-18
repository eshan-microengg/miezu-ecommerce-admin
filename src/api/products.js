import axios from "axios";
import { BASE_URL } from "../const";

export const GetProducts = (params) => {
  return axios.get(`${BASE_URL}/products`, {
    params: params
  });
};


export const AddNewProduct = (productData) => axios.post(
    `${BASE_URL}/products`,
    productData
)

export const DeleteProduct = (id) => axios.delete(
    `${BASE_URL}/products/${id}`
)

export const GetProductByID = (id) => axios.get(
    `${BASE_URL}/products/${id}`
)

export const UpdateProductByID = (id , productData) => axios.put(
    `${BASE_URL}/products/${id}`,
    productData
)

export const productReview = (payload) => axios.post(
    `${BASE_URL}/reviews`,
    payload
);