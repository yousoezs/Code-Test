import { House } from "managers/HouseManager/HouseManager.types";

export const getHousesGenerator: () => House[] = () => {

  const maxHouses = 10;
  const amountOfHouses = Math.floor(Math.random() * maxHouses);
  const randomHouseVal = amountOfHouses ? amountOfHouses : 1;

  const houses = [];
  for (let i = 0; i < randomHouseVal; i++) {

    const maxPoints = 4;
    const pointsRandomVal = []
    const houseRandomValRot = [0, Math.floor(Math.random() * 360), 0];
    const maxRandHeight = 20;
    const randomHeight = Math.floor(Math.random() * maxRandHeight);

    for(let j = 0; j < maxPoints; j++) {
      const randomXPos = Math.floor(Math.random() * 25);
      const randomZPos = Math.floor(Math.random() * 25);

      pointsRandomVal.push([randomXPos, 0, randomZPos]);
    }

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
