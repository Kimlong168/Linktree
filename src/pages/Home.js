import React from "react";
import { Link } from "react-router-dom";
import LinkTreeWrapper from "../components/LinkTreeWrapper";
import Form from "../components/Form";
import { auth } from "../firebase.config";
import SharingButton from "../components/SharingButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import Loading from "../components/Loading";
import Contact from "../components/Contact";
const Home = ({ isAuth, signUserOut, linkTree, setIsUpdate }) => {
  const [copy, setCopy] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, [linkTree]);

  console.log("lll", linkTree.length);

  return (
    <div className="bg-site">
      <nav>
        {isAuth ? (
          <>
            <div className="flex  text-accent  justify-center md:justify-end w-full p-5">
              <button
                onClick={signUserOut}
                className="hover:underline hover:text-blue-500"
              >
                Logout
              </button>
              {linkTree.length !== 0 && (
                <>
                  <span className="mx-5">|</span>
                  <button className="hover:underline hover:text-blue-500">
                    <Link to={`/update/${linkTree[0].authorId}`}>Update</Link>
                  </button>
                </>
              )}
            </div>
            <div>
              {isLoading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  {linkTree.length !== 0 ? (
                    <>
                      <LinkTreeWrapper linkTree={linkTree} />
                      <div className="flex justify-center ">
                        <CopyToClipboard
                          text={
                            window.location.origin +
                            `/profile/${linkTree[0].authorId}`
                          }
                          onCopy={() => setCopy(true)}
                        >
                          <span className="text-center btn btn-sm cursor-pointer  flex items-center justify-center gap-2">
                            Copy the link of your link tree
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
                      <SharingButton
                        url={
                          window.location.origin +
                          `/profile/${linkTree[0].authorId}`
                        }
                        title={linkTree[0].profileName}
                      />
                    </>
                  ) : (
                    <Form />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="h-screen grid place-content-center px-3">
              <div class="text-4xl lg:text-6xl text-gradient mb-20 text-center py-5 uppercase">
                Welcome to Kimlong Link Tree
              </div>
              <button className=" btn btn-sm mb-10 ">
                <Link to="/login">
                  Register or Login to create your own link tree
                </Link>
              </button>
              <Contact />
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Home;
