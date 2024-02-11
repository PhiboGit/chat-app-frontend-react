import React, { useContext, useState, useMemo, useEffect } from 'react';
import { GameDataContext } from '../dataProviders/GameDataProvider';
import { CharacterDataContext } from '../dataProviders/CharacterDataProvider';
import ExpBar from '../ExpBar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';


import { Typography } from '@mui/material';
import ProfessionIcon from './ProfessionIcon';
import NodeIcon from './NodeIcon';


const RegionOverview = ({regionName}) => {
  const { gameData, send } = useContext(GameDataContext);
  const { characterData } = useContext(CharacterDataContext);

  const region = gameData.regionData[regionName]

  const [selectedNodes, setSelectedNodes] = useState([])

  const toggleNodeSelection = (nodeInfo) => {
    setSelectedNodes(prevSelectedNodes => {
      if (prevSelectedNodes.some(node => node.node === nodeInfo.node)) {
        return prevSelectedNodes.filter(node => node !== nodeInfo);
      } else {
        return [...prevSelectedNodes, nodeInfo];
      }
    });
  };

  
  const getTravelTime = () => {
    const totalWeight = region.totalWeight 
    const travelCost = region.travelCost
    const selectedWeight = selectedNodes
      .reduce((sum, entry) => sum + entry.weight, 0); 
  
    const notCovered = totalWeight - selectedWeight
    
    const totalTravelTime = travelCost * notCovered
  
    return totalTravelTime
  }

  const onChangeIterations = (nodeName, iterations) => {
    setSelectedNodes(prev => {
      const node = prev.find((nodeInfo) => nodeInfo.node === nodeName)
      if (node){
        node["iterations"] = Number.parseInt(iterations)
        return prev
      }
    })
  }

  const onStart = () => {
    console.log("onStart: ", selectedNodes)

    const nodes = selectedNodes.map(node => ({node: node.node, iterations: node.iterations}))

    const action = {
      "type": "region_action",
        "task": "gathering",
      "args": {
        "limit": true,
        "region": regionName,
        "nodes": nodes
      }
    }
    console.log("Starting action: ", action)
    send(action);

  }

  return (
    <Grid item key={regionName}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" >
        <Grid item key={"RegionInfo"}>
          <Typography>{region.display_name}</Typography>
          <Typography>Travel cost: {region.travelCost / 1000}sec</Typography>
          <Grid container spacing={0.3} direction="row" justifyContent="flex-start" alignItems="flex-start" >
            {Object.values(region.terrain).map((nodeInfo) => (
              <Grid item key={nodeInfo.node} xs={3}>
                  <Typography>Weight: {nodeInfo.weight}%</Typography>
                  <Typography>Size: {nodeInfo.max}</Typography>
                  <NodeIcon 
                    nodeName={nodeInfo.node} 
                    selected={selectedNodes.includes(nodeInfo)} 
                    onClick={() => toggleNodeSelection(nodeInfo)}
                  />
                  {selectedNodes.includes(nodeInfo) && <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    defaultValue={0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    onChange={(evt) => onChangeIterations(nodeInfo.node, evt.target.value)}
                  />}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item key={"start"} >
              <Typography>Your travel time: {getTravelTime() / 1000}sec</Typography>
              <Button disabled={selectedNodes.length == 0} onClick={onStart} variant='contained'>Start</Button>
        </Grid>
      </Grid>
    </Grid>
  ) 
};

export default RegionOverview;