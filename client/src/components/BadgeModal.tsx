import bernese from "../assets/bernese.png";
import chihuahua from "../assets/chihuahua.png";
import boxer from "../assets/boxer.png";
import husky from "../assets/husky.png";
import golden from "../assets/golden.png";
import cat from "../assets/cat.png";
import waterdog from "../assets/waterdog.png";
import borderCollie from "../assets/img_2_1_borderCollie.png";
import terrier from "../assets/img_2_2_terrier.png";
import australianShepherd from "../assets/img_2_3_australianShepherd.png";
import shibaInu from "../assets/img_2_4_shibaInu.png";
import cat2 from "../assets/img_2_5_cat.png";
import bernese2 from "../assets/img_2_6_bernese.png";
import poodle from "../assets/img_2_7_poodle.png";
import goldendoodleTrophy2 from "../assets/img_2_8_golden.png";
import goldendoodleTrophy from "../assets/goldendoodle_trophy_large.png";
import { ModalBadgeType } from "../types/types";

type BadgeModalTypes = {
  isModalOpen: boolean;
  closeModal: () => void;
  modalBadge: ModalBadgeType;
};

// TODO: UPDATE SWITCH TO INCLUDE NEW BADGES

function BadgeModal({ isModalOpen, closeModal, modalBadge }: BadgeModalTypes) {
  if (!isModalOpen) return null;

  let badgeImage: string | undefined = undefined;

  switch (modalBadge) {
    case "bernese":
      badgeImage = bernese;
      break;
    case "chihuahua":
      badgeImage = chihuahua;
      break;
    case "waterdog":
      badgeImage = waterdog;
      break;
    case "boxer":
      badgeImage = boxer;
      break;
    case "husky":
      badgeImage = husky;
      break;
    case "golden":
      badgeImage = golden;
      break;
    case "cat":
      badgeImage = cat;
      break;
    case "goldendoodle_trophy":
      badgeImage = goldendoodleTrophy;
      break;
    case "borderCollie":
      badgeImage = borderCollie;
      break;
    case "terrier":
      badgeImage = terrier;
      break;
    case "australianShepherd":
      badgeImage = australianShepherd;
      break;
    case "shibaInu":
      badgeImage = shibaInu;
      break;
    case "cat2":
      badgeImage = cat2;
      break;
    case "bernese2":
      badgeImage = bernese2;
      break;
    case "poodle":
      badgeImage = poodle;
      break;
    case "goldendoodleTrophy2":
      badgeImage = goldendoodleTrophy2;
      break;
    default:
      badgeImage = undefined;
  }

  return (
    <>
      <div className="badgeModalOverlay">
        <div className="badgeModalContent">
          <h2>YESSSSS! </h2>
          {modalBadge == "goldendoodle_trophy" ? (
            <h2>You won the goldendoodle trophy badge! Way to go, champ!</h2>
          ) : modalBadge == "cat" ? (
            <h2>
              Meow! A cat badge? They are a bit sneaky, after all. Congrats!
            </h2>
          ) : (
            <h2>You won the {modalBadge} badge!</h2>
          )}

          <img src={badgeImage} alt="" />

          <button className="modalClose" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default BadgeModal;
