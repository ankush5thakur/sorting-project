import "./Bar.css";
import { useEffect, useState } from "react";

function Bar({ index, length, color, changeArray }) {
  const [len, setLen] = useState(length);
  useEffect(() => {
    setLen(length);
  }, [length]);
  const colors = [
    ["rgba(61,90,241,0.5)", "rgba(61,90,241,0.2)"],
    ["rgba(255,48,79,1)", "rgba(255,48,79,0.5)"],
    ["rgba(131,232,90,0.5)", "rgba(131,232,90,0.2)"],
    ["rgba(235,123,19,0.5)", "rgba(235,123,19,0.2)"],
  ];

  const inputStyle = {
    position: "absolute",
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-50%, -50%) rotate(-90deg)", // Centering with rotation
    border: "none",
    width: "50px",
    background: "none",
  };

  const Bottom = {
    transform: `translateY(${200 - len}px) rotateX(-90deg)`,
    backgroundColor: colors[color][0],
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "0.3s",
  };

  const frontbackrightLeft = {
    height: `${len}px`,
    transform: `translateY(${200 - len}px)`,
    backgroundColor: colors[color][0],
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "0.3s",
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === "") {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      if (val > 200) {
        setLen(200);
        changeArray(index, 200);
      } else {
        setLen(val);
        changeArray(index, val);
      }
    }
  };
  const handleIncrement = () => {
    setLen(len + 1);
    changeArray(index, len);
  };

  const handleDecrement = () => {
    setLen(len - 1);
    changeArray(index, len);
  };

  return (
    <div className="bar">
      <div className="side top"></div>
      <div className="side bottom" style={Bottom}></div>
      <div className="side right">
        <div
          className="color-bar right-color-bar"
          style={frontbackrightLeft}
        ></div>
      </div>
      <div className="side left">
        <div
          className="color-bar left-color-bar"
          style={frontbackrightLeft}
        ></div>
      </div>
      <div className="side front">
        <div className="color-bar front-color-bar" style={frontbackrightLeft}>
          <input
            type="number"
            value={len}
            className="input"
            style={inputStyle}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="side back">
        <div
          className="color-bar back-color-bar"
          style={frontbackrightLeft}
        ></div>
      </div>
      <div className="quantity-nav">
        <div className="quantity-button quantity-up" onClick={handleIncrement}>
          +
        </div>
        <div
          className="quantity-button quantity-down"
          onClick={handleDecrement}
        >
          -
        </div>
      </div>
    </div>
  );
}

export default Bar;
