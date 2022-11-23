import { forwardRef } from "react";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

export const DropdownMenu = forwardRef<any, any>(({ showDropdown, setShowDropdown }: any, ref) => {
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const items = [
    "Marvel CU", 
    "Marvel Comics", 
    "DC Extended Universe", 
    "DC Comics", 
    "Fantastyka", 
    "Horror"
  ];

  return (
    <div className="dropdown-wrapper">
      <button ref={ref} onClick={setShowDropdown} className="button__dropdown">
      <span data-content={`${language.headers?.categories[langCode]}`} className="fancy__text">
              {language.headers?.categories[langCode]}
            </span>
      </button>
      <ul className={`dropdown__list ${showDropdown ? "active" : ""}`}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
});
