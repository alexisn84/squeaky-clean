const faker = require('faker');
const bcrypt = require('bcrypt');
const db = require('../config/connection');
const {
  User,
  Review,
  Maid,
  Schedule,
  Booking,
} = require('../models');
const { isConstValueNode } = require('graphql');

const SALT_ROUNDS = 10;

async function deleteCollections() {
  await User.deleteMany({});
  await Maid.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});
  await Schedule.deleteMany({});
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

  // create a schedule for each booking
  const schedules = [];
  maidsBooked = [];

  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const maidId = booking.maid_id;
    const bookingId = booking._id;
    const maidNum = maidsBooked.filter(k => k === maidId).length
    const today = new Date();
    // adjust workday date
    const adjDay = new Date(today.setDate(today.getDate() - maidNum));
    const scheduleDate = new Date(adjDay.getFullYear(), adjDay.getMonth(), adjDay.getDate(), 0, 0, 0);
    const startDatetime = new Date(adjDay.getFullYear(), adjDay.getMonth(), adjDay.getDate(), 10, 0, 0);
    const endDatetime = new Date(adjDay.getFullYear(), adjDay.getMonth(), adjDay.getDate(), 14, 30, 0);
    const status = booking.paymentPaid ? 'complete' : 'scheduled';

    const createdSchedule = await Schedule.create({
      scheduleDesc: ('Clean job: ' + (i + 1)),
      maid_id: maidId,
      booking_id: bookingId,
      scheduleDate: scheduleDate,
      startTime: startDatetime,
      endTime: endDatetime,
      status: status
    });


    await Booking.updateOne(
      { _id: bookingId },
      { schedule_id: createdSchedule._id }
    );
  }

  //await Schedule.collection.insertMany(schedules);

  console.log('All done!');

  process.exit(0);
});

