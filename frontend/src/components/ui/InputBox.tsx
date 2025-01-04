interface inputProp {
    placeholder:string
}

const InputBox = (props:inputProp) => {
  return (
    <input className="w-[90%] border py-2 outline-none shadow-lg px-3 rounded-md " type="text" placeholder={props.placeholder}/>
  )
}

export default InputBox