import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userContext } from "../../Context/AuthProvider";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewTickets = () => {
  const [detail, setDetail] = useState([]);
  const [berth, setBerth] = useState([]);
  const { userId, setLoggedIn, getLoggedInState } = useContext(userContext);
  const history = useHistory();
  const getTicket = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/private/getUserTickets/${userId}`
    );
    console.log(data);
    setDetail(data.tickets);
  };
  useEffect(() => {
    getTicket();
  }, []);

  const getBerthDetails = async (values) => {
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
        const availBerth = result.data.berths.filter((data) => {
          return Number(data.available) !== 0;
        });
        setBerth(result.data.berths);
        console.log(berth);
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

  const deleteBooking = (ticket) => {
    const nonConfirmed = 28; //RAC + WAITING LIST
    getBerthDetails();
    const count =
      berth.reduce((accum, item) => accum + Number(item.available), 0) - nonConfirmed;
    if (count <= 63) {
      const berthAvailble =  berth.find((x) => x.name === ticket.berth);
      console.log(berthAvailble);
    }
  };
  return (
    <div>
      <h1>View ticket</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Berth</th>
            <th scope="col">Seat</th>
            <th scope="col">Ticketno</th>
            <th scope="col">Train</th>
            <th scope="col">PNR</th>
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {detail.length > 0 ? (
            detail.map((ticket) => {
              return (
                <tr key={ticket._id}>
                  <td>{ticket.bookingName}</td>
                  <td>{ticket.age}</td>
                  <td>{ticket.gender}</td>
                  <td>{ticket.berth}</td>
                  <td>{ticket.seat}</td>
                  <td>{ticket.ticketno}</td>
                  <td>{ticket.train}</td>
                  <td>{ticket.pnr}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteBooking(ticket)}>
                      CANCEL
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <h1>No ticket is booked</h1>
            </tr>
          )}
        </tbody>
      </table>
      {detail.length > 0 ? (
        <button
          className="btn btn-primary"
          onClick={() => history.push("/dashboard")}
        >
          ADD TICKET
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => history.push("/dashboard")}
        >
          BOOK TICKET
        </button>
      )}
    </div>
  );
};
export default ViewTickets;
