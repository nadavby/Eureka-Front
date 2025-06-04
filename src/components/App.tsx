/** @format */

import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { RegistrationForm } from "./RegristrationForm";
import PostList from "./ListPosts";
import UserProfile from "./UserProfile";
import { useAuth } from "../hooks/useAuth";
import ItemUpload from "./itemUpload";
function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <PostList /> : <Login />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<RegistrationForm />}
        />
        <Route
          path="/posts"
          element={<PostList />}
        />
         <Route
          path="/profile"
          element={<UserProfile />}
        />
        <Route
          path="/item-upload"
          element={<ItemUpload />}
        />
      </Routes>

    </>
  );
}

export default App;
