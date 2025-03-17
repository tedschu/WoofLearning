import { ImageList } from "@mui/material";
import { useState } from "react";

function Avatar() {
  const [avatar, setAvatar] = useState("pineapple");

  const avatarNames = [
    "axolotl",
    "banana",
    "boy_2",
    "cat_space",
    "cinnamon_roll",
    "donkey_suss",
    "girl_1",
    "lion_cards",
    "panda",
    "cat_suss",
    "pineapple",
    "potato_dance",
    "monkey",
    "shark_tophat",
    "girl_2",
    "snake_golf",
    "superpizza",
    "tiger_dunk",
    "boy_1",
    "wizard_mac",
  ];

  return (
    <>
      <img src={`../../avatars/${avatar}.png`} alt="" />
      <div className="avatarContainer">
        {avatarNames.map((imageName) => (
          <img
            key={imageName}
            src={`../../avatars/${imageName}.png`}
            alt=""
            className={
              avatar === imageName ? "avatarSelected" : "avatarNotSelected"
            }
            onClick={() => setAvatar(imageName)}
          />
        ))}
      </div>
    </>
  );
}

export default Avatar;
