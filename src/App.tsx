import "./App.css";

import "./css/detallesTrabajador.css";
import { View } from "./View/HomeView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DetallesTrabajador } from "./View/DetallesTrabajador";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/detallesTrabajador/:id"
          component={DetallesTrabajador}
        ></Route>
        <Route path="/" exact component={View}></Route>
      </Switch>
    </Router>
  );
}

export default App;
