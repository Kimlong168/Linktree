import React from "react";
import { auth } from "../firebase.config";
import LinkBox from "./LinkBox";
import Form from "./Form";
const LinkTreeWrapper = ({ linkTree }) => {
  // const linkTree = linkTrees.filter(
  //   (post) => auth.currentUser.uid === post.authorId
  // )[0];

  if (linkTree.length === 0) return <Form />;

  return (
    <div className="mx-auto py-10">
      {/* {element} */}
      <div className="mx-auto mb-5 max-w-sm flex-col rounded-3xl border-4 border-t-8 border-yellow-400 bg-white px-4 py-10 text-black shadow-2xl">
        <div className="text-center">
          <img
            className="rounded-full"
            alt="profile pic"
            src={
              linkTree[0].profilePic
                ? `${linkTree[0].profilePic}`
                : "https://i.ibb.co/4mWnBWV/AREmoji-20220303-153534-12754.png"
            }
          />

          <p className="pt-2 text-lg font-medium uppercase">{linkTree[0].profileName}</p>
          <p className="text-sm font-extrabold text-gray-900">
            {linkTree[0].position}
          </p>
          <small>{linkTree[0].bio}</small>
        </div>

        {linkTree[0].links.length > 0 ? (
          linkTree[0].links.map((link, index) => {
            return (
              <>
                <div key={index}>
                  <LinkBox title={link.title} url={link.url} />
                </div>
              </>
            );
          })
        ) : (
          <div className="text-center font-extrabold text-black">
            No links yet
          </div>
        )}

        <div className="text-center font-extrabold text-black">
          &copy; Kimlong
        </div>
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="sahilnetic"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#FFDD00"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
      </div>
    </div>
  );
};

export default LinkTreeWrapper;
