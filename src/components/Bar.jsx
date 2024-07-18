import "./Bar.css";
import { useEffect, useState } from "react";

function Bar({ index, length, color = 0, changeArray }) {
  const colors = [
    ["rgba(61,90,241,0.5)", "rgba(61,90,241,0.2)"],
    ["rgba(255,48,79,1)", "rgba(255,48,79,0.5)"],
    ["rgba(131,232,90,0.5)", "rgba(131,232,90,0.2)"],
    ["rgba(235,123,19,0.5)", "rgba(235,123,19,0.2)"],
  ];

  const [len, setLen] = useState(length);
  useEffect(() => {
    setLen(length);
  }, [length]);

  // Ensure color is a valid index
  const colorIndex = Math.max(0, Math.min(color || 0, colors.length - 1));

  const inputStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-90deg)",
    border: "none",
    width: "50px",
    background: "none",
  };

  const Bottom = {
    transform: `translateY(${200 - len}px) rotateX(-90deg)`,
    backgroundColor: colors[colorIndex][0],
    boxShadow: `5px 5px 50px 5px ${colors[colorIndex][1]}`,
    transition: "0.3s",
  };

  const frontbackrightLeft = {
    height: `${len}px`,
    transform: `translateY(${200 - len}px)`,
    backgroundColor: colors[colorIndex][0],
    boxShadow: `5px 5px 50px 5px ${colors[colorIndex][1]}`,
    transition: "0.3s",
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === "") {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      if (!isNaN(val)) {
        if (val > 200) {
          setLen(200);
          changeArray(index, 200);
        } else {
          setLen(val);
          changeArray(index, val);
        }
      }
    }
  };

  const handleIncrement = () => {
    const newLen = Math.min(len + 1, 200);
    setLen(newLen);
    changeArray(index, newLen);
  };

  const handleDecrement = () => {
    const newLen = Math.max(len - 1, 0);
    setLen(newLen);
    changeArray(index, newLen);
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
        <div
          className="quantity-button quantity-up"
          onClick={handleIncrement}
          aria-label="Increase value"
        >
          +
        </div>
        <div
          className="quantity-button quantity-down"
          onClick={handleDecrement}
          aria-label="Decrease value"
        >
          -
        </div>
      </div>
    </div>
  );
}

export default Bar;
