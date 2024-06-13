import { useRef, useLayoutEffect } from "react";
import { Html } from "@react-three/drei";
import { useData } from "../context/DataProvider";

const Content = () => {
  const sliderInputRef = useRef<HTMLInputElement>(null);
  const sliderThumbRef = useRef<HTMLDivElement>(null);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const { constant, setConstant, orbitControlRef, modelRef } = useData();

  useLayoutEffect(() => {
    setTimeout(() => {
      showSliderValue();
    }, 50);
  }, [modelRef.current]);

  const showSliderValue = () => {
    const sliderInput = sliderInputRef.current;
    const sliderThumb = sliderThumbRef.current;
    const sliderLine = sliderLineRef.current;

    if (!sliderInput || !sliderThumb || !sliderLine) return;

    const value = parseFloat(sliderInput.value);
    const max = parseFloat(sliderInput.max);
    const min = parseFloat(sliderInput.min);

    const bulletPosition = (value - min) / (max - min);
    const space = sliderInput.offsetWidth - sliderThumb.offsetWidth;

    sliderThumb.innerHTML = value.toFixed(2);
    sliderThumb.style.left = bulletPosition * space + "px";
    sliderLine.style.width = bulletPosition * 100 + "%";
  };

  const handleMouseDown = () => {
    if (orbitControlRef.current) {
      orbitControlRef.current.enabled = false;
    }
  };

  const handleMouseUp = () => {
    if (orbitControlRef.current) {
      orbitControlRef.current.enabled = true;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConstant(parseFloat(e.target.value));
    showSliderValue();
  };

  return (
    <Html>
      <div className="range-slider">
        <div className="range-container">
          <div ref={sliderThumbRef} className="range-slider_thumb">
            {constant.toFixed(2)}
          </div>
          <div className="range-slider_line">
            <div ref={sliderLineRef} className="range-slider_line-fill"></div>
          </div>
          <input
            ref={sliderInputRef}
            className="range-slider_input"
            type="range"
            min="-0.5"
            max="1"
            step="0.01"
            value={constant}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>
    </Html>
  );
};

export default Content;
