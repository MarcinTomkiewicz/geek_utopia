import { Image } from "react-bootstrap";
import { useGenerateLanguageNames } from "../hooks/useGenerateLanguageNames";
import { useUser } from "../hooks/useUser";
import { Logout } from "../LoginAndRegistration/Logout";
import { KeyValueInterface, ShowUserProfileProps } from "../utils/interfaces";

export const ShowUserProfile = ({isInLeftPanel}: ShowUserProfileProps) => {
    const user = useUser()
    const languageNames = useGenerateLanguageNames(user?.language);

    return (
        <div className="d-flex flex-column align-items-start justify-content-start my-3">
            <h2 className="align-self-center">Witaj, {user?.name}</h2>
            <div className="d-flex flex-column align-items-start justify-content-start mb-3">
                <Image src={user?.avatar ? user.avatar : `${process.env.PUBLIC_URL + '/logo_1.png'}`} className="my-2 avatar">
                </Image>
                    <div className="photo__text">No photo</div>
                <div><b>Email:</b> {user?.mail}</div>
                <div className="d-flex flex-row justify-content-between"><b>Język:&nbsp;</b>{languageNames.map((language: KeyValueInterface, i: number) => {
                    if (user?.language === i) {
                        return <div key={language?.key}>{language?.value}</div>
                    }
                })}</div>
                {user?.hobby ? <div><b>Zainteresowania:</b> {user.hobby}</div> : ''}
            </div>
            <Logout isInLeftPanel/>
        </div>
    )
}