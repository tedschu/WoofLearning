-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "birth_year" INTEGER,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "security_question_1" TEXT NOT NULL,
    "security_question_2" TEXT NOT NULL,
    "security_answer_1" TEXT NOT NULL,
    "security_answer_2" TEXT NOT NULL,
    "total_logins" INTEGER NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score_math" (
    "id" SERIAL NOT NULL,
    "addition_score" INTEGER DEFAULT 0,
    "subtraction_score" INTEGER DEFAULT 0,
    "multiplication_score" INTEGER DEFAULT 0,
    "division_score" INTEGER DEFAULT 0,
    "math_L1_points" INTEGER,
    "math_L2_points" INTEGER,
    "math_L3_points" INTEGER,
    "math_L4_points" INTEGER,
    "math_L5_points" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Score_math_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge_math" (
    "id" SERIAL NOT NULL,
    "Level_1_1" BOOLEAN DEFAULT false,
    "Level_1_2" BOOLEAN DEFAULT false,
    "Level_1_3" BOOLEAN DEFAULT false,
    "Level_1_4" BOOLEAN DEFAULT false,
    "Level_1_5" BOOLEAN DEFAULT false,
    "Level_1_6" BOOLEAN DEFAULT false,
    "Level_1_7" BOOLEAN DEFAULT false,
    "Level_1_8" BOOLEAN DEFAULT false,
    "Level_2_1" BOOLEAN DEFAULT false,
    "Level_2_2" BOOLEAN DEFAULT false,
    "Level_2_3" BOOLEAN DEFAULT false,
    "Level_2_4" BOOLEAN DEFAULT false,
    "Level_2_5" BOOLEAN DEFAULT false,
    "Level_2_6" BOOLEAN DEFAULT false,
    "Level_2_7" BOOLEAN DEFAULT false,
    "Level_2_8" BOOLEAN DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_math_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score_reading" (
    "id" SERIAL NOT NULL,
    "score" INTEGER DEFAULT 0,
    "reading_L1_points" INTEGER,
    "reading_L2_points" INTEGER,
    "reading_L3_points" INTEGER,
    "reading_L4_points" INTEGER,
    "reading_L5_points" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Score_reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge_reading" (
    "id" SERIAL NOT NULL,
    "Level_1_1" BOOLEAN DEFAULT false,
    "Level_1_2" BOOLEAN DEFAULT false,
    "Level_1_3" BOOLEAN DEFAULT false,
    "Level_1_4" BOOLEAN DEFAULT false,
    "Level_1_5" BOOLEAN DEFAULT false,
    "Level_1_6" BOOLEAN DEFAULT false,
    "Level_1_7" BOOLEAN DEFAULT false,
    "Level_1_8" BOOLEAN DEFAULT false,
    "Level_2_1" BOOLEAN DEFAULT false,
    "Level_2_2" BOOLEAN DEFAULT false,
    "Level_2_3" BOOLEAN DEFAULT false,
    "Level_2_4" BOOLEAN DEFAULT false,
    "Level_2_5" BOOLEAN DEFAULT false,
    "Level_2_6" BOOLEAN DEFAULT false,
    "Level_2_7" BOOLEAN DEFAULT false,
    "Level_2_8" BOOLEAN DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_reading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Score_math_user_id_key" ON "Score_math"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_math_user_id_key" ON "Badge_math"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Score_reading_user_id_key" ON "Score_reading"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_reading_user_id_key" ON "Badge_reading"("user_id");

-- AddForeignKey
ALTER TABLE "Score_math" ADD CONSTRAINT "Score_math_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge_math" ADD CONSTRAINT "Badge_math_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score_reading" ADD CONSTRAINT "Score_reading_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge_reading" ADD CONSTRAINT "Badge_reading_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
