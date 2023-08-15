import React from "react";

const LinkBox = ({ title, url }) => {
  return (
    <div>
      <a href={url}>
        <div className="my-2 flex h-16 items-center justify-between rounded-lg border-2 border-b-4 border-l-4 border-yellow-300 px-4 shadow-xl">
          <div className="flex items-center">
            <img
              alt="photo1"
              className="w-10 rounded-full"
              src="https://icon-library.com/images/2018/2298785_oreos-oreo-cookie-adult-costume-hd-png-download.png"
            />
            <div className="ml-2">
              <div className="text-xs font-semibold">{title}</div>
              <div className="flex mt-1 text-xs font-light text-gray-600">
                {url}
                <svg
                  className="h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </a>
    </div>
  );
};

export default LinkBox;
