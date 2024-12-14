import { useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import storyPrompts from "../../utils/storyPrompts";
import { StorySelectorProps, StoryType } from "../../types/types";

export default function StorySelector({
  storyPrompt,
  setStoryPrompt,
  setStoryType,
  storyType,
}: StorySelectorProps) {
  // Finds a random value in the storyPrompt array and sets it in state (storyPrompt)
  const selectPrompt = () => {
    const randomIndex = Math.floor(Math.random() * storyPrompts.length);
    const prompt = storyPrompts[randomIndex];
    setStoryPrompt(prompt);
  };

  // Runs selectPrompt on page load to ensure there's a "default" prompt value
  useEffect(() => {
    selectPrompt();
  }, []);

  // Handles the button click to "try another" story prompt
  const handleButton = () => {
    selectPrompt();
  };

  // Handles the drop-down selector for story type
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStoryType(event.target.value as StoryType);
  };

  return (
    <>
      <div className="storySelectContainer">
        <h3>Let's pick a</h3>
        <div className="storyPromptContainer">
          <div>
            <form className="storyPrompt">
              <select
                name="dropdown"
                id="dropdown"
                value={storyType}
                className="custom-select"
                onChange={handleChange}
                style={{ border: "none" }}
              >
                <option value="story">Story</option>
                <option value="poem">Poem</option>
                <option value="ballad">Ballad</option>
              </select>
            </form>
          </div>
          <h3 className="storyPrompt-separator">about</h3>

          <div className="storyPrompt">
            <h3>{storyPrompt}</h3>
            <ArrowForwardIosIcon className="nextIcon" onClick={handleButton} />
          </div>
        </div>
      </div>
    </>
  );
}
