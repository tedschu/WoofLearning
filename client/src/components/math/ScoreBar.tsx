import badge_bernese from "../assets/badges/badge_bernese.png";
import badge_chihuahua from "../assets/badges/badge_chihuahua.png";
import badge_boxer from "../assets/badges/badge_boxer.png";
import badge_husky from "../assets/badges/badge_husky.png";
import badge_golden from "../assets/badges/badge_golden.png";
import badge_cat from "../assets/badges/badge_cat.png";
import badge_goldendoodle_trophy from "../assets/badges/goldendoodle_trophy_color.png";
import { UserScore, UserBadges } from "../../types/types";

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
              src={badge_bernese}
              alt=""
              className={userBadges.bernese ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>100</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_chihuahua}
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
