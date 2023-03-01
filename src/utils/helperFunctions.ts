import { SortingFunctionParameters } from "./interfaces";

export const compareIdsForSorting = (a: SortingFunctionParameters, b: SortingFunctionParameters) => {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  };

  export const capitalizeFirstLetter = (string: string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };