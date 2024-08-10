import { House } from "managers/HouseManager/HouseManager.types";


export const getHousesGenerator: () => House[] = () => {

  const amountOfHouses = getRandomVal(10);
  const randomHouseVal = amountOfHouses ? amountOfHouses : 1;

  const houses = [];
  for (let i = 0; i < randomHouseVal; i++) {

    const pointsRandomVal = getRandomXZPos();
    const houseRandomValRot = [0, Math.floor(Math.random() * 360), 0];

    const maxRandHeight = 20;
    const randomHeight = getRandomVal(maxRandHeight);

    const house = {
      id: i,
      points: pointsRandomVal,
      position: pointsRandomVal[0],
      rotation: houseRandomValRot,
      height: randomHeight,
    } as House;
    houses.push(house);
  }

  return houses;
};

/**
 * The method getRandomXZPos returns random X and Z values for the position of the house as well as for the points.
 * The method will also try and convex the shapes of the buildings.
 * @returns "tempRandomVal of type [][]"
 */
const getRandomXZPos = () => {

  const maxPoints = 4;
  const tempRandomVal = [];
  let previousXVal = 0;
  let previousZVal = 0;
  for (let i = 0; i < maxPoints; i++) {

    const randomXPos = Math.floor(Math.random() * 25);
    const randomZPos = Math.floor(Math.random() * 25);

    if (i === maxPoints - 1) {
      let newRandXPos = 0;
      let newRandZPos = 0;
      if (randomXPos < previousXVal) {
        newRandXPos = randomXPos > previousXVal ? Math.floor(Math.random() * 25) : 0;
        if (newRandXPos === 0) continue;
      }
      if (randomZPos < previousZVal) {
        newRandZPos = randomZPos > previousZVal ? Math.floor(Math.random() * 25) : 0;
        if (newRandZPos === 0) continue;
      }
      tempRandomVal.push([newRandXPos, 0, newRandZPos]);
      return tempRandomVal;
    }
    tempRandomVal.push([randomXPos, 0, randomZPos]);
    previousXVal = randomXPos;
    previousZVal = randomZPos;
  }
  return tempRandomVal;
}
/**
 * The method getRandomVal simply returns a random value of a maximum that has been inserted. Example
 * If you insert value 100 in the parameter you would get a value from 0-100.
 * @param maxVal
 * @returns 
 */
const getRandomVal = (maxVal: number): number => {
  const newVal = Math.floor(Math.random() * maxVal)
  return newVal;
}
