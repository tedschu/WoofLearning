// Section 1: Core data types used as props across multiple components

// in App.tsx
export type UserScore = {
  addition_score: number;
  subtraction_score: number;
  multiplication_score: number;
  division_score: number;
};

export type UserBadges = {
  bernese: boolean;
  boxer: boolean;
  cat: boolean;
  chihuahua: boolean;
  golden: boolean;
  husky: boolean;
  goldendoodle_trophy: boolean;
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
  | "boxer"
  | "husky"
  | "golden"
  | "cat"
  | "goldendoodle_trophy"
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
};
