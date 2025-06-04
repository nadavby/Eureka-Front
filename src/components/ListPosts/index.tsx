import { FC, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUser,
  faSignInAlt,
  faThumbsUp,
  faPlus,
  faEdit,
  faTrash,
  faRobot,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

type SortOption = 'newest' | 'oldest' | 'mostLiked' | 'leastLiked';

const ListPosts: FC = () => {
  const { isAuthenticated, loading: authLoading, currentUser } = useAuth();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!authLoading && !isAuthenticated) {
    navigate("/login");
    return;
  }

  const user = currentUser;

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-3">
        {!authLoading &&
          (isAuthenticated ? (
            <button className="btn btn-outline-primary d-flex flex-column align-items-center justify-content-center text-center p-3" style={{ width: "100px", height: "100px" }} onClick={() => navigate("/profile")}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span className="mt-2">My Profile</span>
          </button>
          ) : (
            <button className="btn btn-outline-secondary d-flex flex-column align-items-center justify-content-center text-center p-3" style={{ width: "100px", height: "100px" }} onClick={() => navigate("/login")}>
        <FontAwesomeIcon icon={faSignInAlt} size="2x" />
        <span className="mt-2">Login</span>
      </button>
          ))}
      <div className="text-center">
      <h1 className="text-primary text-center flex-grow-1 mb-3">
   TripBuddy
</h1>
        <p className="lead text-muted">
          Your go-to travel companion for discovering amazing places!
        </p>
      </div>
      <button className="btn btn-info d-flex flex-column align-items-center justify-content-center text-center p-3" style={{ width: "100px", height: "100px" }} onClick={() => navigate("/chatbot")}>
    <span className="mt-2">Button</span>
  </button>
      </div>
      <hr className="border border-primary border-2 opacity-75 my-4" />
      <div className="mb-4 position-relative">
        <div className="d-flex align-items-center">
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu show position-absolute mt-1">
            <button 
              className="dropdown-item"
              onClick={() => handleSortChange('newest')}>
              Newest
            </button>
            <button 
              className="dropdown-item"
              onClick={() => handleSortChange('oldest')}>
              Oldest
            </button>
            <button 
              className="dropdown-item"
              onClick={() => handleSortChange('mostLiked')}>
              Most Liked
            </button>
            <button 
              className="dropdown-item"
              onClick={() => handleSortChange('leastLiked')}>
              Least Liked
            </button>
          </div>
        )}
      </div>
      <button
        className="btn btn-success position-fixed bottom-0 end-0 m-3"
        onClick={() => navigate("/item-upload")}>
        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Post
      </button>
    </div>
  );
};

export default ListPosts;