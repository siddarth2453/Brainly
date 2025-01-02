import { ReactElement } from "react"

interface ButtonProps {
    text:string,
    size: "sm" | "md" | "lg",
    variant: "primary" | "secondary",
    startIcon?:ReactElement,
    onButtonClick: () => void
}

const size = {
    "sm": "p-2 ",
    "md": "px-4 py-2 ",
    "lg": "px-10 py-3 "
}

const variant = {
    "primary" : "bg-blue-primary text-white",
    "secondary": "bg-blue-secondary bg-opacity-50 text-blue-900"
}

const Button = (props: ButtonProps) => {
    
    return  <>
            <button onClick={props.onButtonClick} className={ `${variant[props.variant]} ${size[props.size]}flex gap-2 rounded-lg w-fit font-semibold` }>
            {props.startIcon} {props.text} 
             </button>
            </>
}

export default Button;