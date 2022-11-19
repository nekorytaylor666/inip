import * as React from "react";
function SvgLogo(props) {
    return (
        <svg
            width={98}
            height={41}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0 0v41h8.652V0H0zM12.658 41l-.066-41h4.457l26.087 27.75V0h4.457v41H43.2L17.05 12.854V41h-4.391zM51.533 41V0h8.651v41h-8.651z"
                fill="#fff"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M64.125 0v41h8.651V23.203h8.521c20.843 0 22.023-23.203 0-23.203H64.125zM78.74 19.38h-5.965V3.69h5.965c2.588 0 4.917.658 6.62 1.846 3.212 2.241 5.047 13.842-6.62 13.842z"
                fill="#fff"
            />
        </svg>
    );
}
export default SvgLogo;
