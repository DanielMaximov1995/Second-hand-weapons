import {ReactNode} from "react";
import {ChangeEvent} from 'react'

export type ReactNodeType = {
    children : ReactNode
}

export type IconsType = {
    color ?: "primary" | "success" | "error" | "warning" | "info";
    fontSize ?: number;
    position ?: "right" | "left" | "up" | "bottom"
}

export type CustomEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & {
    target?: {
        name: string;
        value: string;
        id?: string;
    };
};