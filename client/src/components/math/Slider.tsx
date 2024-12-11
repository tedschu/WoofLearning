import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SliderProps } from "@mui/material/Slider";

type DiscreteSliderProps = {
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  sliderValue: number;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
};

const marks = [
  {
    value: 1,
    label: "Easier",
  },
  {
    value: 5,
    label: "Harder",
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSlider({
  setSliderValue,
  sliderValue,
  setGotRight,
  setGotWrong,
}: DiscreteSliderProps) {
  const handleSliderChange: SliderProps["onChange"] = (event, newValue) => {
    setSliderValue(newValue as number);
    setGotRight(false);
    setGotWrong(false);
  };

  return (
    <div className="sliderContainer">
      <h3>How hard should the questions be?</h3>

      <Box sx={{ width: 260 }} className="sliderBox">
        <Slider
          aria-label="Custom marks"
          value={sliderValue}
          onChange={handleSliderChange}
          defaultValue={1}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={1}
          marks={marks}
          min={1}
          max={5}
          sx={{
            "& .MuiSlider-markLabel": {
              fontFamily: "Patrick Hand",
              color: "#0085bd",
            },
            "& .MuiSlider-thumb": {
              color: "#dd6e55", // This changes the color of the slider circle
            },
            "& .MuiSlider-track": {
              color: "#7dc2e0", // Track color behind slider
            },
            "& .MuiSlider-rail": {
              color: "#a6d5ea", // Track color ahead of slider
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "#dd6e55", // This changes the background color of the pop-up indicator
              color: "white", // This changes the text color in the pop-up indicator
              fontFamily: "Patrick Hand", // Optional: to match the font of mark labels
            },
          }}
        />
      </Box>
    </div>
  );
}
