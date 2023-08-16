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
      <div className="mx-auto mb-5 max-w-sm flex-col rounded-3xl border-4 border-t-8 border-blue-400 bg-black/50  px-4 py-10 text-white shadow-2xl">
        <div className="text-center ">
          <div className="cursor-pointer rounded-full border-4 border-blue-600/50 overflow-hidden w-[210px] h-[210px] mx-auto">
            <img
              className="w-full h-full rounded-full object-fit mx-auto block border-2 borderr-transparent border-transparent  transition-all hover:scale-125"
              alt="pic"
              src={
                linkTree[0].profilePicture
                  ? `${linkTree[0].profilePicture}`
                  : "https://i.ibb.co/4mWnBWV/AREmoji-20220303-153534-12754.png"
              }
            />
          </div>

          <p className="pt-2 text-2xl mt-2 uppercase font-bold text-gradient">
            {linkTree[0].profileName}
          </p>
          <p className="text-sm font-medium text-white mb-4">
          ✨{linkTree[0].position}✨
          </p>
          <small>{linkTree[0].bio}</small>
        </div>

        {linkTree[0].links.length > 0 ? (
          linkTree[0].links.map((link, index) => {
            if (link.url === "" || link.title === "") return null;
            return (
              <>
                <div key={index}>
                  <LinkBox title={link.title} url={link.url} />
                </div>
              </>
            );
          })
        ) : (
          <div className="text-center font-extrabold text-white">
            No links yet
          </div>
        )}

        <div className="text-center font-extrabold text-white">
          &copy; Kimlong_Chann
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
