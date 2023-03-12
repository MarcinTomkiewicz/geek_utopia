import { Badge } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TagsProps } from "../../utils/interfaces";
import { badgeBackground } from "../../utils/utilsObjects";

export const Tags = ({ article, variant, filteredTag, setFilteredTag, isFromOnlyPageComponent }: TagsProps): JSX.Element => {
  const navigate = useNavigate();
	const location = useLocation();
  
  const handleTagClick = (e: any) => {
    if (setFilteredTag) setFilteredTag(e.target.title);
  };  

  const setNavigation = (tag: string) => {	
    if (isFromOnlyPageComponent) {
      return (
        <Badge onClick={handleTagClick} bg={badgeBackground[Math.floor(Math.random() * badgeBackground.length)]}>
          {tag}
        </Badge>
      );
    } else {
      return (		
        <Link to={`/${article && article?.category === "news" || article?.category === undefined ? "news" : "articles"}/${tag}`}>
          <Badge bg={badgeBackground[Math.floor(Math.random() * badgeBackground.length)]}>
            {tag}
          </Badge>
        </Link>
      );
    }
  };

  return (
    <div className="d-flex flex-row justify-content-start gap-1 align-items-center mt-1 mb-1 flex-wrap w-100">
      {article?.tags[0] !== "" ? (
        article?.tags.map((tag: string) => {
          if (tag === "") {
            return;
          }
          if (variant === "small") {
            return (
              <h6 key={tag} style={{ cursor: "pointer" }}>
                {setNavigation(tag)}
              </h6>
            );
          }
          if (!variant || variant === "normal") {
            return (
              <h5 key={tag} style={{ cursor: "pointer" }}>
                <Badge onClick={handleTagClick} title={tag} bg={badgeBackground[Math.floor(Math.random() * badgeBackground.length)]}>
                  {tag}
                </Badge>
              </h5>
            );
          }
        })
      ) : (
        <div style={{ fontSize: `${variant === "small" ? "10px" : "14px"}` }}>Nie ma żadnych tagów do tego artykułu</div>
      )}
    </div>
  );
};
