// Section 1: Core data types used as props across multiple components

import React, { SetStateAction } from "react";

// in App.tsx
export type UserScore = {
  addition_score: number;
  subtraction_score: number;
  multiplication_score: number;
  division_score: number;
  reading_score: number;
  math_L1_points: number;
  math_L2_points: number;
  math_L3_points: number;
  math_L4_points: number;
  math_L5_points: number;
  reading_L1_points: number;
  reading_L2_points: number;
  reading_L3_points: number;
  reading_L4_points: number;
  reading_L5_points: number;
};

export type BadgeLevel = {
  math_level: number;
  reading_level: number;
};

export type BadgeProgress = {
  math_badges: number;
  reading_badges: number;
};

export type UserMathBadges = {
  badge_1_1_bernese: boolean;
  badge_1_2_chihuahua: boolean;
  badge_1_3_waterdog: boolean;
  badge_1_4_boxer: boolean;
  badge_1_5_husky: boolean;
  badge_1_6_golden: boolean;
  badge_1_7_cat: boolean;
  badge_1_8_goldendoodle: boolean;
  badge_2_1_borderCollie: boolean;
  badge_2_2_terrier: boolean;
  badge_2_3_australianShepherd: boolean;
  badge_2_4_shibaInu: boolean;
  badge_2_5_cat: boolean;
  badge_2_6_bernese: boolean;
  badge_2_7_poodle: boolean;
  badge_2_8_golden: boolean;
  badge_level: number;
};

export type UserReadingBadges = {
  badge_1_1_bernese: boolean;
  badge_1_2_chihuahua: boolean;
  badge_1_3_waterdog: boolean;
  badge_1_4_boxer: boolean;
  badge_1_5_husky: boolean;
  badge_1_6_golden: boolean;
  badge_1_7_cat: boolean;
  badge_1_8_goldendoodle: boolean;
  badge_2_1_borderCollie: boolean;
  badge_2_2_terrier: boolean;
  badge_2_3_australianShepherd: boolean;
  badge_2_4_shibaInu: boolean;
  badge_2_5_cat: boolean;
  badge_2_6_bernese: boolean;
  badge_2_7_poodle: boolean;
  badge_2_8_golden: boolean;
  badge_level: number;
};

export type UserInfo = {
  id: string;
  username: string;
  email: string;
  password?: string;
  security_question_1: string;
  security_answer_1: string;
  security_question_2: string;
  security_answer_2: string;
  [key: string]: string | undefined; // Index signature
};

export type UserChallengeResults = {
  user_id: number;
  math_type: GameSelectorType;
  level: number;
  points_added: number;
  questions_attempted: number;
  questions_correct: number;
  incorrect_question: IncorrectQuestion[];
};

export type IncorrectQuestion = {
  equation: string;
};

export type CurrentApp = "Woof Math" | "Woof Reading" | "Woof Learning" | "";

// in Game.tsx
export type GameSelectorType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";
export type ModalBadgeType =
  | "badge_1_1_bernese"
  | "badge_1_2_chihuahua"
  | "badge_1_3_waterdog"
  | "badge_1_4_boxer"
  | "badge_1_5_husky"
  | "badge_1_6_golden"
  | "badge_1_7_cat"
  | "badge_1_8_goldendoodle"
  | "badge_2_1_borderCollie"
  | "badge_2_2_terrier"
  | "badge_2_3_australianShepherd"
  | "badge_2_4_shibaInu"
  | "badge_2_5_cat"
  | "badge_2_6_bernese"
  | "badge_2_7_poodle"
  | "badge_2_8_golden"
  | "";

// Section 2: Component props

export type GameProps = {
  isLoggedIn: boolean;
  userScore: UserScore;
  setUserScore: React.Dispatch<React.SetStateAction<UserScore>>;
  userMathBadges: UserMathBadges;
  userReadingBadges: UserReadingBadges;
  setUserMathBadges: React.Dispatch<React.SetStateAction<UserMathBadges>>;
  setUserReadingBadges: React.Dispatch<React.SetStateAction<UserReadingBadges>>;
  userInfo: UserInfo;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  badgeLevel: BadgeLevel;
  setBadgeLevel: React.Dispatch<React.SetStateAction<BadgeLevel>>;
  badgeProgress: BadgeProgress;
  setBadgeProgress: React.Dispatch<React.SetStateAction<BadgeProgress>>;
  currentApp: CurrentApp;
  setCurrentApp: React.Dispatch<React.SetStateAction<CurrentApp>>;
};

export type GameTimedChallengeProps = {
  isTimedChallegeModalOpen: boolean;
  setIsTimedChallengeModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setGameSelector: React.Dispatch<React.SetStateAction<GameSelectorType>>;
  setGotRight: React.Dispatch<React.SetStateAction<boolean>>;
  setGotWrong: React.Dispatch<React.SetStateAction<boolean>>;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  sliderValue: number;
  userScore: UserScore;
  setUserScore: React.Dispatch<React.SetStateAction<UserScore>>;
  userInfo: UserInfo;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  gotRight: boolean;
  gotWrong: boolean;
  userMathBadges: UserMathBadges;
  setUserMathBadges: React.Dispatch<React.SetStateAction<UserMathBadges>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalBadge: ModalBadgeType;
  setModalBadge: React.Dispatch<React.SetStateAction<ModalBadgeType>>;
  badgeLevel: BadgeLevel;
  setBadgeLevel: React.Dispatch<React.SetStateAction<BadgeLevel>>;
  badgeProgress: BadgeProgress;
  setBadgeProgress: React.Dispatch<React.SetStateAction<BadgeProgress>>;
  gameSelector: GameSelectorType;
};

export type StoryType = "story" | "poem" | "ballad";

export type StorySelectorProps = {
  storyPrompt: string;
  setStoryPrompt: React.Dispatch<SetStateAction<string>>;
  setStoryType: React.Dispatch<SetStateAction<StoryType>>;
  storyType: StoryType;
};

// Section 3: Reading site state
export type StoryResponseData = {
  title: string;
  body: string;
  question_1: string;
  question_2: string;
  question_3: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
};

export type EvaluationData = {
  is_correct_1: string;
  feedback_1: string;
  is_correct_2: string;
  feedback_2: string;
  is_correct_3: string;
  feedback_3: string;
  score: string;
};
