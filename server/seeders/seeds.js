const faker = require('faker');
const { isConstValueNode } = require('graphql');

const db = require('../config/connection');
const { User, Review, Maid, Rating, Schedule, Bookings } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Maid.deleteMany({});
  await Schedule.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 100; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create maid data
  const maidData = [];

  for (let i = 0; i < 50; i += 1) {
    let name;
    let nameArr;
    do {
      name = faker.name.findName();
      nameArr = name.split(' ');
    } while (nameArr.length != 2)
    const password = nameArr[0] + '123';

    maidData.push({ name, password });
  }

  

  const createdMaids = await Maid.collection.insertMany(maidData);

  // create schedules
  const scheduleData = [];

  for (let i = 0; i < 20; i += 1) {
    const randomMaidIndex = Math.floor(Math.random() * maidData.length);
    scheduleData.push({ maidName: maidData[randomMaidIndex].name, date: Date.now(), slots: [{start: 10, finish: 12}, {start: 14, finish:17}] });
  }

  const createdSchedules = await Schedule.collection.insertMany(scheduleData);
/*  
  // create reviews
  let createdReviews = [];
  for (let i = 0; i < 20; i += 1) {
    const reviewText = faker.lorem.words(Math.round(Math.random() * 100) + 1);

    const randomMaidIndex = Math.floor(Math.random() * maidData.length);
    const maid = maidData[randomMaidIndex];

    const createdReview = await Review.create({ reviewText, name });

    const updatedMaid = await Maid.updateOne(
      { _id: maidId },
      { $push: { reviews: createdReview._id } }
    );

    createdReviews.push(createdReview);
  }
/*
  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
    const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

    await Thought.updateOne(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }
*/
  console.log('all done!');
  process.exit(0);
});

