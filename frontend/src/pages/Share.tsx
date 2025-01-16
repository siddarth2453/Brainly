import { useParams } from "react-router";
import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/ui/Card";
const apiUrl = import.meta.env.VITE_API_URL;

interface ShareContent {
  _id: string;
  link: string;
  type: "youtube" | "tweet";
  title: string;
  tags: string[];
  userId: string;
  username: string;
  __v: number;
}
const Share = () => {
  const { username } = useParams<{ username: string }>();
  const [contents, setContents] = useState<ShareContent[]>([]);


  const share = async () => {
    const response = await axios.get<{contents: ShareContent[]}>(`${apiUrl}/brain/${username}`);
     setContents(response.data?.contents)
  }

  useEffect(() => {
    share()
  },[])

useEffect(() => {
  console.log(contents);
},[contents])

  return (
    <div className=" min-w-screen min-h-screen pt-5 ">
      <Navbar />
      <h1 className="w-full text-center text-3xl py-8 font-semibold text-primary">
        <span className="text-bold italic bg-slate-200 bg-opacity-70 px-4 py-1 hover:bg-white cursor-pointer mr-1 hover:transition-all hover:duration-200  outline outline-1 rounded-3xl">
          {username}
        </span>
        's Brain.
      </h1>

      {contents.length === 0 ? (
              <div className="text-center flex justify-center items-center font-semibold text-xl h-[70vh]">
                <p className="text-primary">User's Doesn't Have any Content 😢</p>
              </div>
            ) : (
              <div className="w-full h-full text-primary flex flex-wrap items-start justify-center p-3 gap-4">
                {contents.map((content, index) => (
                  <Card
                    key={index}
                    title={content.title}
                    link={content.link}
                    type={content.type}
                  />
                ))}
              </div>
            )}

    </div>
  );
};

export default Share;
