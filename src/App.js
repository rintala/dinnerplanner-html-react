import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import Details from "./Details/Details";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header">{this.state.title}</div>

          {/* We render different components based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route
            path="/printout"
            render={() => <Printout model={modelInstance} />}
          />
          <Route
            path="/overview"
            render={() => <Overview model={modelInstance} />}
          />
          <Route
            path="/details/:dishId"
            render={params => (
              <Details
                model={modelInstance}
                dishId={params.match.params.dishId}
              />
            )}
          />
        </header>
      </div>
    );
  }
}

export default App;
