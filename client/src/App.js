import "./App.css";
import { Switch, Route } from "react-router-dom";

// Private Route
import PrivateRoute from "./components/routing/PrivateRoute";

// screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ErrorScreen from "./components/screens/ErrorScreen";
// import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
// import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={PrivateScreen} />
        <PrivateRoute path="/private" component={PrivateScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="*" component={ErrorScreen} />
      </Switch>{" "}
    </div>
  );
}
export default App;
