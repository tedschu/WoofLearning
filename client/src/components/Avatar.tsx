import { UserInfo } from "../types/types";

type AvatarProps = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

function Avatar({ userInfo, setUserInfo }: AvatarProps) {
  const avatarNames = [
    "axolotl",
    "alligator",
    "banana",
    "cat_space",
    "cinnamon_roll",
    "donkey_suss",
    "penguin",
    "lion_cards",
    "panda",
    "cat_suss",
    "pineapple",
    "potato_dance",
    "monkey",
    "shark_tophat",
    "red_panda",
    "snake_golf",
    "superpizza",
    "tiger_dunk",
    "capybara",
    "wizard_mac",
  ];

  function handleAvatar(imageName: string) {
    const tempInfo = { ...userInfo };
    tempInfo.avatar_name = imageName;
    setUserInfo(tempInfo);
  }

  return (
    <>
      <h2 className="avatarHeader">Choose your avatar:</h2>
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
