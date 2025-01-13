type LevelHelpModalTypes = {
  isLevelHelpModalOpen: boolean;
  closeLevelHelpModal: () => void;
};

function LevelHelpModal({
  isLevelHelpModalOpen,
  closeLevelHelpModal,
}: LevelHelpModalTypes) {
  if (!isLevelHelpModalOpen) return null;

  return (
    <>
      <div className="levelHelpModalOverlay">
        <div className="levelHelpModalContainer">
          <div className="levelHelp-TopBar">
            <div onClick={closeLevelHelpModal}>X</div>
            <h2 className="levelHelp-centerBox">What do these levels mean?</h2>
            <div></div>
          </div>
          <div className="levelHelpModalContent">
            <h3 className="levelHelp-fontMath">Woof Math: </h3>
            <ul>
              <li>
                In general, as you increase the level, the questions will have
                larger numbers, and can have up to three numbers. For example:
              </li>
              <ul>
                <li>
                  "Level 1" will ask questions with single-digit numbers only
                  (ex. 3 + 4 or 6 * 2)
                </li>
                <li>
                  "Level 2" will incorporate double-digit and single digit
                  numbers (ex. 11 * 3). These thresholds change a bit depending
                  on the math type. For instance, "level 2" multiplication will
                  always be numbers between 1-12.{" "}
                </li>
                <li>
                  "Level 5," then, will generally be the largest numbers, and
                  can show up to three at a time (ex. 145 + 68 + 23)
                </li>
              </ul>
            </ul>
            <h3 className="levelHelp-fontReading">Woof Reading:</h3>
            <ul>
              <li>
                As the level increases in the reading game, there are two things
                that can change: the amount of words in a story (ex. "level 1"
                is ~250 words, "level 5" is ~550 words), and the word complexity
                increases.
              </li>
            </ul>
            <p>
              If you have further questions or feedback on these levels, we're
              all ears! Send us a note at{" "}
              <span className="blueLink">wooflearning@gmail.com</span>.
            </p>
          </div>
          <button className="modalCloseButton" onClick={closeLevelHelpModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default LevelHelpModal;
