import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="text-white">
      <div className="text-center">Follow me on:</div>
      <div className="flex gap-x-8 lg:gap-x-10 my-8 justify-center">
        <a
          href="https://github.com/Kimlong168"
          className="grid place-items-center text-xl  lg:text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-2  border-transparent hover:border-white transition-all"
        >
          <FaGithub />
        </a>
        <a
          href="https://instagram.com/kimlonggggggg_101?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
          className="grid place-items-center text-xl lg:text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-2  border-transparent hover:border-white transition-all"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/phnompenhcrown.fc.7?mibextid=ZbWKwL"
          className="grid place-items-center text-xl  lg:text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-2  border-transparent hover:border-white transition-all"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.tiktok.com/@__c609?is_from_webapp=1&sender_device=pc"
          className="grid place-items-center text-xl  lg:text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full p-2  border-transparent hover:border-white transition-all"
        >
          <FaTiktok />
        </a>
      </div>
    </div>
  );
};

export default Contact;
