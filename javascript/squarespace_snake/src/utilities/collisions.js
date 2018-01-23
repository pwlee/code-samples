export default class Collision {
  // Axis-Aligned Bounding Box
  // Simple collision detection between two rectangles (does not account for rotation)
  // See: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  static aabb(rect1, rect2) {
    return(
      rect1.position.x <= rect2.position.x + rect2.width &&
      rect1.position.x + rect1.width >= rect2.position.x &&
      rect1.position.y <= rect2.position.y + rect2.height &&
      rect1.height + rect1.position.y >= rect2.position.y
    )
  }
}
