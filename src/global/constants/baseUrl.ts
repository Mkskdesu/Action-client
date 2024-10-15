import { isDev } from "solid-js/web";

export const baseUrl = isDev ? "http://localhost:3000" : "https://api.actionapp.jp";