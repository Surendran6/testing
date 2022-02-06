import React,{useContext} from 'react'
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom'
import { useHistory } from 'react-router'

//custom imports
import Navbar from '../Layouts/Navbar'
import HomePage from '../Screens/HomePage'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import ForgotPassword from '../Screens/ForgotPassword'
import ResetPassword from '../Screens/ResetPassword'
import Booking from "../Screens/PrivatePages/Booking";
import Viewtable from "../Screens/PrivatePages/view";
import ViewAvailable from "../Screens/PrivatePages/viewAvailable";
import { userContext } from '../Context/AuthProvider';

function Router() {
    const {loggedIn,setLoggedIn} = useContext(userContext)
    const history = useHistory()
    return (
      <>
        <BrowserRouter basename="/quickly">
          <Navbar />
          <div className="section">
            <Switch>
              <Route path="/homepage" component={HomePage} />
              <Route exact path="/login" component={Login} />             
              <Route exact path="/signup" component={Register} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route
                exact
                path="/resetpassword/:token"
                component={ResetPassword}
              />

              {loggedIn === true ? (
                <Switch>
                  <Route exact path="/dashboard" component={Booking} />                  
                  <Route exact path="/views" component={Viewtable} />
                  <Route exact path="/viewsAvaiable" component={ViewAvailable} />
                </Switch>
              ) : (
                ""
              )}
              <Route path="/">
                <Redirect to="/homepage" />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
}

export default Router
