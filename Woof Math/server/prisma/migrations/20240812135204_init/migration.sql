-- CreateTable
CREATE TABLE "Score_reading" (
    "id" SERIAL NOT NULL,
    "score" INTEGER DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Score_reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge_reading" (
    "id" SERIAL NOT NULL,
    "bernese" BOOLEAN DEFAULT false,
    "boxer" BOOLEAN DEFAULT false,
    "cat" BOOLEAN DEFAULT false,
    "chihuahua" BOOLEAN DEFAULT false,
    "golden" BOOLEAN DEFAULT false,
    "husky" BOOLEAN DEFAULT false,
    "goldendoodle_trophy" BOOLEAN DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_reading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_reading_user_id_key" ON "Score_reading"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_reading_user_id_key" ON "Badge_reading"("user_id");

-- AddForeignKey
ALTER TABLE "Score_reading" ADD CONSTRAINT "Score_reading_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge_reading" ADD CONSTRAINT "Badge_reading_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
