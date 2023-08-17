import React, { useEffect } from "react";
import { storage } from "../firebase.config";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import avatar from "../assets/avatar.jpg"
const ProfileImage = ({ userImageId }) => {
  const imageRef = ref(storage, `images/`);
  const [imageUrl, setImageUrl] = React.useState(null);
  useEffect(() => {
    listAll(imageRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          if (itemRef.name.includes(userImageId)) {
            setImageUrl(url);
            console.log("url", url);
            console.log("image name", itemRef.name, "user id", userImageId);
          }
        });
      });
    });
  }, []);

  return (
    <div className="cursor-pointer rounded-full border-4 border-blue-400 overflow-hidden w-[210px] h-[210px] mx-auto">
      <img
        className="w-full h-full rounded-full object-fit mx-auto block border-2 borderr-transparent border-transparent  transition-all hover:scale-125"
        src={
          imageUrl
            ? imageUrl
            : avatar
        }
        alt="profile_image"
      />
    </div>
  );
};

export default ProfileImage;
