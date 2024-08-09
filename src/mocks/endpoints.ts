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
 * @returns 
 */
const getRandomXZPos = () => {

  const maxPoints = 4;
  const tempRandomVal = [];
  for(let j = 0; j < maxPoints; j++) {
    const randomXPos = Math.floor(Math.random() * 25);
    const randomZPos = Math.floor(Math.random() * 25);

    tempRandomVal.push([randomXPos, 0, randomZPos]);
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
