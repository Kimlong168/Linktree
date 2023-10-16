import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkTreeWrapper from "../components/LinkTreeWrapper";
import Form from "../components/Form";
import { auth } from "../firebase.config";
import SharingButton from "../components/SharingButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import QrCodeLink from "../components/QrCodeLink";

const Profile = ({ isAuth, signUserOut, postList, setIsUpdate }) => {
  const [copy, setCopy] = useState(false);

  const { id } = useParams();

  const linkTree = postList.filter((post) => id === post.authorId);
  if (linkTree.length === 0) {
    return (
      <div className="bg-site">
        <div className=" bg-errorPage bg-bottom bg-cover bg-fixed">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <main className="bg-site">
      <div className="bg-errorPage bg-bottom bg-no-repeat bg-fixed bg-cover h-full px-2">
        <nav>
          {isAuth && id === auth.currentUser.uid && (
            <>
              <div className="flex justify-center md:justify-end w-full p-5 text-accent">
                <button
                  onClick={signUserOut}
                  className="hover:underline hover:text-blue-500"
                >
                  Logout
                </button>
                <span className="mx-5">|</span>
                <button className="hover:underline hover:text-blue-500">
                  <Link to={`/update/${linkTree[0].id}`}>Update</Link>
                </button>
              </div>
            </>
          )}
        </nav>

        <div>
          {linkTree.length === 0 ? (
            <>
              <div>Link does not exist!</div>
              {isAuth && id === auth.currentUser.uid && (
                <>
                  <Form />
                </>
              )}
            </>
          ) : (
            <>
              <LinkTreeWrapper
                linkTree={linkTree}
                userImageId={linkTree[0].authorId}
              />
              {/* copy clipboard */}
              <div className="flex justify-center ">
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => setCopy(true)}
                >
                  <span className="text-center btn btn-sm cursor-pointer flex items-center justify-center gap-2">
                    Copy this link tree
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                      />
                    </svg>
                    {copy && "(Copied)"}
                  </span>
                </CopyToClipboard>
              </div>

              {/* qrcode downloader */}
              <QrCodeLink
                url={window.location.href}
                name={linkTree[0].profileName}
              />

              {/* sharing link icons */}
              <SharingButton
                url={window.location.href}
                title={linkTree[0].profileName}
              />

              {!isAuth && (
                <div className="mt-5 pb-5 grid place-content-center">
                  <button className="  btn btn-sm">
                    <Link to="/login">
                      Register to create your own link tree
                    </Link>
                  </button>
                </div>
              )}

              {isAuth && id !== auth.currentUser.uid && (
                <>
                  <div className="mt-5 pb-5 grid place-content-center">
                    <button className="btn btn-sm">
                      <Link to="/">Go to your link tree</Link>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
