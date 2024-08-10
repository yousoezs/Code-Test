import React from 'react';
import './CurrentHouseStyle.css';

interface HousePosition {
    x?: number;
    y?: number;
    z?: number;
  }
  
  interface HouseRotation {
    x?: number;
    y?: number;
    z?: number;
  }
  
  interface House {
    id?: number;
    position?: HousePosition;
    rotation?: HouseRotation;
    height?: number;
  }
  
  interface CurrentHouseDisplayProps {
    house: House;
  }

const CurrentHouseDisplay: React.FC<CurrentHouseDisplayProps> = ({ house }) => {
  return (
    <div className="current-house">
      <h2>Current House Details</h2>
      <p>House ID: {house.id ?? 'N/A'}</p>
      <p>
        Position: X: {house.position?.x ?? 'N/A'} Y: {house.position?.y ?? 'N/A'} Z: {house.position?.z ?? 'N/A'}
      </p>
      <p>
        Rotation: X: {house.rotation?.x ?? 'N/A'} Y: {house.rotation?.y ?? 'N/A'} Z: {house.rotation?.z ?? 'N/A'}
      </p>
      <p>Height: {house.height ?? 'N/A'}</p>
    </div>
  );
};

export default CurrentHouseDisplay;