import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";



const Rate = () => {
  const [rate, setRate] = useState(0);
  const activeStar ={
    fill: 'rgb(66,135,245)'
  };
  
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
                alert(`Are you sure you want to give ${givenRating} stars ?`);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "rgb(66,135,245)"
                    : "rgb(189, 216, 219)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;

//potential code to figure out rating average....
// getUserRating = () => {
//     const sum = (accumulator, currentValue) => accumulator + currentValue;
//     const ratingsArr = this.props.showUser.reviews.map(reviewObj => reviewObj.rating)
//       return ratingsArr.reduce(sum) / ratingsArr.length
//   }