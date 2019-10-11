import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { cutOverflowingText } from "../utils"

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menuDishes: this.props.model.getFullMenu(),
      totalPrice: this.props.model.getTotalMenuPriceForNumberOfPeople()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  /*  componentDidMount() {
    this.props.model.addObserver(this);
  } */

  // this is called when component is removed from the DOM
  // good place to remove observer
  /* componentWillUnmount() {
    this.props.model.removeObserver(this);
  } */

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menuDishes: this.props.model.getFullMenu(),
      totalPrice: this.props.model.getTotalMenuPriceForNumberOfPeople()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    const val = parseInt(e.target.value);
    this.props.model.setNumberOfGuests(val);
    // console.log("this props model", this.props.model);
    this.update();
  };

  render() {
    // console.log("still in sidebar", menuDishes);
    console.log('menu dishes', this.state.menuDishes.length)
    this.state.menuDishes.map(dish => {
      console.log(dish);
    })
    let dishInfoHTML = this.props.model.getFullMenu().map(menuDish => (
      <div key={menuDish.id} className="dishInfo">
        <span className="value-main-course-name">{cutOverflowingText(menuDish.title, 10)}</span>
        <span>{this.props.model.getDishPriceForNumberOfPeople(menuDish)}</span>
        <span id={menuDish.id} onClick={(event) => {
          this.props.model.removeDishFromMenu(event.target.id)
          this.update()
        }}>X</span>
      </div>
    ));
    const totalMenuPrice = this.props.model.getTotalMenuPriceForNumberOfPeople()

    return (
      <div className="Sidebar">
        <div id="sideBarViewContainer">
          <div>
            <div id="sideBarTitle">My dinner</div>
            <div style={{ backgroundColor: "#ababac" }}>
              <div style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                People
              </div>
              <div id="peopleCounter">
                <input
                  className="input-num-guests"
                  type="number"
                  value={this.state.numberOfGuests}
                  onChange={this.onNumberOfGuestsChanged}
                ></input>
              </div>
            </div>
          </div>
          <div id="dishesInfoTitle">
            <span>Dish name</span>
            <span>Cost</span>
          </div>
          <div id="dishesInfo">{dishInfoHTML}</div>

          <div id="totalPrice">
            {totalMenuPrice} SEK <span className="value-total-price"></span>
          </div>
          <Link to="/overview">
            <button id="confirmBtn" className="button">
              Confirm dinner
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
