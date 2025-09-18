import axios from "axios";
import { BASE_URL } from "../const";

export const GetAboutUsPage = () => axios.get(
    `${BASE_URL}/pageContent?slug_url=/about_us`
)

export const UpdateAboutUsPage = (data) => axios.put(
    `${BASE_URL}/pageContent?slug_url=/about_us`,
    data
)
