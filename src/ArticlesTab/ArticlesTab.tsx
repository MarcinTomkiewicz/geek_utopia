import { Image } from "react-bootstrap"

export const ArticlesTab = () => {
    return (
        <div className="aside__content">
            <h4 className="text-center">Artykuły</h4>
            <div>
            <Image fluid src={process.env.PUBLIC_URL + '/geek_utopia.png'} style={{width: "43%", float: "left", borderRadius: "15px", paddingRight: "10px", paddingTop: "5px", alignSelf: "flex-start"}}></Image>
            <div style={{textAlign: "justify"}} className="text-break">Geek Utopia to wieloplatformowy projekt poświęcony tematyce komiksowej i superbohaterskiej. Jej założycielka i główna realizatorka poprzez filmiki na TikToku i Instagramie promuje zarówno wydawnictwa rodzime jak i zagraniczne. Wnikliwe, często humorystyczne podejście do tematu, skutkuje ciekawymi rezultatami. Geek Utopię spotkać można także na YouTubie, gdzie publikuje dłuższe filmiki, wywiady z ciekawymi ludźmi i recenzje. Jeśli jeszcze nie znacie świata Marvela, DC i innych, jeśli tematyka komiksów nie jest wam jeszcze (dobrze) znana, to na pewno dzięki Geek Utopii poznanie tej gałęzi popkultury będzie łatwe jak nigdy wcześniej.</div>
            </div>
        </div>
    )
}