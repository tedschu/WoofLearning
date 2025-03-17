import axolotl from "../assets/avatars/axolotl.png";
import banana from "../assets/avatars/banana.png";
import boy_1 from "../assets/avatars/boy_1.png";
import boy_2 from "../assets/avatars/boy_2.png";
import cat_space from "../assets/avatars/cat-space.png";
import cat_suss from "../assets/avatars/cat-suss.png";
import cinnamon_roll from "../assets/avatars/cinnamon-roll.png";
import donkey_suss from "../assets/avatars/donkey-suss.png";
import girl_1 from "../assets/avatars/girl_1.png";
import girl_2 from "../assets/avatars/girl_2.png";
import lion_cards from "../assets/avatars/lion-cards.png";
import monkey from "../assets/avatars/monkey.png";
import panda from "../assets/avatars/panda.png";
import pineapple from "../assets/avatars/pineapple.png";
import potato_dance from "../assets/avatars/potato-dance.png";
import shark_tophat from "../assets/avatars/shark-tophat.png";
import snake_golf from "../assets/avatars/snake-golf.png";
import superpizza from "../assets/avatars/superpizza.png";
import tiger_dunk from "../assets/avatars/tiger-dunk.png";
import wizard_mac from "../assets/avatars/wizard-mac.png";

function Avatar() {
  const images = [
    axolotl,
    banana,
    boy_2,
    cat_space,
    cinnamon_roll,
    donkey_suss,
    girl_1,
    lion_cards,
    panda,
    cat_suss,
    pineapple,
    potato_dance,
    monkey,
    shark_tophat,
    girl_2,
    snake_golf,
    superpizza,
    tiger_dunk,
    boy_1,
    wizard_mac,
  ];

  return (
    <>
      <div className="avatarContainer">
        {images.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>
    </>
  );
}

export default Avatar;
