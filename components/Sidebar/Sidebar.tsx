import React from "react";
import HomeIcon from "@heroicons/react/outline/HomeIcon";
import HashtagIcon from "@heroicons/react/outline/HashtagIcon";
import BellIcon from "@heroicons/react/outline/BellIcon";
import BookmarkIcon from "@heroicons/react/outline/BookmarkIcon";
import CollectionIcon from "@heroicons/react/outline/CollectionIcon";
import DotsCircleHorizontalIcon from "@heroicons/react/outline/DotsCircleHorizontalIcon";
import MailIcon from "@heroicons/react/outline/MailIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://ra.ac.ae/wp-content/uploads/2020/01/logo-twitter-icon-symbol-0.png"
        alt=""
      />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notification" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  );
}

export default Sidebar;
