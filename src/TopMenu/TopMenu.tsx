import { LogonData } from "./LogonData/LogonData";
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import { DropdownMenu } from "../utils/DropdownMenu";
import useSticky from "../hooks/useSticky";
import { createRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const TopMenu = () => {
  const user = useUser();
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();

  const { sticky, stickyRef } = useSticky();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const myRef = createRef<HTMLButtonElement>();

  const handleClickOutside = (e: any) => {
    if (myRef.current !== null && !myRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <>
      <nav className={`navigation__bar ${sticky ? "sticky" : ""}`} ref={stickyRef}>
        <ul className="top__menu">
          <li className="menu__element">
            <Link to="/" className="general__text">
              <span data-content={`${language.headers?.main_page[langCode]}`} className="fancy__text align-middle">
                {language.headers?.main_page[langCode]}
              </span>
            </Link>
          </li>
          <DropdownMenu showDropdown={showDropdown} setShowDropdown={() => setShowDropdown(!showDropdown)} ref={myRef} className="menu__element" />
          <li className="menu__element">
            <span data-content={`${language.headers?.news[langCode]}`} className="fancy__text">
              {language.headers?.news[langCode]}
            </span>
          </li>
          <li className="menu__element">
            <Link to="/about" className="general__text">
              <span data-content={`${language.headers?.about[langCode]}`} className="fancy__text align-middle">
                {language.headers?.about[langCode]}
              </span>
            </Link>
          </li>
          {user?.is_admin ? (
            <li className="menu__element">
              <Link to="/admin" className="general__text">
                <span data-content="Panel admina" className="fancy__text align-middle">
                  Panel admina
                </span>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        <LogonData />
      </nav>
      {sticky && (
        <div
          style={{
            height: `${stickyRef.current?.clientHeight} ${+100}px`,
          }}
        />
      )}
    </>
  );
};
