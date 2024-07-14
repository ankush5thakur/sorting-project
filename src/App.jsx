import { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 100,
    algorithm: "",
    timeouts: [],
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray() {
    const { count } = this.state; // Destructure count from state
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    // Update the state with the generated random array
    this.setState({ array: temp }, () => {
      console.log(this.state.array); // Log the updated array
    });
  }

  render() {
    return (
      <div className="app">
        <h1>har har mahadev</h1>
        <p>Generated Array: {JSON.stringify(this.state.array)}</p>{" "}
        {/* Display the array */}
      </div>
    );
  }
}

export default App;
