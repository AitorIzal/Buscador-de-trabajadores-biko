import "./App.css";
import { View } from "./HomeView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DetallesTrabajador } from "./DetallesTrabajador";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/detallesTrabajador/:id">
            <DetallesTrabajador />
          </Route>
          <Route path="/">
            <View />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
