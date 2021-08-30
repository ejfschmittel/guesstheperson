import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import HomepagePage from "./pages/Homepage.page";
import {useDispatch, useSelector} from "react-redux"
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import { userLoginSuccess} from "./redux/user/user.actions"
import {parseJwt} from "./utils/jwt.utils"
import "./styles/main.scss";
import PeopleOverview from "./pages/PeopleOverview.page";


function App() {
  const dispatch = useDispatch()
  const token = useSelector(store => store.user.auth_token)


  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/people" component={PeopleOverview}/>
          <Route path="/" component={HomepagePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
