import React, { Component } from "react";
import Konami from "react-konami-code";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { x: 0, y: 0 },
      lastBorder: 0,
      animationDelay: 20000,
      konami: false,
      fillColor: "#ffffff",
    };
  }

  componentDidMount() {
    this.draw();
  }

  distanceToTime(from, to, speed) {
    const distance = Math.sqrt(
      Math.pow(to.y - from.y, 2) + Math.pow(to.x - from.x, 2)
    );
    return distance / ((speed * 3) / 100);
  }

  draw() {
    let xOffset = 140;
    let bOffset = 140;
    let tOffset = 20;
    let position = {
      x: 0,
      y: 0,
    };
    let lastBorder = this.state.lastBorder;
    let borders = [0, 1, 2, 3].filter((border) => border !== lastBorder);
    let rng = Math.floor(Math.random() * 2);
    let border = borders[rng];
    switch (border) {
      case 0:
      default:
        position.x = Math.floor(
          Math.random() * (document.documentElement.clientWidth - xOffset)
        );
        position.y = 0 - tOffset;
        break;
      case 1:
        position.x = document.documentElement.clientWidth - xOffset;
        position.y = Math.floor(
          Math.random() * (document.documentElement.clientHeight - bOffset)
        );
        break;
      case 2:
        position.x = Math.floor(
          Math.random() * (document.documentElement.clientWidth - xOffset)
        );
        position.y = document.documentElement.clientHeight - bOffset;
        break;
      case 3:
        position.x = 0;
        position.y = Math.floor(
          Math.random() * (document.documentElement.clientHeight - bOffset)
        );
        break;
    }

    let animationDelay = this.distanceToTime(this.state.position, position, 15);

    this.setState({
      position,
      animationDelay,
      lastBorder: border,
      fillColor: this.randomColor(),
    });
    setTimeout(() => this.draw(), animationDelay);
  }

  render() {
    return (
      <div style={this.containerStyle()}>
        <img src="bearjog.gif" alt="not pog" style={this.getImageStyle()} />
        <Konami>
          <input
            value={this.state.animationDelay}
            onChange={this.handleChange.bind(this)}
          />
        </Konami>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ animationDelay: e.target.value });
  }

  getImageHeight() {
    return Math.round(window.innerHeight / 2);
  }

  randomColor() {
    return `#${Math.round(Math.random() * 16777215).toString(16)}`;
  }

  containerStyle() {
    return {
      width: "100vw",
      height: "100vh",
      background: "none",
    };
  }

  getImageStyle() {
    return {
      left: this.state.position.x,
      top: this.state.position.y,
      height: "160px",
      width: "160px",
      position: "fixed",
      transition: `left ${this.state.animationDelay}ms linear 0s, top ${this.state.animationDelay}ms linear 0s`,
      fill: `${this.state.fillColor} !important`,
    };
  }
}

export default App;
