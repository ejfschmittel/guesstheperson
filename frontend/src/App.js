import React from "react";
import {Switch, Route, Router} from "react-router-dom"


import HomepagePage from "./pages/Homepage.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import "./styles/main.scss";
import PeopleOverview from "./pages/PeopleOverview.page";
import BoardsOverviewPage from "./pages/BoardsOverview.page";
import BaordEditPage from "./pages/BoardEditPage.page";
import PlayBoard from "./pages/PlayBoard.page";
import PrivateRoute from "./redux/PrivateRoute"
import history from "./utils/history.utils"


function App() {
  return (
    <div className="App">
      <Router history={history} forceRefresh={true}>
        <Switch>
          
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/people" component={PeopleOverview}/>
          <Route path="/boards/:boardId/edit" component={BaordEditPage} />
          <Route path="/boards/:boardId" component={PlayBoard} />
          <PrivateRoute path="/boards" component={BoardsOverviewPage} />
        
          <Route path="/" component={HomepagePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
