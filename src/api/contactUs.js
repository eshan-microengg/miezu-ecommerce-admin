import axios from "axios"; 
import { BASE_URL } from "../const";

export const GetContactUsPage = () => axios.get(
    `${BASE_URL}/pageContent?slug_url=/contact_us`
)

export const UpdateContactUsPage = (data) => axios.put(
    `${BASE_URL}/pageContent?slug_url=/contact_us`,
    data
)
