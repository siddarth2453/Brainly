import { ReactElement } from "react"

interface ButtonProps  {
    text:String,
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    startIcon?:ReactElement,
    changeIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantStyle = {
    "primary": "bg-primary text-white",
    "secondary": "bg-secondary text-primary"
}

const sizeStyle = {
    "sm": " py-2 px-3  text-sm ",
    "md": " py-3 px-6 ",
    "lg": " py-3 px-10 text-xl ",
}



const Button = (props:ButtonProps) => {
  return (
    <button onClick={() => props.changeIsOpen && props.changeIsOpen(prev => !prev)} className= {variantStyle[props.variant] + sizeStyle[props.size] +" rounded-lg w-fit flex items-center gap-2"}>
        {props.startIcon} {props.text} 
    </button>
  )
}

export default Button