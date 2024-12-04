/*
  Warnings:

  - You are about to drop the column `Level_1_1` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_2` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_3` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_4` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_5` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_6` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_7` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_8` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_1` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_2` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_3` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_4` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_5` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_6` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_7` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_8` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_1` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_2` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_3` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_4` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_5` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_6` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_7` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_1_8` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_1` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_2` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_3` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_4` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_5` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_6` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_7` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `Level_2_8` on the `Badge_reading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Badge_math" DROP COLUMN "Level_1_1",
DROP COLUMN "Level_1_2",
DROP COLUMN "Level_1_3",
DROP COLUMN "Level_1_4",
DROP COLUMN "Level_1_5",
DROP COLUMN "Level_1_6",
DROP COLUMN "Level_1_7",
DROP COLUMN "Level_1_8",
DROP COLUMN "Level_2_1",
DROP COLUMN "Level_2_2",
DROP COLUMN "Level_2_3",
DROP COLUMN "Level_2_4",
DROP COLUMN "Level_2_5",
DROP COLUMN "Level_2_6",
DROP COLUMN "Level_2_7",
DROP COLUMN "Level_2_8",
ADD COLUMN     "badge_level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "level_1_1" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_2" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_3" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_4" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_5" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_6" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_7" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_8" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_1" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_2" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_3" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_4" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_5" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_6" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_7" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_8" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Badge_reading" DROP COLUMN "Level_1_1",
DROP COLUMN "Level_1_2",
DROP COLUMN "Level_1_3",
DROP COLUMN "Level_1_4",
DROP COLUMN "Level_1_5",
DROP COLUMN "Level_1_6",
DROP COLUMN "Level_1_7",
DROP COLUMN "Level_1_8",
DROP COLUMN "Level_2_1",
DROP COLUMN "Level_2_2",
DROP COLUMN "Level_2_3",
DROP COLUMN "Level_2_4",
DROP COLUMN "Level_2_5",
DROP COLUMN "Level_2_6",
DROP COLUMN "Level_2_7",
DROP COLUMN "Level_2_8",
ADD COLUMN     "badge_level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "level_1_1" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_2" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_3" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_4" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_5" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_6" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_7" BOOLEAN DEFAULT false,
ADD COLUMN     "level_1_8" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_1" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_2" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_3" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_4" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_5" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_6" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_7" BOOLEAN DEFAULT false,
ADD COLUMN     "level_2_8" BOOLEAN DEFAULT false;
