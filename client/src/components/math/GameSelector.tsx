import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { GameSelectorType } from "../../types/types";
import { ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";
// import { alignProperty } from "@mui/material/styles/cssUtils";

type GameSelectorComponentTypes = {
  setGameSelector: React.Dispatch<React.SetStateAction<GameSelectorType>>;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
  gameSelector: string;
  isTimedChallengeRunning?: boolean;
};

export default function GameSelector({
  setGameSelector,
  setGotRight,
  setGotWrong,
  gameSelector,
  isTimedChallengeRunning,
}: GameSelectorComponentTypes) {
  //const [alignment, setAlignment] = useState<GameSelectorType>("addition");

  const handleChange: ToggleButtonGroupProps["onChange"] = (
    _event,
    newAlignment: GameSelectorType
  ) => {
    if (newAlignment != null) {
      setGameSelector(newAlignment);
      setGotRight(false);
      setGotWrong(false);
    }
  };

  const buttonStyle = {
    fontFamily: "Patrick Hand",
    textTransform: "none",
  };

  return (
    <>
      <div className="gameSelectContainer-math">
        <h3>What kind of math do you want to practice?</h3>

        <ToggleButtonGroup
          color="primary"
          value={gameSelector}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          disabled={isTimedChallengeRunning}
          sx={{
            "& .MuiToggleButton-root": {
              ...buttonStyle,
              color: "#0085bd",
              border: "1px solid lightgray",
              padding: "6px",
              minWidth: "67px",
              fontSize: "19px",
            },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ToggleButton value="addition">Add</ToggleButton>
          <ToggleButton value="subtraction">Subtract</ToggleButton>
          <ToggleButton value="multiplication">Multiply</ToggleButton>
          <ToggleButton value="division">Divide</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </>
  );
}
