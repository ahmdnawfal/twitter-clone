import React, { SVGProps } from "react";

interface props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex items-center max-w-fit space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100 cursor-pointer group"
    >
      <Icon className="h-6 w-6" />
      <span className="hidden md:inline-flex group-hover:text-twitter text-base font-light lg:text-xl ">
        {title}
      </span>
    </div>
  );
}

export default SidebarRow;
