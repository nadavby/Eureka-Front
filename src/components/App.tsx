/** @format */
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { RegistrationForm } from "./RegristrationForm";
import UserProfile from "./UserProfile";
import { useAuth } from "../hooks/useAuth";
import ItemUpload from "./itemUpload";
import LostItems from "./LostItems";
function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <LostItems /> : <Login />}
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
          path="/lost-items"
          element={<LostItems />}
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
