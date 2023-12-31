'use client'
import {IconsType} from "@/types/others";

const strokes = {
    primary : 'stroke-primary',
    success : 'stroke-green-600',
    error : 'stroke-red-600',
    warning : 'stroke-yellow-400',
    info : 'stroke-white'
}

const FavoriteIcon = (props : IconsType) => {
    const {fontSize , color} = props

    return (
        <svg
            className={`${color && strokes[color]} -mt-1`}
            style={{ fontSize : `${fontSize}px`}}
            stroke='none'
            fill="currentColor"
            strokeWidth="1.5"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
        </svg>
    );
}
export default FavoriteIcon
