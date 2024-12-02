const { PrismaClient } = require("@prisma/client");
const { default: test } = require("node:test");

const prisma = new PrismaClient();

let now = new Date().toISOString();

async function main() {
  console.log("seeding the database...");

  const testUser = await prisma.user.create({
    data: {
      // name: "Testuser",
      birth_year: 2014,
      email: "test@email.com",
      username: "testUser",
      password: "test",
      total_logins: 7,
      last_login: now,
      security_question_1: "test",
      security_answer_1: "test",
      security_question_2: "test",
      security_answer_2: "test",
    },
  });

  await prisma.score.create({
    data: {
      addition_score: 150,
      subtraction_score: 200,
      user_id: testUser.id,
    },
  });

  await prisma.badge.create({
    data: {
      bernese: true,
      boxer: true,
      user_id: testUser.id,
    },
  });

  await prisma.game_state.create({
    data: {
      json_setting: "difficulty: 3",
      user_id: testUser.id,
    },
  });

  await prisma.badge_reading.create({
    data: {
      bernese: true,
      boxer: true,
      user_id: testUser.id,
    },
  });

  await prisma.score_reading.create({
    data: {
      addition_score: 150,
      subtraction_score: 200,
      user_id: testUser.id,
    },
  });

  // CREATING SECOND USER
  const secondUser = await prisma.user.create({
    data: {
      // name: "Jimmy",
      birth_year: 2016,
      email: "test@email.com",
      username: "Jimmy",
      password: "test",
      total_logins: 7,
      last_login: now,
      security_question_1: "test",
      security_answer_1: "test",
      security_question_2: "test",
      security_answer_2: "test",
    },
  });

  await prisma.score.create({
    data: {
      addition_score: 780,
      subtraction_score: 1200,
      division_score: 300,
      multiplication_score: 975,
      user_id: secondUser.id,
    },
  });

  await prisma.badge.create({
    data: {
      bernese: true,
      user_id: secondUser.id,
    },
  });

  await prisma.game_state.create({
    data: {
      json_setting: "difficulty: 5",
      user_id: secondUser.id,
    },
  });
}

console.log(now);

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
