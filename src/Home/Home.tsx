import { ContentCarousel } from "../Carousel/ContentCarousel"
import { ShowArticles } from "../ShowArticles/ShowArticles"

export const Home = () => {
  return (
    <div className="articles__content--wrapper">
      <ContentCarousel articleType="news"></ContentCarousel>
      <ShowArticles articleType="news" startFrom={6} howMany={10} />
    </div>
  );
};
