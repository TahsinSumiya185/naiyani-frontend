import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../services/auth.service";
import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import ConfirmModal from "../components/modal/ConfirmModal"

const PrivateRoute = ({ children }) => {
  const userExist = isLoggedIn();

  const location = useLocation();
  const navigate = useNavigate();

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (!userExist) {
      setIsModalOpen(true); // Open the modal if the user is not logged in
    }
  }, [userExist, location, isInitialLoad]);

  const handleConfirm = () => {
    // Navigate to the login page
    navigate("/login", { state: { from: location } });
    setIsModalOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (isInitialLoad) {
    return <Loading />;
  }

  return (
    <>
      {children}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        msg="You need to be logged in to access this page."
        btnMsg="Go to Login"
      />
    </>
  );
};

export default PrivateRoute;
