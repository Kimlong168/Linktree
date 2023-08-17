import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { ref, uploadBytes } from "firebase/storage";
function Form({ setIsUpdate }) {
  const [profileName, setProfileName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [position, setPosition] = useState("");
  const [links, setLinks] = useState([
    {
      title: "",
      url: "",
    },
  ]);

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const submitForm = () => {
    if (
      profileName === "" ||
      bio === "" ||
      position === "" ||
      links.length === 0 ||
      profilePicture === null
    ) {
      alert("please fill the the required information to create link tree");
    } else {
      // You can process the form data here (e.g., send it to a server)
      console.log({
        profileName,
        profilePicture,
        bio,
        position,
        links,
      });
      createLinkTree();

      const imageRef = ref(storage, `images/${auth.currentUser.uid}`);
      uploadBytes(imageRef, profilePicture).then(() => {
        console.log("image uploaded");
      });

      // navigate("/");
      navigate(`/profile/${auth.currentUser.uid}`);
    }
  };
  let navigate = useNavigate();
  const postCollectionRef = collection(db, "linkTrees");
  const createLinkTree = () => {
    addDoc(postCollectionRef, {
      profileName,
      // profilePicture,
      bio,
      position,
      links,
      authorId: auth.currentUser.uid,
    });
    setIsUpdate((prev) => !prev);

    console.log("post added", auth.currentUser.uid);
  };

  return (
    <div className="bg-errorPage bg-no-repeat bg-cover bg-fixed bg-bottom py-10 ">
      <div className="mx-3  lg:mx-auto w-100 lg:w-[500px] flex flex-col gap-3 border border-white/50 rounded-3xl p-8">
        <h1 className="text-3xl text-center text-yellow-500 font-bold mb-5 uppercase">
          Linktree Profile Setup
        </h1>
        <label className="font-bold text-accent">Profile Name:</label>
        <input
          className="border px-2 py-1 border-yellow-400 outline-none rounded"
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        <label className="font-bold text-accent">Your Position:</label>
        <input
          className="border px-2 py-1 border-yellow-400 outline-none rounded"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        {/* <label className="font-bold text-accent">Profile Picture URL:</label>
        <input
          className="border px-2 py-1 border-yellow-400 outline-none rounded"
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        /> */}

        <label className="font-bold text-accent">Profile Picture:</label>
        <input
          className="border px-2 py-1 border-yellow-400 outline-none rounded"
          type="file"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />

        <label className="font-bold text-accent">Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border px-2 py-1 border-yellow-400 outline-none rounded"
        />

        <h2 className="font-bold text-accent">Links to Add</h2>
        <div className="flex flex-col gap-2">
          {links.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="w-full border px-2 py-1 border-yellow-400 outline-none rounded"
                type="text"
                placeholder="Link title"
                value={link.title}
                onChange={(e) =>
                  handleLinkChange(index, "title", e.target.value)
                }
              />
              <input
                className="w-full border px-2 py-1 border-yellow-400 outline-none rounded"
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, "url", e.target.value)}
              />
              {links.length > 1 && (
                <button
                  className="text-gradient"
                  title="remove link"
                  onClick={() => removeLink(index)}
                >
                  ✖️
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addLink}
          className=" border border-white/50 text-white py-1 rounded-full mb-3"
        >
          Add Link
        </button>
        <button onClick={submitForm} className="btn btn-sm">
          Create
        </button>
      </div>
    </div>
  );
}

export default Form;
