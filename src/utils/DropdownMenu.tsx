import { forwardRef, useEffect, useState } from "react";
import { useGetCategories } from "../hooks/useGetCategories";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { CategoryInterface } from "./interfaces";
import { capitalizeFirstLetter } from "./helperFunctions"
import { Link } from "react-router-dom";

export const DropdownMenu = forwardRef<any, any>(({ showDropdown, setShowDropdown }: any, ref) => {
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();
  const categories = useGetCategories();

  const [categoryLocale, setCategoryLocale] = useState(language.categories)

  useEffect(() => {
    if (!language.categories) return;
    setCategoryLocale(language.categories)
  }, [language])

  return (
    <div className="dropdown-wrapper">
      <button onClick={setShowDropdown} className="button__dropdown">
      <span data-content={`${language.headers?.categories[langCode]}`} className="fancy__text">
              {language.headers?.categories[langCode]}
            </span>
      </button>
      <ul className={`dropdown__list ${showDropdown ? "active" : ""}`} ref={ref}>
        {categories.map((category: CategoryInterface, i: number) => {
          console.log(category?.abbreviation, categoryLocale);
          
          return (<Link to={`articles/${category.category}`} className="general__text" key={i} style={{cursor: "pointer"}}><li key={i} className="dropdown__menu--item">{category?.category === "horror" ? "Horror [18+]" : capitalizeFirstLetter(category?.category)}</li></Link>
        )})}
      </ul>
    </div>
  );
});
