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
import { UserScore, UserReadingBadges, BadgeLevel } from "../../types/types";

type ScoreBarProps = {
  userScore: UserScore;
  userReadingBadges: UserReadingBadges;
  badgeLevel: BadgeLevel;
};

function ScoreBar({ userScore, userReadingBadges, badgeLevel }: ScoreBarProps) {
  return (
    <>
      <div className="scoreBarContainer">
        <div className="badgesContainer-reading">
          {/* TERNARY TO RENDER BADGES BASED ON "badgeLevel" STATE */}
          {badgeLevel.reading_level === 1 ? (
            <>
              {/* LEVEL 1 BADGES */}
              <div className="badgesSubContainer">
                {/* subContainer2 is to handle flexing for mobile devices (e.g. from row to column 2x2) */}
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_1_1_bernese}
                      alt=""
                      className={
                        userReadingBadges.badge_1_1_bernese
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>100</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_1_2_chihuahua}
                      alt=""
                      className={
                        userReadingBadges.badge_1_2_chihuahua
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>250</h3>
                  </div>
                </div>
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_1_3_waterdog}
                      alt=""
                      className={
                        userReadingBadges.badge_1_3_waterdog
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>500</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_1_4_boxer}
                      alt=""
                      className={
                        userReadingBadges.badge_1_4_boxer
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>1,000</h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* LEVEL 2 BADGES */}
              <div className="badgesSubContainer">
                {/* subContainer2 is to handle flexing for mobile devices (e.g. from row to column 2x2) */}
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_2_1_borderCollie}
                      alt=""
                      className={
                        userReadingBadges.badge_2_1_borderCollie
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>3,250</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_2_2_terrier}
                      alt=""
                      className={
                        userReadingBadges.badge_2_2_terrier
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>3,500</h3>
                  </div>
                </div>
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_2_3_australianShepherd}
                      alt=""
                      className={
                        userReadingBadges.badge_2_3_australianShepherd
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>3,750</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_2_4_shibaInu}
                      alt=""
                      className={
                        userReadingBadges.badge_2_4_shibaInu
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>4,000</h3>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SCORE CONTAINER */}
          <div className="totalScore-reading">
            <h1 className="scoreFont-reading">{userScore.reading_score}</h1>
            <h5>TOTAL SCORE</h5>
          </div>

          {/* TERNARY TO RENDER BADGES BASED ON "badgeLevel" STATE */}
          {badgeLevel.reading_level === 1 ? (
            <>
              {/* LEVEL 1 BADGES */}
              <div className="badgesSubContainer">
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_1_5_husky}
                      alt=""
                      className={
                        userReadingBadges.badge_1_5_husky
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>1,500</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_1_6_golden}
                      alt=""
                      className={
                        userReadingBadges.badge_1_6_golden
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>2,000</h3>
                  </div>
                </div>
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_1_7_cat}
                      alt=""
                      className={
                        userReadingBadges.badge_1_7_cat
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>2,500</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_1_8_goldendoodle}
                      alt=""
                      className={
                        userReadingBadges.badge_1_8_goldendoodle
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>3,000</h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* LEVEL 2 BADGES */}
              <div className="badgesSubContainer">
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_2_5_cat}
                      alt=""
                      className={
                        userReadingBadges.badge_2_5_cat
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>4,500</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_2_6_bernese}
                      alt=""
                      className={
                        userReadingBadges.badge_2_6_bernese
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>5,000</h3>
                  </div>
                </div>
                <div className="badgesSubContainer2">
                  <div className="eachBadge">
                    <img
                      src={badge_2_7_poodle}
                      alt=""
                      className={
                        userReadingBadges.badge_2_7_poodle
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>6,000</h3>
                  </div>
                  <div className="eachBadge">
                    <img
                      src={badge_2_8_golden}
                      alt=""
                      className={
                        userReadingBadges.badge_2_8_golden
                          ? "badgeEnabled"
                          : "badgeDisabled"
                      }
                    />
                    <h3>7,500</h3>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ScoreBar;
