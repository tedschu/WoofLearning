import badge_1_1_bernese from "../../assets/badges/badge_1_1_bernese.png";
import badge_1_2_chihuahua from "../../assets/badges/badge_1_2_chihuahua.png";
import badge_1_3_waterdog from "../../assets/badges/badge_1_3_waterdog.png";
import badge_1_4_boxer from "../../assets/badges/badge_1_4_boxer.png";
import badge_1_5_husky from "../../assets/badges/badge_1_5_husky.png";
import badge_1_6_golden from "../../assets/badges/badge_1_6_golden.png";
import badge_1_7_cat from "../../assets/badges/badge_1_7_cat.png";
import badge_1_8_goldendoodle from "../../assets/badges/badge_1_8_goldendoodle.png";
import badge_2_1_borderCollie from "../../assets/badges/badge_2_1_borderCollie.png";
import badge_2_2_terrier from "../../assets/badges/badge_2_2_terrier.png";
import badge_2_3_australianShepherd from "../../assets/badges/badge_2_3_australianShepherd.png";
import badge_2_4_shibaInu from "../../assets/badges/badge_2_4_shibaInu.png";
import badge_2_5_cat from "../../assets/badges/badge_2_5_cat.png";
import badge_2_6_bernese from "../../assets/badges/badge_2_6_bernese.png";
import badge_2_7_poodle from "../../assets/badges/badge_2_7_poodle.png";
import badge_2_8_golden from "../../assets/badges/badge_2_8_golden.png";
import { UserScore, UserBadges } from "../../types/types";

//TODO: IMPORT GLOBAL STATE ("BADGE_LEVEL") AND SET CONDITIONAL TO LOAD EITHER LEVEL ONE BADGES OR LEVEL 2 BELOW

type ScoreBarProps = {
  userScore: UserScore;
  userBadges: UserBadges;
  totalScore: number;
};

function ScoreBar({ userScore, userBadges, totalScore }: ScoreBarProps) {
  return (
    <>
      <div className="scoreBarContainer">
        <div className="scoresContainer">
          {/* <div className="totalScores"> */}
          <div className="totalScore">
            <h1 className="scoreFont">{totalScore}</h1>
            <h5>TOTAL SCORE</h5>
          </div>

          <div className="individualScores">
            <h1>{userScore.addition_score}</h1>
            <h5>ADD</h5>
          </div>
          <div className="individualScores">
            <h1>{userScore.subtraction_score}</h1>
            <h5>SUBTRACT</h5>
          </div>
          <div className="individualScores">
            <h1>{userScore.multiplication_score}</h1>
            <h5>MULTIPLY</h5>
          </div>
          <div className="individualScores">
            <h1>{userScore.division_score}</h1>
            <h5>DIVIDE</h5>
          </div>
        </div>

        <div className="badgesContainer">
          <div className="eachBadge">
            <img
              src={badge_1_1_bernese}
              alt=""
              className={userBadges.bernese ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>100</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_2}
              alt=""
              className={
                userBadges.chihuahua ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_3}
              alt=""
              className={
                userBadges.chihuahua ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_boxer}
              alt=""
              className={userBadges.boxer ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>1,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_husky}
              alt=""
              className={userBadges.husky ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>250 each</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_golden}
              alt=""
              className={userBadges.golden ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>2,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_cat}
              alt=""
              className={userBadges.cat ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>500 each</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_goldendoodle_trophy}
              alt=""
              className={
                userBadges.goldendoodle_trophy
                  ? "badgeEnabled"
                  : "badgeDisabled"
              }
            />
            <h3>3,000</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBar;
