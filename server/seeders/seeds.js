const faker = require('faker');
const bcrypt = require('bcrypt');
const db = require('../config/connection');
const {
  User,
  Maid,
  Review,
  Schedule,
  Rating,
  Bookings,
} = require('../models');

const SALT_ROUNDS = 10;

async function deleteCollections() {
  await User.deleteMany({});
  await Maid.deleteMany({});
  await Review.deleteMany({});
  await Schedule.deleteMany({});
<<<<<<< HEAD
  await Review.deleteMany({});
=======
}
>>>>>>> develop

db.once('open', async () => {
  await deleteCollections();

  const users = [];

  const password = await bcrypt.hash('password123', SALT_ROUNDS);

  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);

    users.push({ username, email, password });
  }

  const awesomeUsers = [
    {
      username: 'jsmith',
      email: 'jsmith@gmail.com',
      password
    },
    {
      username: 'sboucher',
      email: 'sboucher@sogou.com',
      password
    },
    {
      username: 'pmanecci',
      email: 'pmanecci@gmail.com',
      password
    },
    {
      username: 'ivydo',
      email: 'ivydo@none.com',
      password
    },
    {
      username: 'mdale',
      email: 'mdale@none.com',
      password
    }
  ];

  const createdUsers = await User.collection.insertMany([
    ...users,
    ...awesomeUsers,
  ]);

  console.log(createdUsers);

  const maids = [];

  for (let i = 0; i < 20; i += 1) {
    let name;
    let nameArr;

    do {
      name = faker.name.findName();
      nameArr = name.split(' ');
    } while (nameArr.length != 2)

    maids.push({ name, password });
  }

  const createdMaids = await Maid.collection.insertMany(maids);

  for (let i = 0; i < 50; i++) {
    const reviewText = faker.random.words(10);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const randomMaidIndex = Math.floor(Math.random() * createdMaids.insertedCount);
    const randomMaidId = createdMaids.insertedIds[randomMaidIndex];
    const rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    const createdReview = await Review.create({
      reviewText: reviewText,
      maidId: randomMaidId,
      rating: rating,
      createdAt: Date.now(),
      createdBy: createdUsers.insertedIds[randomUserIndex],
    });

<<<<<<< HEAD
  const createdSchedules = await Schedule.collection.insertMany(scheduleData);
  
  // create reviews
  let reviewData = [];
  for (let i = 0; i < 50; i++) {
    const reviewText = faker.lorem.words(Math.round(Math.random() * 50) + 1);

    const randomMaidIndex = Math.floor(Math.random() * maidData.length);
    const maid = maidData[randomMaidIndex];
    
    const rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    const createdReview = await Review.create({ reviewText: reviewText, maidName: maid.name, rating: rating });

    const updatedMaid = await Maid.updateOne(
      { _id: maid._id },
      { $push: { reviews: createdReview } }
    );
    reviewData.push(createdReview);
  }

  //const createdReviews = await Review.collection.insertMany(reviewData);
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
=======
    await Maid.updateOne(
      { _id: randomMaidId },
      { $push: { reviews: createdReview } }
>>>>>>> develop
    );
  }

  const schedules = [];

  for (let i = 0; i < 20; i += 1) {
    const randomMaidIndex = Math.floor(Math.random() * maids.length);

    schedules.push({
      // TODO: Probably want to associate Schedules to Maids by maid._id and not maid.name
      maidName: maids[randomMaidIndex].name,
      date: Date.now(),
      slots: [
        { start: 10, finish: 12 },
        { start: 14, finish: 17 },
      ],
    });
  }

  await Schedule.collection.insertMany(schedules);

  //MAIDS
  // const maidSeed = [
  //   {
  //     name: 'Bubbly Brenda',
  //     email: 'bbrenda@squeakyclean.com',
  //     review_id: [1, 6, 11]
  //   },
  //   {
  //     name: 'Cleaning Cindy',
  //     email: 'ccindy@squeakyclean.com',
  //     review_id: [2, 7, 13]
  //   },
  //   {
  //     name: 'Sparkling Sarah',
  //     email: 'ssarah@squeakyclean.com',
  //     review_id: [3, 8, 14]
  //   },
  //   {
  //     name: 'Mopping Mary',
  //     email: 'mmary@squeakyclean.com',
  //     review_id: [4, 9, 14]
  //   },
  //   {
  //     name: 'Dust-Away Daryl',
  //     email: 'ddaryl@squeakyclean.com',
  //     review_id: [5, 10, 15]
  //   },
  // ];

  // await Maid.collection.insertMany(maidSeed);

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

  console.log('All done!');

  process.exit(0);
});

