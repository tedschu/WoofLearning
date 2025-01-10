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
import wow from "../assets/wow_2.png";
import mega from "../assets/mega.png";

type BadgeModalTypes = {
  isModalOpen: boolean;
  closeModal: () => void;
  modalBadge: ModalBadgeType;
};

// TODO: UPDATE SWITCH TO INCLUDE NEW BADGES

function BadgeModal({ isModalOpen, closeModal, modalBadge }: BadgeModalTypes) {
  if (!isModalOpen) return null;

  let badgeImage: string | undefined = undefined;
  let badgeText: string | undefined = undefined;

  switch (modalBadge) {
    case "badge_1_1_bernese":
      badgeImage = bernese;
      badgeText = "Bernese";
      break;
    case "badge_1_2_chihuahua":
      badgeImage = chihuahua;
      badgeText = "Chihuahua";
      break;
    case "badge_1_3_waterdog":
      badgeImage = waterdog;
      badgeText = "Water Dog";
      break;
    case "badge_1_4_boxer":
      badgeImage = boxer;
      badgeText = "Boxer";
      break;
    case "badge_1_5_husky":
      badgeImage = husky;
      badgeText = "Husky";
      break;
    case "badge_1_6_golden":
      badgeImage = golden;
      badgeText = "Goldendoodle";
      break;
    case "badge_1_7_cat":
      badgeImage = cat;
      badgeText = "cat";
      break;
    case "badge_1_8_goldendoodle":
      badgeImage = goldendoodleTrophy;
      badgeText = "Goldendoodle trophy";
      break;
    case "badge_2_1_borderCollie":
      badgeImage = borderCollie;
      badgeText = "Border Collie";
      break;
    case "badge_2_2_terrier":
      badgeImage = terrier;
      badgeText = "Terrier";
      break;
    case "badge_2_3_australianShepherd":
      badgeImage = australianShepherd;
      badgeText = "Australian Shepherd";
      break;
    case "badge_2_4_shibaInu":
      badgeImage = shibaInu;
      badgeText = "Shiba Inu";
      break;
    case "badge_2_5_cat":
      badgeImage = cat2;
      badgeText = "cat";
      break;
    case "badge_2_6_bernese":
      badgeImage = bernese2;
      badgeText = "Bernese";
      break;
    case "badge_2_7_poodle":
      badgeImage = poodle;
      badgeText = "Preppy Poodle";
      break;
    case "badge_2_8_golden":
      badgeImage = goldendoodleTrophy2;
      badgeText = "Goldendoodle trophy";
      break;
    default:
      badgeImage = undefined;
  }

  return (
    <>
      <div className="badgeModalOverlay">
        <div className="badgeModalContent">
          <div className="badgeModalTop">
            <h2 className="badgeModalClose" onClick={closeModal}>
              X
            </h2>
            {/* <h2>YESSSSS! </h2> */}
            <img src={mega} alt="" />
            <div></div>
          </div>
          {/* TERNARY BELOW RENDERS DIFFERENT H2 TEXT IF A USER HAS BEATEN A LEVEL OR GETS A CAT BADGE. OTHERWISE, DEFAULTS TO "badgeText" */}
          {modalBadge == "badge_1_8_goldendoodle" ? (
            <>
              <h2>You won the goldendoodle trophy badge! Way to go, champ.</h2>
              <h2>You're ready for...LEVEL 2!</h2>
            </>
          ) : modalBadge == "badge_2_8_golden" ? (
            <h2>Wow, you just won the game! You are amazing.</h2>
          ) : badgeText == "cat" ? (
            <h2>
              Meow! A cat badge? They are a bit sneaky, after all. Congrats!
            </h2>
          ) : (
            <h2>You won the {badgeText} badge!</h2>
          )}

          <img src={badgeImage} alt="" />

          <button className="modalCloseButton" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default BadgeModal;
