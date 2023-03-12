import { BusyBoxProps } from "./interfaces"

export const BusyBox = ({ size = 120 }: BusyBoxProps) => {
    return (
        <div className="spinning align-self-center" style={{width: `${size}px`}}>
            <img src={process.env.PUBLIC_URL + '/shield.png'} className="w-100" />
        </div>
    )
}