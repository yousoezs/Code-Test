import { House } from "managers/HouseManager/HouseManager.types";

/**
 * The mocked endpoint for getting houses trough a button click.
 * The method generates random houses with random points, height and position as well as setting the id of a house.
 * The method also ensures to keep the convexity of each instanced house.
 * @returns 
 */
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
 * The method getRandomXZPos returns a randomized values for 4 points depending on the maxcoordinates.
 * The return of the method runs the method sortPointsByAngle.
 * @returns 
 */
const getRandomXZPos = () => {
  const numPoints = 4;
  const maxCoordinate = 25;
  const points: [number, number, number][] = [];

  for (let i = 0; i < numPoints; i++) {
    points.push([Math.floor(Math.random() * maxCoordinate), 0, Math.floor(Math.random() * maxCoordinate)]);
  }

  const sortedPoints = sortPointsByAngle(points);
  
  return sortedPoints;
};

/**
 * The sortPointsByAngle method returns the angleA - angleB value of a point. What happens here is it is sorting the points by their angle
 * in order to keep the convexity of the shapes.
 * @param pts 
 * @returns 
 */
const sortPointsByAngle = (pts: [number, number, number][]) => {
  const centroid = pts.reduce(([sumX, sumY, sumZ], [x, y, z]) => [sumX + x, sumY + y, sumZ + z], [0, 0, 0]);
  centroid[0] /= pts.length;
  centroid[1] /= pts.length;
  centroid[2] /= pts.length;

  return pts.sort((a, b) => {
    const angleA = Math.atan2(a[2] - centroid[2], a[0] - centroid[0]);
    const angleB = Math.atan2(b[2] - centroid[2], b[0] - centroid[0]);
    return angleA - angleB;
  });
};
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
