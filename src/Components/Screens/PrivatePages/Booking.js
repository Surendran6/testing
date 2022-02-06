import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { userContext } from "../../Context/AuthProvider";
import BookingForm from"./BookingForm"
const Booking = () => {
  const { loggedIn, setLoggedIn, getLoggedInState } = useContext(userContext);
  const history = useHistory();
  return (
    <div
      className="container-fluid align-1"
      style={{ color: "rgb(97, 15, 89)" }}
    >
      {loggedIn ? (
        <>
          <BookingForm />
        </>
      ) : (
        <>
          <button
            onClick={() => history.push("/login")}
            className="btn btn-success"
          >
            Login to continue
          </button>
        </>
      )}
    </div>
  );
};

export default Booking;
