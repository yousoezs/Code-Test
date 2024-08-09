import House from "../../components/House";
import HouseManagerProps from "./HouseManager.types";

const HouseManager = (props: HouseManagerProps) => {
  const { houses, onClickHousePointObject } = props;

  return (
    <group name="Houses">
      {houses.map((house, index) => (
        <House
          key={index}
          {...house}
          onClickHousePointObject={(pointObject) => {
            const houseGroupObject = pointObject.parent;
            
            if (onClickHousePointObject && houseGroupObject)
              onClickHousePointObject(pointObject, houseGroupObject);
          }}
        />
      ))}
    </group>
  );
};

export default HouseManager;
