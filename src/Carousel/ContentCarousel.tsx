import { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import { useGetArticles } from "../hooks/useGetArticles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArticleParameters, ArticleType } from "../utils/interfaces";
import { Tags } from "../atoms/Tags/Tags";

export const ContentCarousel = ({ articleType }: ArticleType): JSX.Element | null => {
  const articles = useGetArticles(articleType);
  const articlesToShowInCarousel = articles.slice(0, 5);

  if (articlesToShowInCarousel.length === 0) {
    return null;
  }

  return (
    <>
      <Carousel infiniteLoop centerMode centerSlidePercentage={80} showArrows showThumbs={false} autoPlay stopOnHover swipeable dynamicHeight={false} showIndicators={false} transitionTime={1000} statusFormatter={(current, total) => ``}>
        {articlesToShowInCarousel.map((article: ArticleParameters): any => {
          return (
            <div key={article?.id}>
              <img src={article?.picture} />
              <div className="legend d-flex justify-content-between align-items-start flex-column" style={{ marginTop: "100px" }}>
                <Link to={`/${articleType}/${article.id}`} className="general__text w-100" style={{ cursor: "pointer" }}>
                  <div className="d-flex justify-content-between align-items-center w-100 mb-3 gap-1">
                    <div className="d-flex justify-content-start flex-row" style={{width: "70%"}}>
                      <h2 style={{ marginBottom: "0", textAlign: "left" }}>{article?.title} </h2>
                      {article.is_adult ? (
                        <h5
                          className="mx-2 align-middle"
                          style={{
                            marginBottom: "0",
                          }}>
                          <Badge bg="danger">18+</Badge>
                        </h5>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-start flex-column mt-1 text-right">
                      <div className="w-100 text-end">Data publikacji: {article.date.toDate().toLocaleString()}</div>
                      <div className="w-100 text-end">Autor: {article?.author}</div>
                    </div>
                  </div>
                </Link>
                    <Tags article={article} />
                  <div className="w-100 fs-6 text-start">{article?.short_descr === undefined || article?.short_descr === "" ? article?.content.substring(0, 200) : article?.short_descr.substring(0, 200)}...</div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};
