import React from 'react';
import './ScrollableContainerStyle.css';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string; 
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ children, className }) => {
  return (
    <div className={`scrollable-container ${className}`}>
      {children}
    </div>
  );
};

export default ScrollableContainer;