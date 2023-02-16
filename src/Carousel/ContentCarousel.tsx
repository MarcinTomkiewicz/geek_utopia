import { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import { useGetArticles } from "../hooks/useGetArticles";
import { ArticleParameters } from "../AdminPanel/AdminPanel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CarouselProps {
  type?: string;
}

export const ContentCarousel = ({ type }: CarouselProps): JSX.Element | null => {
  const articles = useGetArticles(type);
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
                <Link to={`/${type}/${article.id}`} className="general__text w-100" style={{ cursor: "pointer" }}>
                  <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                    <div className="d-flex align-items-center flex-row w-80">
                      <h3 style={{ marginBottom: "0" }}>{article?.title} </h3>
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
                    <div className="d-flex justify-content-between align-items-start flex-column mt-1">
                      <div>Data publikacji: {article.date.toDate().toLocaleString()}</div>
                      <div className="w-100 text-end">Autor: {article?.author}</div>
                    </div>
                  </div>
                  <div className="w-100 fs-6 text-start">{article?.short_descr === undefined || article?.short_descr === "" ? article?.content.substring(0, 200) : article?.short_descr.substring(0, 200)}...</div>
                </Link>
              </div>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};
