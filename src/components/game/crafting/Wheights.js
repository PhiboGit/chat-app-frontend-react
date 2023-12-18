export default function adjustWeights(weights, start, end) {
  if (start === 0 && end === 0) {
    // No adjustment needed, return the weights as-is
    return weights.slice();
  }
  if (start < 0) {
    start = 0;
  }
  if (end < 0) {
    end = 0;
  }

  const adjustedWeights = weights.slice(); // Create a copy of the weights array

  // Adjust the weights based on the specified start
  let remainderStart = start
  for (let i = 0; i < adjustedWeights.length; i++) {
    if (adjustedWeights[i] >= remainderStart){
      adjustedWeights[i] -= remainderStart
      break
    }
    remainderStart -= adjustedWeights[i]
    adjustedWeights[i] = 0
  }
  
  // from end
  let remainderEnd = end
  for (let i = adjustedWeights.length-1; i >=0; i--) {
    if (adjustedWeights[i] >= remainderEnd){
      adjustedWeights[i] -= remainderEnd
      break
    }
    remainderEnd -= adjustedWeights[i]
    adjustedWeights[i] = 0
  }

  return adjustedWeights;
}