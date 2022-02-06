import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userContext } from "../../Context/AuthProvider";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewTickets = () => {
  const { userId, setLoggedIn, getLoggedInState } = useContext(userContext);
  const [detail, setDetail] = useState([]);
  var berthDetails = [];
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
        berthDetails = result.data.berths
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



  const deleteBooking = async (ticket) => {
    const del = await deleteTicket(ticket);
    if (del) {
      await getBerthDetail();
      //to get berth detail of particular preference
      const berthAvailble = berthDetails.find((x) => x.name === ticket.berth);
      const rac = berthDetails.find((x) => x.name === "RAC");
      const waiting = berthDetails.find((x) => x.name === "WaitingList");
      const nonConfirmed = Number(rac.total) + Number(waiting.total);
      // detail list first waiting and rac first ticket
      const waitingFirst = detail.find((x) => x.berth === "WaitingList");
      const racFirst = detail.find((x) => x.berth === "RAC");
      
      let count = 0;
      berthDetails.forEach((data) => {
        count = count + Number(data.available);
      });
      count = count - nonConfirmed;

      if (count <= 63) {
        berthAvailble.available = Number(berthAvailble?.available) + 1;      
        await updateBerth(berthAvailble);
      } else if (rac.available <= 18) {
        //push to seat table
        addSeat(racFirst.seat);
         //for move confirm ticket to rac 
        racFirst.berth = ticket.berth;
        racFirst.seat = ticket.seat;
        rac.available = Number(rac?.available) + 1;
        await updateBerth(rac);
      } else {
        //when waitinglist booked tickets
        if(waiting.available<10){
          //push to seat table
          addSeat(waitingFirst.seat);
          //for move rac use to waiting list
          waitingFirst.berth = racFirst.berth;
          waitingFirst.seat = racFirst.seat;
          await updateTicket(waitingFirst);
           //for move confirm ticket to rac 
          racFirst.berth = ticket.berth;
          racFirst.seat = ticket.seat;
          await updateTicket(racFirst);
        }
        //increase the waiting count
        waiting.available = Number(waiting?.available) + 1;
        await updateBerth(waiting);
      }
      await getTicket();
    }
  };


  const updateTicket = async (ticket) => {
    let token = localStorage.getItem("authToken");

    try {
      if (token) {
        const result = await axios.put(
          `http://localhost:5000/api/private/Updatebooking/${ticket._id}`,
          { ticket: ticket },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const deleteTicket = async (ticket) => {
    let token = localStorage.getItem("authToken");
    try {
      if (token) {
        const result = await axios.delete(
          `http://localhost:5000/api/private/bookingRemove/${ticket._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result) {
          toast.success("Ticket Cancelled", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return result?.data?.message;
        }
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

  const updateBerth = async (berthAvailble) => {
    let token = localStorage.getItem("authToken");

    try {
      if (token) {
        const result = await axios.put(
          `http://localhost:5000/api/private/UpdateBerth/${berthAvailble._id}`,
          { berthAvailble: berthAvailble },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const addSeat = async (seat) => {
    let token = localStorage.getItem("authToken");
    const seatDetails = {
      seatNo: seat
    };

    try {
      if (token) {
        const result = await axios.post(
          `http://localhost:5000/api/private/seat`,
          { seatDetails: seatDetails },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
