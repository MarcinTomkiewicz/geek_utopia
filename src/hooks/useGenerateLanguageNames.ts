import { useEffect, useState } from "react";
import { KeyValueInterface } from "../utils/interfaces"
import { useLanguagePacks } from "./useLanguagePacks";

export const useGenerateLanguageNames = (langCode: number) => {
    const [languageNames, setLanguageNames] = useState<KeyValueInterface[]>([]);
    const language = useLanguagePacks();

    useEffect(() => {
    setLanguageNames([
        {key: 1, value: language?.labels?.langPolish[langCode]},
        {key: 2, value: language?.labels?.langEnglish[langCode]}
    ])
}, [langCode, language?.labels?.langPolish, language?.labels?.langEnglish]) 

    return languageNames;
  }