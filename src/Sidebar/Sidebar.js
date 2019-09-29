import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
    console.log("model", this.props.model);
  };

  render() {
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
          <div id="dishesInfo"></div>

          <div id="totalPrice">
            SEK <span className="value-total-price"></span>
          </div>
          <Link to="/overview">
            <button id="confirmBtn" className="button">
              Confirm dinner
            </button>
          </Link>
        </div>
        <p>
          People:
          <input type="number" />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>
      </div>
    );
  }
}

export default Sidebar;
