import {
  Euler,
  Matrix4,
  Object3D,
  Quaternion,
  Vector3,
  Vector3Tuple
} from "three";
import { useState } from "react";
import { House } from "managers/HouseManager/HouseManager.types";
import AxesHelper from "components/AxesHelper";
import CameraControls from "components/CameraControls";
import Canvas from "components/Canvas";
import Container from "components/Container";
import GridHelper from "components/GridHelper";
import HouseManager from "managers/HouseManager";
import Light from "components/Light";
import PivotControls from "components/PivotControls";

/** Constants */
const CAMERA_POSITION = [10, 10, 10] as Vector3Tuple;
const GRID_POSITION = [0, -0.001, 0] as Vector3Tuple;
const GRID_SIZE = 50;
const CONTAINER_STYLE = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#151d2c"
};
const HOUSE_INIT: House = {
  id: 0,
  points: [
    [0, 0, 0],
    [2, 0, 0],
    [20, 0, 2],
    [0, 0, 2]
  ],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  height: 2
};
const PIVOT_DEFAULT_PROPS = {
  autoTransform: false,
  depthTest: false,
  fixed: true,
  scale: 60,
  disableScaling: true,
  disableSliders: true
};

/** Variables */
const pivotMatrix = new Matrix4();
let initialPointPosition = new Vector3();
/** App */
const App = () => {
  /** States */
  const [houses, setHouses] = useState<House[]>([HOUSE_INIT]);
  const [enabledCameraControls, setEnabledCameraControls] = useState(true);
  const [selectedHouseObject, setSelectedHouseObject] = useState<Object3D>();
  const [selectedPointObject, setSelectedPointObject] = useState<Object3D>();

  /** Callbacks */
  const handleOnClickHousePointObject = (
    pointObject: Object3D,
    houseObject: Object3D
  ) => {
    pivotMatrix.copy(pointObject.matrixWorld);

    setSelectedPointObject(pointObject);
    setSelectedHouseObject(houseObject);

    initialPointPosition.setFromMatrixPosition(pointObject.matrixWorld);
  };

  /**
 * The handleOnDragPivotControls handles the pivot controls of the house as well as moving the position of the object.
 * This is done by calculating the difference between the newPointPosition and the matrix.
 * We are then storing that value named "delta".
 * The delta is then added to the selectedHouseObject.position to effectively move the entire house.
 * Afterwards we take the initialPointPosition and pivotMatrix and update their positions accordingly to have a continious alignment.
 * @param matrix The matrix passed in to control position.
 */
  const handleOnDragPivotControls = (matrix: Matrix4) => {

    if (!selectedHouseObject || !selectedPointObject) return;
    // Get the new position of the point during the drag
    const newPointPosition = new Vector3().setFromMatrixPosition(matrix);

    // Calculate the delta (difference) between the new position and the initial position
    const delta = new Vector3().subVectors(newPointPosition, initialPointPosition);

    // Apply this delta to the house's position
    selectedHouseObject.position.add(delta);

    // Update the initial position for the next frame
    initialPointPosition.copy(newPointPosition);

    // Update the pivot's matrix to follow the point's new position
    pivotMatrix.copy(selectedPointObject.matrixWorld);
  };

  const handleOnDragEndPivotControls = () => {
    setEnabledCameraControls(true);
  };

  const handleOnDragStartPivotControls = () => {
    setEnabledCameraControls(false);
  };

  const handleOnClickGetHousesFromAPI = () => {
    /** IMPLEMENT:
     * Fetch houses from an API and update the houses state.
     * URL: https://scaffcalc.com/api/houses
     * METHOD: GET
     */
    //This is to reset the values of the selected house and point.
    setSelectedHouseObject(undefined);
    setSelectedPointObject(undefined);
    fetch("https://scaffcalc.com/api/houses")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data.houses);
      });
  };

  /** Return */
  return (
    <Container style={CONTAINER_STYLE}>

      <Canvas camera={{ position: CAMERA_POSITION }}>
        <AxesHelper
        />
        <CameraControls enabled={enabledCameraControls} />
        <GridHelper position={GRID_POSITION} args={[GRID_SIZE, GRID_SIZE]} />
        <HouseManager
          houses={houses}
          onClickHousePointObject={handleOnClickHousePointObject}
        />
        <Light />
        <PivotControls
          {...PIVOT_DEFAULT_PROPS}
          enabled={!!selectedHouseObject}
          matrix={pivotMatrix}
          onDragStart={handleOnDragStartPivotControls}
          onDrag={handleOnDragPivotControls}
          onDragEnd={handleOnDragEndPivotControls}
        />
      </Canvas>
      <div style={{ position: "absolute", top: 20, left: 20, display: "flex", flexDirection: "column", gap: "1rem" }}>
        {houses.map((house, i) => (<div style={{ background: "white" }}>
          <p>House Number: {i}</p>
          <p>House Position X: {house.position[0]} Y: {house.position[1]} Z: {house.position[2]}</p>
          <p>House Rotation X: {house.rotation[0]} Y: {house.rotation[1]} Z: {house.rotation[2]}</p>
          <p>House Amount Of Points: {house.points.length}</p>
          <p>House Height: {house.height}</p>
        </div>))}
      </div>
      <button
        style={{ position: "absolute", right: 20, top: 20, height: "40px" }}
        onClick={handleOnClickGetHousesFromAPI}
      >
        GET Houses from API
      </button>
    </Container>
  );
};

export default App;
