import { Timestamp } from "firebase/firestore";

// COMPONENT PROPS' INTERFACES
export interface TagsProps {
  article: ArticleParameters | undefined,
  variant?: "small" | "normal" | undefined,
}

export interface ArticleType {
  articleType?: string;
  startFrom?: number;
  howMany?: number;
  id?: number;
}

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
    short_descr: string;
    databaseTitle: string;
  }

export interface Months {
    key: number;
    value: string;
  }