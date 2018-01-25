import GameObject from './game-object'

export default class Food extends GameObject {
  constructor(point) {
    const width = 10
    const height = 10
    const options = {
      backgroundColor: "yellow"
    }

    super(point, width, height, options)
  }
}
