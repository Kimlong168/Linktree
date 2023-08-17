import { useState } from "react";
import { useParams } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase.config";
import { ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
const UpdateLinkTree = ({ postList, setIsUpdate }) => {
  const { id } = useParams();
  const linkTree = postList.filter((post) => post.id === id)[0];
  console.log("update data", linkTree);
  const [profileName, setProfileName] = useState(linkTree.profileName);
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState(linkTree.bio);
  const [position, setPosition] = useState(linkTree.position);
  const initLinks = [...linkTree.links];
  const [links, setLinks] = useState(initLinks);

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
  let navigate = useNavigate();
  const submitForm = () => {
    if (
      profileName === "" ||
      bio === "" ||
      position === "" ||
      links.length === 0
    ) {
      alert("please fill the the required information to create link tree");
    } else {
      updateLinkTree();

      if (profilePicture !== null) {
        const imageRef = ref(storage, `images/${auth.currentUser.uid}`);
        uploadBytes(imageRef, profilePicture).then(() => {
          console.log("image uploaded");
        });
      }

      // You can process the form data here (e.g., send it to a server)
      console.log("updating", {
        profileName,
        profilePicture,
        bio,
        position,
        links,
      });
      console.log("user id", auth.currentUser.uid, "id", id);
      navigate(`/profile/${auth.currentUser.uid}`);
    }
  };

  async function updateLinkTree() {
    const docRef = doc(db, "linkTrees", id);
    await setDoc(
      docRef,
      {
        profileName,
        // profilePicture,
        bio,
        links,
        position,
        // authorId: id,
      },
      { merge: true }
    );

    setIsUpdate((a) => !a);
    console.log("post updated");
  }

  return (
    <div className="bg-site ">
      <div className="relative bg-errorPage bg-no-repeat bg-cover bg-bottom bg-fixed py-10">
        <div className="mx-3 lg:mx-auto  w-100 lg:w-[500px] flex flex-col gap-3 border border-white/50 rounded-3xl p-8">
          <h1 className="text-3xl text-center text-yellow-500 font-bold uppercase mb-5">
            Linktree Profile Update
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
            {links.map((link, index) => {
              return (
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
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
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
              );
            })}
          </div>
          <button
            onClick={addLink}
            className="border border-white/50 text-white py-1 rounded-full mb-3"
          >
            Add Link
          </button>
          <button onClick={submitForm} className="btn btn-sm">
            Update
          </button>
        </div>
      </div>
      {/* back button */}
      <div className="absolute top-5 left-5">
        <Link to={`/profile/${auth.currentUser.uid}`}>
          <button className="bg-white/50 px-2 py-1 text-yellow-400 font-semibold rounded-full">
            ◀️Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateLinkTree;
