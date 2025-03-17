import { useState } from "react";
import { UserInfo } from "../types/types";

type AvatarProps = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function Avatar({ userInfo, setUserInfo }: AvatarProps) {
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

  function handleAvatar(imageName: string) {
    const tempInfo = { ...userInfo };
    tempInfo.avatar_name = imageName;
    setUserInfo(tempInfo);
  }

  return (
    <>
      <div className="avatarContainer">
        {avatarNames.map((imageName) => (
          <img
            key={imageName}
            src={`../../avatars/${imageName}.png`}
            alt=""
            className={
              userInfo.avatar_name === imageName
                ? "avatarSelected"
                : "avatarNotSelected"
            }
            onClick={() => handleAvatar(imageName)}
          />
        ))}
      </div>
    </>
  );
}

export default Avatar;
