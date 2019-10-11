import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import Details from "./Details/Details";
import { Link } from "react-router-dom";
import readCookie from "./cookieHandler"
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }
  componentWillMount() {
    readCookie(modelInstance).then(() => {
      this.setState({
        menuDishes: modelInstance.getFullMenu(),
        totalPrice: modelInstance.getTotalMenuPriceForNumberOfPeople()
      });
    })
    console.log('reading cookie done in mount')
    console.log('Guests in model: ', modelInstance.getNumberOfGuests())
    console.log('Menu in model: ', modelInstance.getFullMenu())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/search">
            <div className="header">{this.state.title}</div>
          </Link>

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
