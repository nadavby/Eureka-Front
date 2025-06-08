/** @format */
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { RegistrationForm } from "./RegristrationForm";
import UserProfile from "./UserProfile";
import { useAuth } from "../hooks/useAuth";
import ItemUpload from "./ItemUpload";
import LostItems from "./LostItems";
import ItemDetail from "./ItemDetail";
import Navigation from "./Navigation";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Navigation />
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
      <Route
            path="/item/:itemId"
            element={<ItemDetail />}
       />
    </>
  );
}

export default App;
