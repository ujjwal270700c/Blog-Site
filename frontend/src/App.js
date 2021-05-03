import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
 import Home from "./Comp/Home/Home";
 import Profile from "./Comp/Profile/AllPostByUser";
 import Auth from "./Comp/Auth/Auth";
// import Register from "./components/pages/Register";
import Form from "./Comp/Form/Form";
import AuthState from "./auth/AuthState";
import AuthToken from "./auth/AuthToken";
import ProtectRoute from "./auth/ProtectRoute";
import PostState from "./post/PostState";
import PostDetails from './showPost/ShowPost'
console.log(localStorage);
if (localStorage.token) {
  AuthToken(localStorage.token);
  console.log('tokensakjbcvaskbvcas');
}

function App() {
  return (
    <AuthState>
      <PostState>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/auth" component={Auth} />
               <ProtectRoute  exact path="/profile" component={Profile} />
               <ProtectRoute path="/post/:id" component={PostDetails} />
             
              <ProtectRoute exact path="/create-post" component={Form} /> 
            </Switch>
          </Fragment>
        </Router>
      </PostState>
    </AuthState>
  );
}

export default App;