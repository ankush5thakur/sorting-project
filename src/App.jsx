import { Component } from "react";
import "./App.css";
// algo...
import BubbleSort from "./algorithms/BSort.jsx";
import Bar from "./components/Bar.jsx";
import Play from "@mui/icons-material/PlayCircleOutlineRounded";
import Forward from "@mui/icons-material/SkipNextRounded";
import Backward from "@mui/icons-material/SkipPreviousRounded";
import RotateLeft from "@mui/icons-material/RotateLeft";

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    delay: 100,
    algorithm: "Bubble Sort",
    timeouts: [],
  };

  ALGORITHMS = {
    "Bubble Sort": BubbleSort,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const { count } = this.state;
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState({ array: temp, arraySteps: [temp], currentStep: 0 }, () => {
      console.log(this.state.array);
      this.generateSteps();
    });
  };

  changeArray = (index, value) => {
    let arr = this.state.array.slice();
    arr[index] = value;
    this.setState(
      {
        array: arr,
        arraySteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = this.state.currentStep;

    while (i < steps.length) {
      let timeout = setTimeout(() => {
        this.setState((prevState) => ({
          array: steps[prevState.currentStep],
          colorKey: colorSteps[prevState.currentStep],
          currentStep: prevState.currentStep + 1,
        }));
      }, this.state.delay * (i - this.state.currentStep));
      timeouts.push(timeout);
      i++;
    }
    this.setState({
      timeouts: timeouts,
    });
  };

  render() {
    let bars = this.state.array.map((value, index) => (
      <Bar
        key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

    let playButton;

    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.generateRandomArray}>
          <RotateLeft />
        </button>
      );
    } else {
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    return (
      <div className="app">
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="control-panel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
        <div className="panel"></div>
      </div>
    );
  }
}

export default App;