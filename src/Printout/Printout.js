import React, { Component } from "react";
import { Link } from "react-router-dom";

class Printout extends Component {
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
    return (
      <div>
        <div id="pageHeader">
          <p>My dinner: {this.props.model.getNumberOfGuests()} people</p>
          <Link to="/search">
            <button id="goBackBtn" className="button">
              Go back and edit dinner
            </button>
          </Link>
        </div>
        <hr />
        <div id="pageBody">
          <div className="dishesToPrint">
            <div id="dishItems">
              {this.props.model.getFullMenu().map((dish, idx) => (
                <div key={idx} className="dishToPrint">
                  <img
                    className="dishImage border"
                    src={this.props.model.getDishImageURLFromString(dish.image)}
                    alt="dish-image"
                  />
                  <div className="dishToPrintText">
                    <p
                      className="value-main-course-name"
                      style={{ fontSize: "20px" }}
                    >
                      {cutOverflowingText(dish.title, 20)}
                    </p>
                    <p className="dishText">{dish.pricePerServing} </p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <b>Preparations</b>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </div>
          </div>
          <div>
            <p>Total Cost</p>
            <p className="value-total-price">
              {this.props.model.getTotalMenuPriceForNumberOfPeople()}
            </p>
          </div>
          <hr />
          <button className="button">Print full recipe</button>
        </div>
      </div>
    );
  }
}

export default Printout;
