import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

// COMPONENT'S PROPS INTERFACES
export interface TagsProps {
  article: ArticleParameters | undefined;
  variant?: "small" | "normal" | undefined;
  filteredTag?: any;
  setFilteredTag?: Dispatch<SetStateAction<string>> | any;
  isFromOnlyPageComponent?: boolean;
}

export interface ArticleType {
  articleType: string;
  startFrom?: number;
  howMany?: number;
  id?: number;
  category?: string;
  defaultPostsOnPage?: number;
  currentTag: string;
}

export interface DispatchTypes {
  nickname?: string;
  email: string;
  password: string;
  error?: string;
}

export interface AddArticleProps {
  categoryOfArticle: string;
  dataToEdit?: ArticleParameters;
}

export interface ShowUserProfileProps {
  isInLeftPanel: boolean;
}

export interface ModalProps {
  setOpenModal: (openModal: boolean) => void; 
  openModal: boolean
}

export interface BusyBoxProps {
  size?: number
}

//DATA INTERFACES
export interface UserData {
  mail: string;
  is_online: boolean;
  is_admin: boolean;
  name: string;
  language: number;
  uid: string;
  avatar: string;
  hobby: string;
}

export interface SortingFunctionParameters {
  id: number
}

export interface ArticleParameters extends SortingFunctionParameters{
  type?: "news" | "article";
  category: string;
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

export interface Properties {
  input: string;
  isRequired: string;
  type: string;
  name: string;
  data: any;
  setData: Dispatch<SetStateAction<DispatchTypes>> | Dispatch<SetStateAction<ArticleParameters>> | any;
  textarea?: boolean;
  disabled?: boolean;
  height?: number;
}

export interface KeyValueInterface {
	key: number,
	value: string,
}

export interface CategoryInterface {
  id: number;
  category: string;
}