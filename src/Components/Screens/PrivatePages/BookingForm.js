import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { userContext } from "../../Context/AuthProvider";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingForm = () => {
  const { userId, setLoggedIn, getLoggedInState } = useContext(userContext);
  const [seat, setSeat] = useState(undefined);
  const [berth, setBerth] = useState([]);

  const history = useHistory();
  useEffect(() => {
    initialSetup();
  }, []);
  const onSubmit = async (values) => {
    let token = localStorage.getItem("authToken");
    const bookingDetails = values;
    bookingDetails["userId"] = userId;
    bookingDetails["seat"] = seat.seatNo;
    //const [booking, setbooking] = useState(undefined);

    try {
      if (token) {
        const result = await axios.post(
          `http://localhost:5000/api/private/ticket`,
          { bookingDetails: bookingDetails },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result) {
          toast.success(`Successfully, booked ticket`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history.push("/views");
          deleteSeat();
        }
        console.log(result.data.ticket);
        // setbooking(result.data.ticket);
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

  const initialSetup = () => {
    getSeat();
    getBerthDetails();
    getLoggedInState();
  };
  const getSeat = async (values) => {
    let token = localStorage.getItem("authToken");

    try {
      if (token) {
        const result = await axios.get(
          `http://localhost:5000/api/private/seats`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result.data.seat);
        setSeat(result.data.seat);
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

  const deleteSeat = async (values) => {
    let token = localStorage.getItem("authToken");
    try {
      if (token) {
        const result = await axios.delete(
          `http://localhost:5000/api/private/seatRemove/${seat._id}`,
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
        const availBerth = result.data.berths.filter(
          (data)=>{
            return Number(data.available) !== 0;
          } 
          
        );
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

// const handleAge =(data,val)=> {
// console.log(data)
//   }

  return (
    <div className="container align">
      <h1>Book ticket</h1>
      <Formik
        initialValues={{
          bookingName: "",
          gender: "",
          age: "",
          berth: "",
        }}
        validationSchema={Yup.object({
          bookingName: Yup.string().required(" Required"),
          gender: Yup.string().required(" Required"),
          age: Yup.number()
            .min(1, "Must have age above zero")
            .required(" Required"),
          berth: Yup.string().required(" Required"),
        })}
        onSubmit={onSubmit}
      >
        <Form className="form-horizontal">
          <div className="form-group col-sm-6">
            <Field
              type="text"
              className="form-control"
              id="bookingName"
              name="bookingName"
              placeholder="Name as per govt id"
            />
            <ErrorMessage name="bookingName" className="text-danger" />
          </div>
          <div className="form-group  col-sm-6">
            <Field
              as="select"
              className="form-control"
              name="gender"
              id="gender"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Field>
            <ErrorMessage name="gender" className="text-danger" />
          </div>
          <div className="form-group col-sm-6">
            <Field
              type="number"
              min="1"
              className="form-control"
              id="age"
              name="age"
              placeholder="Age"
            />

            <ErrorMessage name="age" className="text-danger" />
          </div>

          <div className="form-group  col-sm-6">
            <Field as="select" className="form-control" name="berth" id="berth">
              {berth.map((data) => {
                return <option>{data.name}</option>;
              })}
            </Field>
            <ErrorMessage name="berth" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
