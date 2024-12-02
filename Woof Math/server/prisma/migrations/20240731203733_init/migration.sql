-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "addition_score" INTEGER DEFAULT 0,
    "subtraction_score" INTEGER DEFAULT 0,
    "multiplication_score" INTEGER DEFAULT 0,
    "division_score" INTEGER DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "birth_year" INTEGER NOT NULL,
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
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "bernese" BOOLEAN DEFAULT false,
    "boxer" BOOLEAN DEFAULT false,
    "cat" BOOLEAN DEFAULT false,
    "chihuahua" BOOLEAN DEFAULT false,
    "golden" BOOLEAN DEFAULT false,
    "husky" BOOLEAN DEFAULT false,
    "goldendoodle_trophy" BOOLEAN DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game_state" (
    "id" SERIAL NOT NULL,
    "json_setting" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Game_state_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_user_id_key" ON "Score"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_user_id_key" ON "Badge"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Game_state_user_id_key" ON "Game_state"("user_id");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_state" ADD CONSTRAINT "Game_state_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
