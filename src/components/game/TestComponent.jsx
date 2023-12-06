import React, { useContext } from 'react';
import { GameDataContext } from './dataProviders/GameDataProvider';

const TestComponent = () => {
  const { gameData, charData, send } = useContext(GameDataContext);

  const handleButtonClick = () => {
    // Call the send function when the button is pressed
    send();
  };

  return (
    <div>
      <h1>Test Component</h1>
      <p>GameData: {JSON.stringify(gameData)}</p>
      <p>CharData: {JSON.stringify(charData)}</p>
      <button onClick={handleButtonClick}>Call send()</button>
    </div>
  );
};

export default TestComponent;