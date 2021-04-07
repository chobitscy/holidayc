import {post} from "./request";

export const check = (data) => post('/check', data);

export const insert = (date) => post('/insert', date);