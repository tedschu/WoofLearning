import React from "react";
import mathImage from "./../assets/helpPopup-math.png";
import readingImage from "./../assets/helpPopup-reading.png";
import chartImage from "./../assets/helpPopup-chart.png";

type HelpModalTypes = {
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function HelpModal({ isHelpModalOpen, setIsHelpModalOpen }: HelpModalTypes) {
  const closeHelpModal = () => setIsHelpModalOpen(false);

  if (!isHelpModalOpen) return null;

  return (
    <>
      <div className="modalOverlay-help">
        <div className="modalContent-help">
          <h2>What are these charts?</h2>
          <p>
            They're showing you how many points you've earned at the different
            "how hard should the questions be?" levels.
          </p>
          <div className="helpImageContainer">
            <img src={chartImage} className="helpImgChart" alt="" />
          </div>
          <p>
            So, if you've always answered questions at the first level (see
            below), then all of your points will show there. When you're ready,
            try answering questions from different levels!
          </p>
          <div className="helpImageContainer">
            <img src={mathImage} className="helpImg" alt="" />
            <img src={readingImage} className="helpImg" alt="" />
          </div>
          <button className="modalClose" onClick={closeHelpModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default HelpModal;
