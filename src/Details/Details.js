import React, { Component } from "react";
import { Link } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dish: null,
      dishId: props.dishId
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model
      .getDish(this.state.dishId)
      .then(dish => {
        this.setState({
          status: "LOADED",
          dish: dish
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
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        // console.log("dishes", this.state.dish);
        dishesList = (
          <div>
            <div id="dishDetails">
              <p id="dishDetailsTitle" className="value-main-course-name">
                {this.state.dish.title}
              </p>
              <img id="dishDetailsImage" src={this.state.dish.image} />
              <div
                id="dishDetailsBody"
                dangerouslySetInnerHTML={{
                  __html: this.state.dish.instructions
                }}
              />
              <Link to="/search">
                <button id="backButton" className="button">
                  Go back and edit dinner
                </button>
              </Link>
            </div>
            <div id="dishIngredients">
              <div id="dishIngredientsTitle">Ingredients</div>
              {this.state.dish.extendedIngredients.map((ingredient, idx) => (
                <div key={idx} className="dishIngredient">
                  <div className="dishIngredientMeasure">
                    {ingredient.measures.metric.amount}
                    {ingredient.measures.metric.unitShort}
                  </div>
                  <div key="ingredientTitle" className="dishIngredientTitle">
                    {ingredient.name}
                  </div>
                  <div className="dishIngredientPrice">XX SEK</div>
                </div>
              ))}
              <hr />
              <div
                style={{
                  paddingRight: "20px",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                TOTAL <p>{this.state.dish.pricePerServing} SEK </p>
              </div>
              <hr />
              <div>
                <Link to="/search">
                  <button
                    id="addDishToMenuButton"
                    className="button"
                    onClick={() => {
                      this.props.model.addDishToMenu(this.state.dish);
                    }}
                  >
                    Add dish to menu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );

        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }
    return (
      <div>
        <div id="mobileMenu">
          <p>My dinner: {this.props.model.getNumberOfGuests()} people</p>
          <p>MENU</p>
        </div>
        <div id="dishSearchViewWrapper">
          <div id="dishSearchBody">
            <div id="dishItem">
              <div>
                <div id="dishDetailsWrapper">{dishesList}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
