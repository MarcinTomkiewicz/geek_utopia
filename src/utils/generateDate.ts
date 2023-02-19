import { ArticleParameters, Months } from "./interfaces";
import { monthLabels } from "./utilsObjects";

let dateToShow: string;

export const generateDate = (article: ArticleParameters): string => {
    monthLabels.forEach((month: Months) => {
        if (article?.date.toDate().getMonth() + 1 === month.key) {
            return (dateToShow =
                article?.date.toDate().getDate() +
                " " +
                month.value +
                " " +
                article?.date.toDate().getFullYear());
        }
    });
    return dateToShow;
};