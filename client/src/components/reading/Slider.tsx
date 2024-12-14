import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from "react";

type SliderTypes = {
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  sliderValue: number;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
  setStoryLength: React.Dispatch<React.SetStateAction<number>>;
  pointsToWin: number;
  setPointsToWin: React.Dispatch<React.SetStateAction<number>>;
};

const marks = [
  {
    value: 1,
    label: "K - 1st",
  },
  {
    value: 2,
    label: "2nd",
  },
  {
    value: 3,
    label: "3rd",
  },
  {
    value: 4,
    label: "4th",
  },
  {
    value: 5,
    label: "5th+",
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
  setStoryLength,
  setPointsToWin,
}: SliderTypes) {
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
    setGotRight(false);
    setGotWrong(false);
    storyLength(newValue as number);
    assignPoints(newValue as number);
  };

  // Sets the length of the story (ex. 500 words) in prompt based on the difficulty slider value
  function storyLength(sliderValue: number) {
    switch (sliderValue) {
      case 1:
        setStoryLength(250);
        break;
      case 2:
        setStoryLength(300);
        break;
      case 3:
        setStoryLength(350);
        break;
      case 4:
        setStoryLength(450);
        break;
      case 5:
        setStoryLength(550);
        break;
    }
  }

  // Default state value for pointsToWin === 10 (in Game)
  function assignPoints(sliderValue: number) {
    let points;

    switch (sliderValue) {
      case 1:
        points = 12;
        setPointsToWin(points);
        break;
      case 2:
        points = 14;
        setPointsToWin(points);
        break;
      case 3:
        points = 16;
        setPointsToWin(points);
        break;
      case 4:
        points = 20;
        setPointsToWin(points);
        break;
      case 5:
        points = 24;
        setPointsToWin(points);
        break;
    }
  }

  return (
    <div className="sliderContainer">
      <h3>What reading level should the story be at?</h3>

      <Box sx={{ width: 300 }} className="sliderBox">
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
