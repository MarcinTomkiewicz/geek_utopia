import { Link } from "react-router-dom";
import { adminMenuItems } from "../utils/utilsObjects";

export const AdminMenu = (): JSX.Element => {
  return (
    <ul
      className="d-flex flex-row justify-content-start align-items-center gap-4 m-0"
      style={{ listStyle: "none" }}
    >
      {adminMenuItems.map((menuItem) => {
        return (
          <li key={menuItem.link}>
            <Link to={menuItem.link} className="general__text" style={{cursor: "pointer"}}>
              {menuItem.descr}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
