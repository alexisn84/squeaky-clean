const faker = require('faker');
const bcrypt = require('bcrypt');
const db = require('../config/connection');
const {
  User,
  Review,
  Maid,
  UserRating,
  Booking,
} = require('../models');

const SALT_ROUNDS = 10;

async function deleteCollections() {
  await User.deleteMany({});
  await Maid.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});
  //await UserRating.deleteMany({});
  //await Schedule.deleteMany({});
}

db.once('open', async () => {
  await deleteCollections();


  /*************/
  /*  USERS    */
  /*************/

  const users = [];

  const password = await bcrypt.hash('password123', SALT_ROUNDS);

  for (let i = 0; i < 50; i += 1) {
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


  /*************/
  /*  MAIDS    */
  /*************/

  const maids = [];

  for (let i = 0; i < 20; i += 1) {
    let name;
    let nameArr;

    do {
      name = faker.name.findName();
      nameArr = name.split(' ');
    } while (nameArr.length != 2)

    const email = faker.internet.email(nameArr[0]);
    
    maids.push({ name, email, password });
  }
  const maidSeed = [
    {
      name: 'Bubbly Brenda',
      email: 'bbrenda@squeakyclean.com',
      password

    },
    {
      name: 'Cleaning Cindy',
      email: 'ccindy@squeakyclean.com',
      password
    },
    {
      name: 'Sparkling Sarah',
      email: 'ssarah@squeakyclean.com',
      password
    },
    {
      name: 'Mopping Mary',
      email: 'mmary@squeakyclean.com',
      password
    },
    {
      name: 'Dust-Away Daryl',
      email: 'ddaryl@squeakyclean.com',
      password
    },
  ];

  const createdMaids = await Maid.collection.insertMany([
    ...maids,
    ...maidSeed
  ]);


  /****************/
  /*  BOOKINGS    */
  /****************/

  const bookings = [];
  const city = 'Orlando';
  const state = 'FL';
  const zips = [32789, 32804, 32808,
    32812, 32824, 32801, 32805, 32809,
    32814, 32827, 32802, 32806, 32810,
    32819, 32829, 32803, 32807, 32811,
    32822, 32832];

  for (let i = 0; i < 100; i++) {
    const streetAddr = faker.address.streetAddress();
    const randomZipIndex = Math.floor(Math.random() * zips.length);
    const locationAddr = streetAddr + ", Orlando, FL " + zips[randomZipIndex];

    const randomUserIndex = Math.floor(Math.random() * createdUsers.insertedCount);
    const randomUserId = createdUsers.insertedIds[randomUserIndex];
    const randomMaidIndex = Math.floor(Math.random() * createdMaids.insertedCount);
    const randomMaidId = createdMaids.insertedIds[randomMaidIndex];
    const payAmnt = (Math.floor(Math.random() * 4) * 200);
    const paid = payAmnt > 0 ? true : false;
    const createDt = faker.date.between('2022-03-01', '2022-03-21');
    const booking = {
      bookingLocation: locationAddr,
      user_id: randomUserId,
      maid_id: randomMaidId,
      paymentPaid: paid,
      paymentAmount: payAmnt,
      createdAt: createDt
    }

    const createdBooking = await Booking.create(booking);
    booking._id = createdBooking._id;

    await Maid.updateOne(
      { _id: randomMaidId },
      { $push: { bookings: createdBooking } }
    );
    await User.updateOne(
      { _id: randomUserId },
      { $push: { bookings: createdBooking } }
    );

    bookings.push(booking);
  }


  /***************/
  /*  REVIEWS    */
  /***************/

  for (let i = 0; i < 50; i++) {
    let reviewText;
    do {
      reviewText = faker.random.words(Math.floor(Math.random() * 50));
    } while (reviewText.length <= 10 || reviewText.length >= 1000);

    let maidId;
    let userId;
    let bookingId;
    let paid;
    do {
      // get a random Booking
      const randomBookingIndex = Math.floor(Math.random() * bookings.length);
      const { _id, user_id, maid_id, paymentPaid } = bookings[randomBookingIndex];
      paid = paymentPaid;
      userId = user_id;
      maidId = maid_id;
      bookingId = _id;
    } while (!paid)
    const rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    const createdReview = await Review.create({
      reviewText: reviewText,
      createdForMaid_id: maidId,
      createdByUser_id: userId,
      booking_id: bookingId,
      serviceRating: rating,
      createdAt: Date.now(),
    });

    await Booking.updateOne(
      { _id: bookingId },
      { review: createdReview }
    );
    await Maid.updateOne(
      { _id: maidId },
      { $push: { reviews: createdReview } }
    );
    await User.updateOne(
      { _id: userId },
      { $push: { reviews: createdReview } }
    );
  }
/*
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
*/
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

