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
            <h1>{userScore.math_addition_score}</h1>
            <h5>ADD</h5>
          </div>
          <div className="individualScores">
            <h1>{userScore.math_subtraction_score}</h1>
            <h5>SUBTRACT</h5>
          </div>
          <div className="individualScores">
            <h1>{userScore.math_multiplication_score}</h1>
            <h5>MULTIPLY</h5>
          </div>
          <div className="individualScores">
            <h1>{userScore.math_division_score}</h1>
            <h5>DIVIDE</h5>
          </div>
        </div>

        <div className="badgesContainer">
          <div className="eachBadge">
            <img
              src={badge_1_1_bernese}
              alt=""
              className={
                userBadges.badge_1_1_bernese ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>100</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_2_chihuahua}
              alt=""
              className={
                userBadges.badge_1_2_chihuahua
                  ? "badgeEnabled"
                  : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_3_waterdog}
              alt=""
              className={
                userBadges.badge_1_3_waterdog ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_4_boxer}
              alt=""
              className={
                userBadges.badge_1_4_boxer ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>1,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_5_husky}
              alt=""
              className={
                userBadges.badge_1_5_husky ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>250 each</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_6_golden}
              alt=""
              className={
                userBadges.badge_1_6_golden ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>2,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_7_cat}
              alt=""
              className={
                userBadges.badge_1_7_cat ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500 each</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_1_8_goldendoodle}
              alt=""
              className={
                userBadges.badge_1_8_goldendoodle
                  ? "badgeEnabled"
                  : "badgeDisabled"
              }
            />
            <h3>3,000</h3>
          </div>
          {/* TODO: ADD A CONDITIONAL HERE TO DISPLAY THE ABOVE BLOCK OR BELOW BASED ON BADGE_LEVEL STATE */}
          <div className="eachBadge">
            <img
              src={badge_2_1_borderCollie}
              alt=""
              className={
                userBadges.badge_2_1_borderCollie
                  ? "badgeEnabled"
                  : "badgeDisabled"
              }
            />
            <h3>100</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_2_terrier}
              alt=""
              className={
                userBadges.badge_2_2_terrier ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_3_australianShepherd}
              alt=""
              className={
                userBadges.badge_2_3_australianShepherd
                  ? "badgeEnabled"
                  : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_4_shibaInu}
              alt=""
              className={
                userBadges.badge_2_4_shibaInu ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>1,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_5_cat}
              alt=""
              className={
                userBadges.badge_2_5_cat ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>250 each</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_6_bernese}
              alt=""
              className={
                userBadges.badge_2_6_bernese ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>2,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_7_poodle}
              alt=""
              className={
                userBadges.badge_2_7_poodle ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500 each</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_2_8_golden}
              alt=""
              className={
                userBadges.badge_2_8_golden ? "badgeEnabled" : "badgeDisabled"
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
