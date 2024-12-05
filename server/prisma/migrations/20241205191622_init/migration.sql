/*
  Warnings:

  - You are about to drop the column `level_1_1` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_2` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_3` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_4` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_5` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_6` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_7` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_8` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_1` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_2` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_3` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_4` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_5` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_6` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_7` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_8` on the `Badge_math` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_1` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_2` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_3` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_4` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_5` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_6` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_7` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_1_8` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_1` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_2` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_3` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_4` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_5` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_6` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_7` on the `Badge_reading` table. All the data in the column will be lost.
  - You are about to drop the column `level_2_8` on the `Badge_reading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Badge_math" DROP COLUMN "level_1_1",
DROP COLUMN "level_1_2",
DROP COLUMN "level_1_3",
DROP COLUMN "level_1_4",
DROP COLUMN "level_1_5",
DROP COLUMN "level_1_6",
DROP COLUMN "level_1_7",
DROP COLUMN "level_1_8",
DROP COLUMN "level_2_1",
DROP COLUMN "level_2_2",
DROP COLUMN "level_2_3",
DROP COLUMN "level_2_4",
DROP COLUMN "level_2_5",
DROP COLUMN "level_2_6",
DROP COLUMN "level_2_7",
DROP COLUMN "level_2_8",
ADD COLUMN     "badge_1_1_bernese" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_2_chihuahua" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_3_waterdog" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_4_boxer" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_5_husky" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_6_golden" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_7_cat" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_8_goldendoodle" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_1_borderCollie" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_2_terrier" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_3_australianShepherd" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_4_shibaInu" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_5_cat" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_6_bernese" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_7_poodle" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_8_golden" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Badge_reading" DROP COLUMN "level_1_1",
DROP COLUMN "level_1_2",
DROP COLUMN "level_1_3",
DROP COLUMN "level_1_4",
DROP COLUMN "level_1_5",
DROP COLUMN "level_1_6",
DROP COLUMN "level_1_7",
DROP COLUMN "level_1_8",
DROP COLUMN "level_2_1",
DROP COLUMN "level_2_2",
DROP COLUMN "level_2_3",
DROP COLUMN "level_2_4",
DROP COLUMN "level_2_5",
DROP COLUMN "level_2_6",
DROP COLUMN "level_2_7",
DROP COLUMN "level_2_8",
ADD COLUMN     "badge_1_1_bernese" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_2_chihuahua" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_3_waterdog" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_4_boxer" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_5_husky" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_6_golden" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_7_cat" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_1_8_goldendoodle" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_1_borderCollie" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_2_terrier" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_3_australianShepherd" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_4_shibaInu" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_5_cat" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_6_bernese" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_7_poodle" BOOLEAN DEFAULT false,
ADD COLUMN     "badge_2_8_golden" BOOLEAN DEFAULT false;
