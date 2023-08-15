import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase.config";
import { getDocs, collection } from "firebase/firestore";
import Profile from "./pages/Profile";
import CreateLinkTree from "./pages/CreateLinkTree";
import Error404 from "./pages/Error404";
import UpdateLinkTree from "./pages/UpdateLinkTree";
const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isUpdate, setIsUpdate] = useState(false);
  const [postList, setPostList] = useState([]);
  const [linkTree, setlinkTree] = useState([]);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      console.log("Signed Out");
      setIsAuth(false);
      window.location.href = "/login";
    });
  };
  const postCollectionRef = collection(db, "linkTrees");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log("data", data);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setlinkTree(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((item) => auth.currentUser.uid === item.authorId)
      );
    };
    getPosts();
    console.log("postList", postList);
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAuth={isAuth}
              signUserOut={signUserOut}
              linkTree={linkTree}
              setIsUpdate={setIsUpdate}
            />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Profile
              isAuth={isAuth}
              signUserOut={signUserOut}
              postList={postList}
              setIsUpdate={setIsUpdate}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route path="/create" element={<CreateLinkTree />} />
        <Route
          path="/update/:id"
          element={<UpdateLinkTree postList={postList} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
