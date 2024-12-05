import React from "react";
import { useState, useEffect } from "react";
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

function ScoreBar({ userScore, userBadges }) {
  return (
    <>
      <div className="scoreBarContainer">
        <div className="badgesContainer">
          <div className="badgesSubContainer">
            <div className="badgesSubContainer2">
              <div className="eachBadge">
                <img
                  src={badge_bernese}
                  alt=""
                  className={
                    userBadges.bernese ? "badgeEnabled" : "badgeDisabled"
                  }
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
                <h3>250</h3>
              </div>
            </div>
            <div className="badgesSubContainer2">
              <div className="eachBadge">
                <img
                  src={badge_waterdog}
                  alt=""
                  className={
                    userBadges.waterdog ? "badgeEnabled" : "badgeDisabled"
                  }
                />
                <h3>500</h3>
              </div>
              <div className="eachBadge">
                <img
                  src={badge_boxer}
                  alt=""
                  className={
                    userBadges.boxer ? "badgeEnabled" : "badgeDisabled"
                  }
                />
                <h3>1,000</h3>
              </div>
            </div>
          </div>
          {/* SCORE CONTAINER */}
          <div className="totalScore">
            <h1 className="scoreFont">{userScore.score}</h1>
            <h5>TOTAL SCORE</h5>
          </div>
          <div className="badgesSubContainer">
            <div className="badgesSubContainer2">
              <div className="eachBadge">
                <img
                  src={badge_husky}
                  alt=""
                  className={
                    userBadges.husky ? "badgeEnabled" : "badgeDisabled"
                  }
                />
                <h3>1,500</h3>
              </div>
              <div className="eachBadge">
                <img
                  src={badge_golden}
                  alt=""
                  className={
                    userBadges.golden ? "badgeEnabled" : "badgeDisabled"
                  }
                />
                <h3>2,000</h3>
              </div>
            </div>
            <div className="badgesSubContainer2">
              <div className="eachBadge">
                <img
                  src={badge_cat}
                  alt=""
                  className={userBadges.cat ? "badgeEnabled" : "badgeDisabled"}
                />
                <h3>2,500</h3>
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
        </div>
      </div>
    </>
  );
}

export default ScoreBar;
