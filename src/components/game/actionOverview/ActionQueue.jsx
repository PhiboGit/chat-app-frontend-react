import React, { useContext, useMemo } from 'react';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import './ActionQueue.css'; // Add your CSS file for styling

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ActionQueue() {
  const { characterData } = useContext(CharacterDataContext);
  const { send } = useContext(GameDataContext);

  const actionQueue = useMemo(() => characterData.actionQueue, [characterData.actionQueue]);

  const cancelAction = (index) => {
    send({
      type: 'cancel',
      index: index, // index <= 0 is the current action, otherwise the queue index
    });
  };

  return (
    <div className="action-queue-container">
      <h2>Action Queue</h2>
      {actionQueue.map((action, index) => (
        <div key={index} className="action-item">
          <p>Task: {action.task}</p>
          <p>Action Type: {action.actionType}</p>
          <IconButton onClick={() => cancelAction(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
