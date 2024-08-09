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
            //Re-wrote old logic here, instead of using parent?.parent?.children.find etc... Using Parent is enough to get HouseGroup.
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
