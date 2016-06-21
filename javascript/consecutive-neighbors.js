// -----------------------------------------------------------------------------
// Introduction
// -----------------------------------------------------------------------------

// Problem: Write a program that returns the length of the longest chain of
// consecutive numbers in a grid of natural numbers.
// I.E:
// [0, 2, 1]
// [5, 6, 3]
// [4, 7, 8]
//
// returns 5 (4,5,6,7,8)

// Peter's preface:
//   I was trying to simulate a live interview so I time-boxed this problem to 30
//   minutes.  During this time, I thought out loud (as I would in an interview)
//   and, in an effort to actually get some code down, went for the brute force
//   solution.  More elegant solutions are out there, I'm sure.  After the exercise,
//   I realized that I could use this as a code sample, so I went back and cleaned this up.
//
// Solution overview:
//   For a single position on the grid, checking for a consecutive neighbor is a
//   simple task (just compare values in the north, south, east, and west positions).
//
//   So, a brute force solution sounds something like: "For every position on the
//   grid, continue following consecutive neighbors while keeping track of the
//   chain length."
//
//   Breaking that down, you get:
//   "For every position on the grid" = double "for" loop for x/y coordinates
//   "continue following consecutive neighbors" = "for" loop which ends when
//     there are no more consecutive neighbors (some iterator like function returns null)
//
//   The end result is a fairly inefficient solution with a worst case runtime of O(n^3).


// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// Super quick data structure for holding x/y coordinates
function Position(x, y){
  this.x = x;
  this.y = y;
}

// For every element in the grid, calculate and then return the longest chain of
// consecutive integers.
function calculateLongestChain(grid){
  var maxChainLength = 1;

  for (var x = 0; x < grid.length; x++){
    for (var y = 0; y < grid[x].length; y++){
      var currentChainLength = calculateLongestChainAt(grid, new Position(x, y))
      if (currentChainLength > maxChainLength){
        maxChainLength = currentChainLength;
      }
    }
  }

  return maxChainLength;
}

function calculateLongestChainAt(grid, position){
  var chainLength = 0;

  for (var currentPosition = position; currentPosition; currentPosition = getConsecutiveNeighbor(grid, currentPosition)){
    chainLength++;
  }

  return chainLength;
}

// You can also write "calculateLongestChainAt" recursively:
// function calculateLongestChainAt(grid, position){
//   return recusivelyCalculateLongestChainAt(grid, 1, position);
// }
//
// For a given position in a grid, if the position has a consecutive neighbor,
// continue the recursive call stack while bumping up the chain length value.
// function recusivelyCalculateLongestChainAt(grid, currentChainLength, position){
//   var neighborPosition = getConsecutiveNeighbor(grid, position);
//
//   if (neighborPosition){
//     return calculateLongestChainAt(grid, currentChainLength + 1, neighborPosition);
//   }else{
//     return chainLength;
//   }
// }

function getConsecutiveNeighbor(grid, position){
  var north = new Position(position.x, position.y - 1),
      south = new Position(position.x, position.y + 1),
      east  = new Position(position.x + 1, position.y),
      west  = new Position(position.x - 1, position.y),
      neighbors = [north, south, east, west];

  for (var neighbor of neighbors){
    if (isInBounds(grid, neighbor) && isConsecutive(grid, position, neighbor)){
      return neighbor;
    }
  }

  return null;
}

// Compares two positions for "consecutiveness"
function isConsecutive(grid, originalPosition, checkPosition){
  var originalValue = grid[originalPosition.x][originalPosition.y],
      checkValue    = grid[checkPosition.x][checkPosition.y];

  return checkValue == originalValue + 1;
}

// Safeguard to make sure we don't try and access elements outside of the grid
function isInBounds(grid, position){
  return position.x >= 0 && position.x < grid.length &&
         position.y >= 0 && position.y < grid[position.x].length;
}

// And now let's run the function
var grid = [[0,5,4], [2,6,7], [1,3,8]];

console.log(calculateLongestChain(grid));
