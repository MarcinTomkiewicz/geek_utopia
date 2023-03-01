import { forwardRef } from "react";
import { useGetCategories } from "../hooks/useGetCategories";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { CategoryInterface } from "./interfaces";
import { capitalizeFirstLetter } from "./helperFunctions"

export const DropdownMenu = forwardRef<any, any>(({ showDropdown, setShowDropdown }: any, ref) => {
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();
  const categories = useGetCategories();

  return (
    <div className="dropdown-wrapper">
      <button ref={ref} onClick={setShowDropdown} className="button__dropdown">
      <span data-content={`${language.headers?.categories[langCode]}`} className="fancy__text">
              {language.headers?.categories[langCode]}
            </span>
      </button>
      <ul className={`dropdown__list ${showDropdown ? "active" : ""}`}>
        {categories.map((category: CategoryInterface, i: number) => (
          <li key={i}>{category?.category === "horror" ? "Horror [18+]" : capitalizeFirstLetter(category?.category)}</li>
        ))}
      </ul>
    </div>
  );
});
