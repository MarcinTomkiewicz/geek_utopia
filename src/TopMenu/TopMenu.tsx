import { LogonData } from './LogonData/LogonData';
import { useLanguagePacks } from "../hooks/useLanguagePacks";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

export const TopMenu = () => {
  const language = useLanguagePacks();
  const langCode = useLanguageSettings();
    return (
        <nav className='navigation__bar'>
            <ul className='top__menu'>
                <li className='menu__element'><span data-content={`${language.headers?.main_page[langCode]}`} className='fancy__text'>{language.headers?.main_page[langCode]}</span></li>
                <li className='menu__element'><span data-content={`${language.headers?.categories[langCode]}`} className='fancy__text'>{language.headers?.categories[langCode]}</span></li>
                <li className='menu__element'><span data-content={`${language.headers?.news[langCode]}`} className='fancy__text'>{language.headers?.news[langCode]}</span></li>
                <li className='menu__element'><span data-content={`${language.headers?.about[langCode]}`} className='fancy__text'>{language.headers?.about[langCode]}</span></li>
            </ul>
            <LogonData />
        </nav>
    )
}