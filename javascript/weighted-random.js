// Write a function that takes an array of decimal weights that
// sum to 1 and returns the array index of one of those weights. The
// weights correspond to percentages indicating proportionally
// how often to show a particular version of an experiment.

// Tanslate weights to an increasing series of upper bounds (running sum).
// E.G: [.1, .1, .2, .3, .3] -> [.1, .2, .4, .7, 1]
// This establishes "buckets" sized proportionally to their weights.
// Then use Math.random() to generate a random float between 0-1 and return
// the index of the corresponding bucket.
const weightedRandom = (weights) => {
  const upperBounds = [];

  let previous = 0;
  for (let i = 0; i < weights.length; i++) {
    previous += weights[i];
    upperBounds.push(previous);
  }

  const rand = Math.random();
  for (let i = 0; i < weights.length; i++) {
    if (rand < upperBounds[i]) {
      return i;
    }
  }

  return -1;
}

// Helper function to visualize index distribution
const test = (weights, numRuns = 1000) => {
  const results = {};

  for (let i = 0; i < numRuns; i++) {
    const calculatedIndex = weightedRandom(weights);

    results[calculatedIndex] = results[calculatedIndex] || 0;
    results[calculatedIndex]++;
  }

  return results;
}

// test([.25, .25, .25, .25]); => { 0: 274, 1: 231, 2: 240, 3: 255 }
