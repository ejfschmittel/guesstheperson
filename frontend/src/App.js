import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import HomepagePage from "./pages/Homepage.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";


import "./styles/main.scss";



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/" component={HomepagePage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
