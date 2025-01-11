import getTweet from "../../utils/getTweet";
import { getYoutubeEmbedUrl } from "../../utils/getYoutubeEmbedUrl";
import DeleteIcon from "../icons/DeleteIcon";
import ShareIcon from "../icons/ShareIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import TweetEmbed from "./TweetEmbed";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "tweet";
}

const Card = (props: CardProps) => {
  let link;
  if (props.type == "youtube") {
    link = getYoutubeEmbedUrl(props.link);
  } else {
    link = getTweet(props.link);
  }
  return (
    <div className="min-w-80 min-h-60  rounded-lg bg-secondary overflow-hidden">
      <div className="py-3  bg-opacity-50 flex gap-1 items-center justify-between px-3">
        <div className="flex gap-2 items-center ">
          {props.type == "youtube" ? <YoutubeIcon /> : <TwitterIcon />}
          <h1 className=" text-black font-semibold text-md">{props.title}</h1>
        </div>
        <div className="flex gap-3 items-center text-gray-700">
          <div className="cursor-pointer">
            <ShareIcon />
          </div>
          <div className="cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="w-full h-full p-3">
        {props.type == "youtube" ? (
          <iframe
            className="rounded-lg"
            src={link ? link : "N/A"}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        ) : link ? (
          <TweetEmbed url={link} />
        ) : (
          <p>Invalid Tweet ID</p>
        )}
      </div>
    </div>
  );
};

export default Card;
