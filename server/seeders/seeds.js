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
  //Hard code seeds to test and demo with

//USERS
const userSeed = [
  {
      username: 'jsmith',
      email: 'jsmith@gmail.com',
      password: 'password123'
  },
  {
      username: 'sboucher',
      email: 'sboucher@sogou.com',
      password: 'password123'
  },
  {
      username: 'pmanecci',
      email: 'pmanecci@gmail.com',
      password: 'password123'
  },
  {
      username: 'ivydo',
      email: 'ivydo@none.com',
      password: 'password123'
  },
  {
      username: 'mdale',
      email: 'mdale@none.com',
      password: 'password123'
  }
];
await User.collection.insertMany(userSeed)

//MAIDS
const maidSeed = [
  {
      name: 'Bubbly Brenda',
      password: "test123",
      email: 'bbrenda@squeakyclean.com',
      review_id: [1, 6, 11]
  },
  {
      name: 'Cleaning Cindy',
      password: "test1234",
      email: 'ccindy@squeakyclean.com',
      review_id: [2, 7, 13]
  },
  {
      name: 'Sparkling Sarah',
      password: "test12345",
      email: 'ssarah@squeakyclean.com',
      review_id: [3, 8, 14]
  },
  {
      name: 'Mopping Mary',
      password: "test123456",
      email: 'mmary@squeakyclean.com',
      review_id: [4, 9, 14]
  },
  {
      name:'Dust-Away Daryl',
      password: "test1234567",
      email: 'ddaryl@squeakyclean.com',
      review_id: [5, 10, 15]
  }
];
await Maid.collection.insertMany(maidSeed);

//SCHEDULES

//REVIEWS
// const reviewSeed = [
//   {
//       title: 'Happiness from cleaning',
//       review_text: 'The objective of cleaning is not just to clean, but to feel happiness living within that environment.',
//       user_id: 623627290967569714190652,
//       maid_id: '62362729096756971419065a'
//   },
//   {
//       title: 'Cleanliness',
//       review_text: 'Nothing inspires cleanliness more than an unexpected guest.',
//       user_id: 623627290967569714190653,
//       maid_id: 623627290967569714190659
//   },
//   {
//       title: 'Dreams of a Clean House',
//       review_text: 'We dream of having a clean house — but who dreams of actually doing the cleaning?',
//       user_id: 623627290967569714190654,
//       maid_id: '62362729096756971419065b'
//   },
//   {
//       title: 'No Secrets',
//       review_text: 'I make no secret of the fact that I would rather lie on a sofa than sweep beneath it.',
//       user_id: 623627290967569714190655,
//       maid_id: '62362729096756971419065c'
//   },
//   {
//       title: 'Cleaning can kill',
//       review_text: "Housework can't kill you, but why take the chance?",
//       user_id: 623627290967569714190656,
//       maid_id: 623627290967569714190658
//   },
//   {
//       title: 'Excellent Cleaning',
//       review_text: 'The quality of cleaning is excellent. They are dependable. ',
//       user_id: 623627290967569714190652,
//       maid_id: "62362729096756971419065a"
//   },
//   {
//       title: 'Professional Cleaning',
//       review_text: "They are efficient, professional, and affordable. Thanks to all!",
//       user_id: 623627290967569714190653,
//       maid_id: '62362729096756971419065b'
//   },
//   {
//       title: 'Thorough Cleaning',
//       review_text: "They are very thorough and always ask if there is anything else they can do",
//       user_id: 623627290967569714190654,
//       maid_id: '62362729096756971419065c'
//   },
//   {
//       title: 'Outstanding Service',
//       review_text: "The service was outstanding, exceptional, reliable, dependable, and extremely professional.",
//       user_id: 623627290967569714190655,
//       maid_id: 623627290967569714190658
//   },
//   {
//       title: 'Diligent worker',
//       review_text: "Daryl worked diligently and continually asked questions to clarify what I wanted..",
//       user_id: 623627290967569714190656,
//       maid_id: 623627290967569714190659
//   },
//   {
//       title: 'convenience extrdanaire',
//       review_text: ' they came by on relatively short notice, and on a holiday, no less. This is an excellent cleaning service and customer service!  ',
//       user_id: 623627290967569714190652,
//       maid_id: '62362729096756971419065b'
//   },
//   {
//       title: 'Great idea including housekeeping in the rent',
//       review_text: "The cleaning itself was very, very thorough; hardwood floors are gleaming clean by the time she is done! ",
//       user_id: 623627290967569714190653,
//       maid_id: '62362729096756971419065c'
//   },
//   {
//       title: 'Never leaving this complex',
//       review_text: "Great job with kitchen (fridge or oven upon request, but they did some dishes I accidentally left in the sink, and took out the trash!), bathroom, floors (moved all the furniture), ",
//       user_id: 623627290967569714190654,
//       maid_id: 623627290967569714190658
//   },
//   {
//       title: 'Great cleaning and availability',
//       review_text: "hey did a wonderful job of vaccuuming, cleaning the bathrooms and kitchen, making the bed, everything. There were a few sneaky corners with cobwebs missed, ",
//       user_id: 623627290967569714190655,
//       maid_id: 623627290967569714190659
//   },
//   {
//       title: 'so nice to come home and sparkling clean',
//       review_text: " They bring everything they need and when they leave the house sparkles--baseboards, window sills, everything.  also exceeded my expectations by airing out the rugs and doormat",
//       user_id: 623627290967569714190656,
//       maid_id: '62362729096756971419065a'
//   }
  
// ];
// await Review.collection.insertMany({ reviewSeed });

  process.exit(0);
});

