import React from "react";
import Form from "../components/Form";
const CreateLinkTree = ({setIsUpdate}) => {
  return (
    <div  className="min-h-screen bg-site ">
      <Form setIsUpdate={setIsUpdate}/>
    </div>
  );
};

export default CreateLinkTree;
