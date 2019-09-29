import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";
import { Link } from "react-router-dom";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dishes: null
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes()
      .then(dishes => {
        console.log("dishes.results", dishes);
        this.setState({
          status: "LOADED",
          dishes: dishes
        });
      })

      .catch(() => {
        console.log("errors!");
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let dishesList = null;
    const dishTypes = [
      "all",
      "lunch",
      "main course",
      "morning meal",
      "brunch",
      "main dish",
      "breakfast",
      "dinner"
    ];

    let cutOverflowingText = (text, numberOfChars) => {
      if (text.length > numberOfChars) {
        return text.substr(0, numberOfChars) + "...";
      }
      return text;
    };

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => (
          <Link key={dish.id} to={"/details/" + dish.id}>
            <div id={dish.id} className="dish">
              <img
                className="dishImage image border"
                src={modelInstance.getFullDishImageURL(dish.imageUrls)}
              />
              {console.log(dish)}
              <p className="dishText text border">
                {cutOverflowingText(dish.title, 15)}
              </p>
            </div>
          </Link>
        ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div className="Dishes">
        <h3>Dishes</h3>
        <div>
          <div id="dishSearchViewWrapper">
            <div id="sideBarView"></div>
            <div id="dishSearchBody">
              <div id="dishSearchHeader">
                <div>
                  <p className="title">Find a dish</p>
                </div>
                <div id="dishSearchView">
                  <input
                    id="searchKeyword"
                    className="border"
                    type="text"
                    placeholder="Enter keywords"
                  ></input>
                  <select id="dropDownMenu" className="dropDownMenu">
                    {dishTypes.map(dishName => (
                      <option key={dishName}>{dishName}</option>
                    ))}
                  </select>
                  <button id="searchBtn" className="button">
                    {" "}
                    search{" "}
                  </button>
                </div>
              </div>
              <div id="dishItems">{dishesList}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dishes;
