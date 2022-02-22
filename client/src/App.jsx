import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Respondent from "./pages/Respondent";
import Questionnaire from "./pages/Questionnaire";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Respondent /> : <Navigate replace to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        ></Route>
        <Route
          exact
          path="/response/:questionnaire"
          element={user ? <Respondent /> : <Navigate replace to="/login" />}
        ></Route>
        <Route
          exact
          path="/questionnaires/:questionnaire"
          element={user ? <Questionnaire /> : <Navigate replace to="/login" />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
