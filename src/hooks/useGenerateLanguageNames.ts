import { useEffect, useState } from "react";
import { KeyValueInterface } from "../utils/interfaces"
import { useLanguagePacks } from "./useLanguagePacks";
import { useLanguageSettings } from "./useLanguageSettings";

export const useGenerateLanguageNames = (langCode: number) => {
    const [languageNames, setLanguageNames] = useState<KeyValueInterface[]>([]);
    const language = useLanguagePacks();

    useEffect(() => {
    setLanguageNames([
        {key: 1, value: language?.labels?.langPolish[langCode]},
        {key: 2, value: language?.labels?.langEnglish[langCode]}
    ])
}, [langCode]) 

    return languageNames;
  }