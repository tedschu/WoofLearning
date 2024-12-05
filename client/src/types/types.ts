// Section 1: Core data types used as props across multiple components

// in App.tsx
export type UserScore = {
  addition_score: number;
  subtraction_score: number;
  multiplication_score: number;
  division_score: number;
  reading_score: number;
};

export type BadgeLevel = {
  math_level: number;
  reading_level: number;
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

// in Game.tsx
export type GameSelectorType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";
export type ModalBadgeType =
  | "bernese"
  | "chihuahua"
  | "waterdog"
  | "boxer"
  | "husky"
  | "golden"
  | "cat"
  | "goldendoodle_trophy"
  | "borderCollie"
  | "terrier"
  | "australianShepherd"
  | "shibaInu"
  | "cat2"
  | "bernese2"
  | "poodle"
  | "goldendoodleTrophy2"
  | "";

// Section 2: Component props

export type GameProps = {
  isLoggedIn: boolean;
  userScore: UserScore;
  setUserScore: React.Dispatch<React.SetStateAction<UserScore>>;
  userBadges: UserBadges;
  setUserBadges: React.Dispatch<React.SetStateAction<UserBadges>>;
  userInfo: UserInfo;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  badgeLevel: BadgeLevel;
};
