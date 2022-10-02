import SearchIcon from "@heroicons/react/outline/SearchIcon";
import EmojiHappyIcon from "@heroicons/react/outline/EmojiHappyIcon";
import CalendarIcon from "@heroicons/react/outline/CalendarIcon";
import LocationMarkerIcon from "@heroicons/react/outline/LocationMarkerIcon";
import PhotographIcon from "@heroicons/react/outline/PhotographIcon";
import React, { useRef, useState, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { TweetBody } from "../../typings";
import { Tweet } from "../../typings";
import { fetchTweets } from "../../utils/fetchTweets";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current?.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg",
      image: image,
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);

    return json;
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    postTweet();

    setInput("");
    setImage("");
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover"
        src={
          session?.user?.image ||
          "https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg"
        }
        alt=""
      />

      <div className="flex flex-1 pl-2">
        <form className="flex flex-col flex-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <div className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image url....."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </div>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
