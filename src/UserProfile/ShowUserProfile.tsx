import { Image } from "react-bootstrap";
import { useGenerateLanguageNames } from "../hooks/useGenerateLanguageNames";
import { useIsTabActive } from "../hooks/useIsTabActive";
import { useUser } from "../hooks/useUser";
import { Logout } from "../LoginAndRegistration/Logout";
import { KeyValueInterface, ShowUserProfileProps } from "../utils/interfaces";

export const ShowUserProfile = ({isInLeftPanel}: ShowUserProfileProps) => {
    const user = useUser()
    const languageNames = useGenerateLanguageNames(user?.language);
    const isUserOnline = useIsTabActive()

    return (
        <div className="d-flex flex-column align-items-start justify-content-start my-3">
            <h2 className="align-self-center">Witaj, {user?.name}</h2>
            <div className="d-flex flex-column align-items-start justify-content-start mb-3">
                <Image src={user?.avatar ? user.avatar : `${process.env.PUBLIC_URL + '/avatar.png'}`} className="my-2 avatar">
                </Image>
                <div><b>Email:</b> {user?.mail}</div>
                <div className="d-flex flex-row justify-content-between"><b>Język:&nbsp;</b>{languageNames.map((language: KeyValueInterface, i: number) => {
                    if (user?.language === i) {
                        return <div key={language?.key}>{language?.value}</div>
                    }
                })}</div>
                <div className="d-flex flex-row align-items-center justify-content-start w-100"><b>Online:</b> <div className={`${isUserOnline ? "pulse__green" : "pulse__red"} mx-2`}></div></div>
                {user?.hobby ? <div><b>Zainteresowania:</b> {user.hobby}</div> : ''}
            </div>
            <Logout isInLeftPanel/>
        </div>
    )
}