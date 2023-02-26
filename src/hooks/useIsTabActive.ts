import { useEffect, useState } from "react";

export const useIsTabActive = () => {
const [tabHasFocus, setTabHasFocus] = useState(true);

useEffect(() => {
  const handleFocus = () => {
    setTabHasFocus(true);
  };

  const handleBlur = () => {
    setTabHasFocus(false);
  };

  window.addEventListener('focus', handleFocus);
  window.addEventListener('blur', handleBlur);

  // Clean up
  return () => {
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('blur', handleBlur);
  };
}, []);

return tabHasFocus;

}