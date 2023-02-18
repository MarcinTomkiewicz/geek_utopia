import { Timestamp } from "firebase/firestore";

export interface ArticleParameters {
    category: string;
    id: number;
    title: string;
    content: string;
    author: string;
    date: Timestamp;
    picture: string;
    rating: number[];
    tags: string[];
    isOnline: boolean;
    isAdult: boolean;
    is_online?: boolean;
    is_adult?: boolean;
    short_descr?: string;
    databaseTitle: string;
  }

export interface Months {
    key: number;
    value: string;
  }