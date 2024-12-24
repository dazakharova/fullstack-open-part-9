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
}