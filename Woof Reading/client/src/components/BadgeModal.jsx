import React from "react";
import { useState, useEffect } from "react";
import bernese from "../assets/bernese.png";
import chihuahua from "../assets/chihuahua.png";
import boxer from "../assets/boxer.png";
import husky from "../assets/husky.png";
import golden from "../assets/golden.png";
import cat from "../assets/cat.png";
import waterdog from "../assets/waterdog.png";
import goldendoodleTrophy from "../assets/goldendoodle_trophy_large.png";

function BadgeModal({ isModalOpen, closeModal, modalBadge }) {
  if (!isModalOpen) return null;

  let badgeImage = null;

  switch (modalBadge) {
    case "bernese":
      badgeImage = bernese;
      break;
    case "chihuahua":
      badgeImage = chihuahua;
      break;
    case "Water Dog":
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
