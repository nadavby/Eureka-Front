/** @format */
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { RegistrationForm } from "./RegristrationForm";
import UserProfile from "./UserProfile";
import { useAuth } from "../hooks/useAuth";
import ItemUpload from "./itemUpload";
import LostItems from "./LostItems";
import ItemDetail from "./ItemDetail";
import Navigation from "./Navigation";
import { NotificationsProvider } from "../hooks/useNotifications";
import MatchConfirmation from "./MatchConfirmation";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <>
    <NotificationsProvider>
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
          path="/upload-item"
          element={<ItemUpload />}
        />
        <Route
        path="/item/:itemId"
        element={<ItemDetail />}
      />
      <Route
        path="/match-confirmation/:matchId"
        element={<MatchConfirmation />}
      />
      </Routes>
      </NotificationsProvider>
    </>
  );
}

export default App;
