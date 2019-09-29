import React, { Component } from "react";
import "./Overview.css";

import { Link } from "react-router-dom";

class Overview extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dishes: null
    };
  }

  render() {
    let cutOverflowingText = (text, numberOfChars) => {
      if (text.length > numberOfChars) {
        return text.substr(0, numberOfChars) + "...";
      }
      return text;
    };
    let dishItemsHTML = this.props.model.getFullMenu().map(dish => {
      this.props.model.getDishPriceForNumberOfPeople(dish);

      return (
        <div key={dish.id} className="dish">
          <img
            className="dishImage border"
            src={this.props.model.getDishImageURLFromString(dish.image)}
          />
          <p className="dishText value-main-course-name">
            {cutOverflowingText(dish.title, 20)}
          </p>
          <p className="dishText">
            {this.props.model.getDishPriceForNumberOfPeople(dish)} SEK
          </p>
        </div>
      );
    });

    const totalMenuPrice = this.props.model.getTotalMenuPriceForNumberOfPeople();

    return (
      <div>
        <h2>This is the Overview screen</h2>
        <div>
          <div id="pageHeader">
            <p id="numberOfGuests">
              My dinner:{" "}
              <span className="value-num-guests">
                {this.props.model.getNumberOfGuests()}
              </span>{" "}
              people
            </p>
            <Link to="/search">
              <button className="button" id="goBackBtn">
                Go back and edit dinner
              </button>
            </Link>
          </div>
          <hr />
          <div id="pageBody">
            <div id="dishItems">{dishItemsHTML}</div>
            <div id="priceDiv"></div>
            <div>
              <p>Total Cost</p>
              <p className="value-total-price">{totalMenuPrice}</p>
            </div>
            <hr />
            <Link to="/printout">
              <button id="toPrintBtn" className="button">
                Print full recipe
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
