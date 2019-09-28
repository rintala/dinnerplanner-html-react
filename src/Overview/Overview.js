import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Overview.css";
import cutOverflowingText from "../utils";

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
    let dishItemsHTML = this.props.model
      .getFullMenu()
      .map(dish => {
        this.props.model.getDishPriceForNumberOfPeople(dish);
        return `
          <div class="dish">
            <img class="dishImage border" src="${this.props.model.getDishImageURLFromString(
              dish.image
            )}"/>
            <p class="dishText value-main-course-name">${cutOverflowingText(
              dish.title,
              20
            )}</p>
            <p class="dishText">${this.props.model.getDishPriceForNumberOfPeople(
              dish
            )} SEK</p>
          </div>`;
      })
      .join("");

    /* this.container.querySelector("#dishItems").innerHTML = dishItemsHTML; */

    const totalMenuPrice = this.props.model.getTotalMenuPriceForNumberOfPeople();
    /*  this.container.getElementsByClassName(
      "value-total-price"
    )[0].innerHTML = totalMenuPrice; */

    return (
      <div>
        <h2>This is the Overview screen</h2>
        <Sidebar model={this.props.model} />
        <div>
          <div id="pageHeader">
            <p id="numberOfGuests">
              My dinner:{" "}
              <span class="value-num-guests">
                {this.props.model.getNumberOfGuests()}
              </span>{" "}
              people
            </p>
            <button class="button" id="goBackBtn">
              Go back and edit dinner
            </button>
          </div>
          <hr />
          <div id="pageBody">
            <div id="dishItems">{dishItemsHTML}</div>
            <div id="priceDiv"></div>
            <div>
              <p>Total Cost</p>
              <p class="value-total-price">{totalMenuPrice}</p>
            </div>
            <hr />
            <button id="toPrintBtn" class="button">
              Print full recipe
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
