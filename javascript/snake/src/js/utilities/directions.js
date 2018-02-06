export const NORTH = 1
export const EAST  = 2
export const SOUTH = 3
export const WEST  = 4

export const KEYCODES = {
  37: WEST,  // left
  38: NORTH, // up
  39: EAST,  // right
  40: SOUTH  // down
}

export const OPPOSITE_DIRECTIONS = {}
             OPPOSITE_DIRECTIONS[NORTH] = SOUTH
             OPPOSITE_DIRECTIONS[EAST]  = WEST
             OPPOSITE_DIRECTIONS[SOUTH] = NORTH
             OPPOSITE_DIRECTIONS[WEST]  = EAST
