import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SliderProps } from "@mui/material/Slider";
import InfoIcon from "@mui/icons-material/Info";

type DiscreteSliderProps = {
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  sliderValue: number;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
  isTimedChallengeRunning?: boolean;
  isLevelHelpModalOpen: boolean;
  setIsLevelHelpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const marks = [
  {
    value: 1,
    label: "1 (easier)",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5 (harder)",
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
  isTimedChallengeRunning,
  setIsLevelHelpModalOpen,
}: DiscreteSliderProps) {
  const handleSliderChange: SliderProps["onChange"] = (_event, newValue) => {
    setSliderValue(newValue as number);
    setGotRight(false);
    setGotWrong(false);
  };

  const openLevelHelpModal = () => setIsLevelHelpModalOpen(true);

  return (
    <div className="sliderContainer">
      <div className="sliderContainer-gridBox">
        <div></div>
        <div className="slider">
          <h3>How hard should the questions be?</h3>

          <Box sx={{ width: 220 }} className="sliderBox">
            <Slider
              aria-label="Custom marks"
              value={sliderValue}
              onChange={handleSliderChange}
              defaultValue={1}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              disabled={isTimedChallengeRunning}
              marks={marks}
              min={1}
              max={5}
              sx={{
                "& .MuiSlider-markLabel": {
                  fontFamily: "Patrick Hand",
                  color: "#0085bd",
                  fontSize: "18px",
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
        <div className="slider-infoIcon">
          <InfoIcon onClick={openLevelHelpModal} sx={{ fontSize: "22px" }} />
        </div>
      </div>
    </div>
  );
}
