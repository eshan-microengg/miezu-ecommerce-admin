import axios from "axios";
import { BASE_URL } from "../const";

export const GetHomePage = () => axios.get(
    `${BASE_URL}/pageContent?slug_url=/home`
)

export const UpdateHomePage = (data) => axios.put(
    `${BASE_URL}/pageContent?slug_url=/home`,
    data
)
