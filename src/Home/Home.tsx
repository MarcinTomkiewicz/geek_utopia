import { ContentCarousel } from "../Carousel/ContentCarousel"
import { ShowArticles } from "../ShowArticles/ShowArticles"

export const Home = () => {
  return (
    <div className="articles__content--wrapper">
      <ContentCarousel articleType="news" currentTag="" />
      <ShowArticles articleType="news" startFrom={6} howMany={10} currentTag=""/>
      <ContentCarousel articleType="articles" currentTag="" />
      <ShowArticles articleType="articles" startFrom={6} howMany={10} currentTag=""/>
    </div>
  );
};
