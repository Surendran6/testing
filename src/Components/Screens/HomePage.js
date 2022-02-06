import React from "react";
import { useHistory } from "react-router";
import trainImage from "../../Images/train.gif";
function HomePage() {
  let history = useHistory();
  return (
    <div className="container center-content">
      <div
        className="card text-dark mx-auto shadow-lg"
        style={{ width: "80%" }}
      >
        <div className="row">
          <div className="col-md-5">
            <img src={trainImage} className="card-img text-center " alt="..." />
          </div>
          <div className="col-md-7 my-auto">
            <h3 className="display-4">
              Welcome to the smart way of booking train tickets
            </h3>
            <p className="display-6">Enjoy your journey with us!!!</p>
            <button
              className="btn btn-primary mb-1"
              onClick={() => history.push("/signup")}
            >
              Register with Quickly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
