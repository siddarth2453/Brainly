
import DeleteIcon from "../icons/DeleteIcon"
import ShareIcon from "../icons/ShareIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import 

interface CardProps {
  title:string,
  link:string
}


const Card = (props:CardProps) => {
  return (
    <div className="min-w-80 min-h-60  rounded-lg bg-secondary overflow-hidden">
      <div className="py-3  bg-opacity-50 flex gap-1 items-center justify-between px-3">
        <div className="flex gap-2 items-center">
        <YoutubeIcon/>
        <h1 className=" text-black font-semibold text-md">{props.title}</h1>
        </div>
        <div className="flex gap-2 items-center text-gray-700">
        <ShareIcon />
        <DeleteIcon/>
        </div>
       </div>
      <div className="w-full h-full p-3">
      <iframe src={props.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default Card