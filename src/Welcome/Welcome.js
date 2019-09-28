import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="container text-center full-vh d-flex align-items-center justify-content-center flex-column">
        <p className="text-center p-max-width">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel
          laoreet orci. Nullam ut iaculis diam. Aliquam magna nulla, congue ut
          elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh
          elementum euismod a sit amet arcu. Maecenas a efficitur leo.
        </p>
        <div className="spacing-medium"></div>
        <Link to="/search">
          <button id="startBtn" className="button">
            Start planning
          </button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
