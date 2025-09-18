import axios from "axios";
import { BASE_URL } from "../const";

export const GetWaterTypePage = () => axios.get(
    `${BASE_URL}/pageContent?slug_url=/water_type`
)

export const UpdateWaterTypePage = (data) => axios.put(
    `${BASE_URL}/pageContent?slug_url=/water_type`,
    data
)
