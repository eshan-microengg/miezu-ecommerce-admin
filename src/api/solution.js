import axios from "axios";
import { BASE_URL } from "../const";

export const GetSolutionPage = () => axios.get(
    `${BASE_URL}/pageContent?slug_url=/solution`
)

export const UpdateSolutionPage = (data) => axios.put(
    `${BASE_URL}/pageContent?slug_url=/solution`,
    data
)
