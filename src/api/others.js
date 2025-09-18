import axios from "axios";
import { BASE_URL } from "../const";

export const GetOthersPage = () => axios.get(
    `${BASE_URL}/pageContent?slug_url=/others`
)

export const UpdateOthersPage = (data) => axios.put(
    `${BASE_URL}/pageContent?slug_url=/others`,
    data
)
