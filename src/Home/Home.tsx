import { ContentCarousel } from "../Carousel/ContentCarousel"
import { ShowArticles } from "../ShowArticles/ShowArticles"

export const Home = () => {
  return (
    <div className="articles__content--wrapper">
      <ContentCarousel type="news"></ContentCarousel>
      <ShowArticles type="news" howMany={10} />
    </div>
  );
};
