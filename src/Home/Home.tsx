import { ContentCarousel } from "../Carousel/ContentCarousel"

export const Home = () => {
    return (
        <div className="articles__content--wrapper">
        <h1 className="text-center">Witaj na Geek Utopii</h1>
        <ContentCarousel type="news"></ContentCarousel>
        </div>
    )
}