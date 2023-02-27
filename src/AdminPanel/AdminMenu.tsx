import { Link } from "react-router-dom";

const menuItems = [
  { link: "add_news", descr: "Dodaj newsa" },
  { link: "add_article", descr: "Dodaj artykuł" },
  { link: "edit_article", descr: "Edytuj artykuł" },
  // { link: "", descr: "Dodaj artykuł" },
  // { link: "", descr: "Dodaj artykuł" },
  // { link: "", descr: "Dodaj artykuł" },
  // { link: "", descr: "Dodaj artykuł" },
];

export const AdminMenu = () => {
  return (
    <ul
      className="d-flex flex-row justify-content-start align-items-center gap-4 m-0"
      style={{ listStyle: "none" }}
    >
      {menuItems.map((menuItem) => {
        return (
          <li key={menuItem.link}>
            <Link to={menuItem.link} className="general__text">
              {menuItem.descr}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
