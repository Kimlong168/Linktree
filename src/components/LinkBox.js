import React from "react";
import { FaGlobe,FaPhone,FaGithub,FaTelegram ,FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSnapchat, FaYoutube, FaReddit, FaTumblr, FaTiktok } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import { MdMailOutline } from 'react-icons/md';
import { RiCloseCircleLine } from 'react-icons/ri'; 

const IconSelector = ({ title }) => {
  const lowerCaseTitle = title.toLowerCase().trim();
  const iconMapping = {
    twitter: FaTwitter,
    facebook: FaFacebook,
    instagram: FaInstagram,
    website: FaGlobe,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    pinterest: FaPinterest,
    snapchat: FaSnapchat,
    reddit: FaReddit,
    tumblr: FaTumblr,
    tiktok: FaTiktok,
    github: FaGithub,
    telegram: FaTelegram,
    phone: FaPhone,
    google: SiGoogle,
    mail: MdMailOutline,
    x: RiCloseCircleLine,
    // Add more mappings as needed
  };

  const IconComponent = iconMapping[lowerCaseTitle] || FaGlobe;

  return <IconComponent size={32} />;
};

const LinkBox = ({ title, url }) => {
 
  return (
    <div>
      <a href={url}>
        <div className="my-2 flex h-16 items-center justify-between rounded-lg border-2 border-b-4 border-l-4 border-blue-300 px-4 shadow-xl">
          <div className="flex items-center">
            {/* icon */}
          <IconSelector title={title}/>
            <div className="ml-5">
              <div className="text-md font-semibold">{title}</div>
            </div>
          </div>  
          <div></div>
        </div>
      </a>
    </div>
  );
};

export default LinkBox;
