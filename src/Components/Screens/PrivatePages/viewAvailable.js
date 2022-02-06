import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userContext } from "../../Context/AuthProvider";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAvailable = () => {
    const { userId, setLoggedIn, getLoggedInState } = useContext(userContext);
    const history = useHistory();
    const [berth, setBerth] = useState(undefined);
    useEffect(() => {
        getBerthDetail();
    }, []);

    var berthDetails = [];
    const getBerthDetail = async (values) => {
        let token = localStorage.getItem("authToken");

        try {
            if (token) {
                const result = await axios.get(
                    `http://localhost:5000/api/private/getBerthDetails`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBerth(result.data.berths);
                berthDetails = result.data.berths;
                console.log(berthDetails);
            } else {
                toast.error("Something wen't wrong", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    localStorage.removeItem("authToken");
                    setLoggedIn(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error.response);
            if (error.response.data.message) {
                toast.error("Invalid URL", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Something wen't wrong", {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    localStorage.removeItem("authToken");
                    setLoggedIn(false);
                }, 2000);
            }
        }
    };
  return (
      <div>
          <h1>View Avaiable Tickets</h1>
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Total Tickets</th>
                      <th scope="col">Avaiable Tickets</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      berth?.map((detail) => {
                          return (
                              <tr key={detail._id}>
                                  <td>{detail.name}</td>
                                  <td>{detail.total}</td>
                                  <td>{detail.available}</td>
                              </tr>
                          );
                      })
                  }
              </tbody>
          </table>
          <button
              className="btn btn-primary"
              onClick={() => history.push("/dashboard")}
          >
              BOOK TICKET
          </button>
      </div>
  )
}
export default ViewAvailable;
