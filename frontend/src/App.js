import React from "react";
import {Switch, Route, Router, HashRouter} from "react-router-dom"

import history from "./utils/history.utils"
import {API_BASE_URL} from "./utils/urls.utils"
import HomepagePage from "./pages/Homepage.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import PeopleOverview from "./pages/PeopleOverview.page";
import BoardsOverviewPage from "./pages/BoardsOverview.page";
import BaordEditPage from "./pages/BoardEditPage.page";
import PlayBoard from "./pages/PlayBoard.page";
import PrivateRoute from "./redux/PrivateRoute"

import "./styles/main.scss";

console.log(API_BASE_URL)


function App() {
  return (
    <div className="App">
      <HashRouter history={history} >
        <Switch>
          
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/people" component={PeopleOverview}/>

          <PrivateRoute path="/boards/:boardId/edit" component={BaordEditPage} />
          <Route path="/boards/:boardId" component={PlayBoard} />
          <PrivateRoute path="/boards" component={BoardsOverviewPage} />
        
          <Route path="/" component={HomepagePage}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
