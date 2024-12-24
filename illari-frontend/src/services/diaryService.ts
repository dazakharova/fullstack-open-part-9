import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types.ts';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaryEntries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

export const createDiaryEntry = (object: NewDiaryEntry) => {
    return axios
        .post(baseUrl, object)
        .then(response => response.data)
        .catch(error => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data.error[0]?.message || "An unknown error occurred";
                throw new Error('Error: ' + message);
            } else {
                throw new Error("An error occurred");
            }
        })
}