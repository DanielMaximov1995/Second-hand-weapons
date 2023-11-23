'use client'
import {IconsType} from "@/types/others";

const strokes = {
    primary: 'stroke-primary',
    success: 'stroke-green-600',
    error: 'stroke-red-600',
    warning: 'stroke-yellow-400',
    info: 'stroke-white'
}

const UploadIcon = ({fontSize, color}: IconsType) => {

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{fontSize: `${fontSize}px`}}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke="none"
            fill="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
                <path d="M13 19v-4h3l-4-5-4 5h3v4z"></path>
                <path
                    d="M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z"></path>
        </svg>
    );
};

export default UploadIcon