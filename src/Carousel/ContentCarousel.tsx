import { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import { useGetArticles } from "../hooks/useGetArticles";
import { ArticleParameters } from "../AdminPanel/AdminPanel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'


interface CarouselProps {
  type?: string;
}

export const ContentCarousel = ({ type }: CarouselProps): JSX.Element | null => {
  const articles = useGetArticles(type);
  const articlesToShowInCarousel = articles.slice(-5).sort((a, b) => -(a.id > b.id) || +(a.id < b.id));
  if (articlesToShowInCarousel.length === 0) {
    return null;
  }

  const indicatorStyles: CSSProperties = {
    background: '#fff',
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 8px',
};

  return (
    <Carousel infiniteLoop
    centerMode
    centerSlidePercentage={80}
    showArrows
    showThumbs
    autoPlay
    stopOnHover
    swipeable
    dynamicHeight={false}
    showIndicators={false}
    transitionTime={1000}
    thumbWidth={200}
    statusFormatter={(current, total) => ``}
    >
      {articlesToShowInCarousel.map((article: ArticleParameters): any => {
        return (
          <div key={article?.id}>
            <img src={article?.picture} style={{height: "300px", width: "auto"}} />
            <div className="legend" style={{marginTop: "100px"}}>
                <div>
                <h4>{article.title}</h4>
                <div>{article.date.toDate().toLocaleString()}</div>
                </div>
                <div>{article.content.split("\n")[0]}...</div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};
