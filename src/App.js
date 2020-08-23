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
    let xOffset = 120;
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
        {/* <svg
          style={this.getImageStyle()}
          version="1.0"
          width="300.000000pt"
          height="168.000000pt"
          fill={this.randomColor()}
          viewBox="0 0 300.000000 168.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,168.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path d="M1914 1316 c-82 -108 -152 -196 -155 -196 -4 0 -35 86 -69 191 -51 158 -64 189 -75 178 -7 -8 -74 -95 -149 -194 -76 -99 -141 -181 -145 -183 -5 -1 -37 84 -73 190 l-65 193 -349 3 c-387 3 -451 -4 -571 -58 -86 -39 -172 -123 -209 -203 -25 -54 -29 -74 -29 -154 0 -85 2 -94 30 -134 41 -59 100 -101 171 -125 50 -16 88 -19 249 -19 221 0 257 7 353 69 130 84 196 181 210 308 l7 63 95 -262 c52 -145 98 -263 101 -263 4 0 73 86 154 191 l148 191 18 -54 c67 -190 115 -318 121 -318 4 0 73 87 155 193 l148 192 7 -54 c11 -93 84 -174 193 -212 117 -41 458 -37 550 7 18 8 66 46 107 84 103 95 133 159 133 287 0 85 -2 94 -30 134 -41 58 -90 95 -160 121 -57 21 -78 23 -391 26 l-331 3 -149 -195z m775 61 c39 -19 74 -98 74 -165 0 -102 -55 -191 -145 -236 -48 -24 -62 -26 -180 -26 l-128 0 -44 43 c-55 53 -71 104 -56 174 23 101 85 170 183 204 63 22 258 26 296 6z m-1937 -40 c57 -44 72 -74 72 -139 -1 -76 -43 -159 -102 -205 -62 -47 -127 -63 -257 -63 -108 0 -113 1 -153 30 -54 39 -76 82 -75 148 0 66 42 153 95 195 65 52 127 67 263 65 114 -3 122 -4 157 -31z" />
            <path d="M1055 644 c-424 -32 -716 -89 -785 -154 -36 -34 -37 -44 -5 -74 114 -106 690 -175 1365 -163 670 12 1105 90 1118 200 3 21 -4 31 -30 47 -80 49 -281 95 -558 126 -109 12 -258 17 -600 19 -250 1 -477 1 -505 -1z m-164 -149 c13 -30 27 -55 30 -55 4 0 17 25 29 55 18 45 27 55 46 55 13 0 24 -5 24 -10 0 -19 -89 -200 -98 -200 -9 0 -102 183 -102 201 0 5 11 9 24 9 19 0 28 -10 47 -55z m317 -47 c-3 -98 -4 -103 -25 -106 -23 -3 -23 -2 -23 102 l0 106 25 0 26 0 -3 -102z m323 64 c39 -43 39 -90 1 -133 -25 -28 -35 -32 -100 -37 l-72 -5 0 108 0 107 71 -4 c65 -3 74 -6 100 -36z m319 18 c0 -17 -7 -20 -50 -20 -43 0 -50 -3 -50 -20 0 -17 7 -20 50 -20 43 0 50 -3 50 -20 0 -17 -7 -20 -50 -20 -47 0 -50 -2 -50 -25 0 -23 3 -25 50 -25 44 0 50 -3 50 -20 0 -19 -5 -21 -72 -18 l-73 3 -3 89 c-2 49 -1 95 2 103 4 9 26 13 76 13 63 0 70 -2 70 -20z m342 -19 c38 -43 38 -90 -1 -133 -27 -30 -35 -33 -86 -33 -51 0 -59 3 -86 33 -36 40 -38 87 -8 126 29 37 55 47 109 42 34 -3 51 -11 72 -35z" />
            <path d="M1410 445 l0 -65 30 0 c37 0 70 31 70 65 0 34 -33 65 -70 65 l-30 0 0 -65z" />
            <path d="M2060 490 c-11 -11 -20 -31 -20 -45 0 -14 9 -34 20 -45 11 -11 31 -20 45 -20 14 0 34 9 45 20 11 11 20 31 20 45 0 14 -9 34 -20 45 -11 11 -31 20 -45 20 -14 0 -34 -9 -45 -20z" />
          </g>
        </svg>*/}
        <img src="pogchamp.png" alt="not pog" style={this.getImageStyle()} />
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
      background: "#171717",
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
