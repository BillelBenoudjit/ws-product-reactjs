import axios from "axios";
import { URL_ROOT } from "../config/config"

export const getHourlyEvents = async () => {
    return await axios.get(`${URL_ROOT}/events/hourly`)
}

export const getDailyEvents = async () => {
    return await axios.get(`${URL_ROOT}/events/daily`)
}

export const getHourlyStats = async () => {
    return await axios.get(`${URL_ROOT}/stats/hourly`)
}

export const getDailyStats = async () => {
    return await axios.get(`${URL_ROOT}/stats/daily`)
}

export const getPoi = async () => {
    return await axios.get(`${URL_ROOT}/poi`)
}
