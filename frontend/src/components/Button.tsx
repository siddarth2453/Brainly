import { ReactElement } from "react"

interface ButtonProps {
    text:string,
    size: "sm" | "md" | "lg",
    variant: "primary" | "secondary",
    startIcon?:ReactElement
}

const size = {
    "sm": "p-2 ",
    "md": "px-4 py-2 ",
    "lg": "px-10 py-3 "
}

const variant = {
    "primary" : "bg-blue-primary ",
    "secondary": "bg-blue-secondary bg-opacity-40"
}

const Button = (props: ButtonProps) => {
    return  <>
            <button className={ `${variant[props.variant]} ${size[props.size]} rounded-lg w-fit` }>
                {`${props.startIcon}   ${props.text}`}
             </button>
            </>
}

export default Button;