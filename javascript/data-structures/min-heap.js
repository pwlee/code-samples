class MinHeap {
  constructor() {
    this.data = []
  }
  
  // --------------
  // Public methods
  // --------------
  insert(node) {
    this.data.push(node)
    this.heapifyUp()
  }

  extractMin() {
    const min = this.data[0] || null
    const lastItem = this.data.pop()
    
    if (this.data.length > 0) {
      this.data[0] = lastItem
      this.heapifyDown()
    }

    return min
  }
  
  // -----------------
  // "Private" methods
  // -----------------
  
  // Index helpers
  leftChildIndex(index)  { return index * 2 + 1 }
  rightChildIndex(index) { return index * 2 + 2 }
  parentIndex(index)     { return Math.floor((index - 1) / 2) }
  
  // Existence helpers
  hasLeftChild(index)  { return this.leftChildIndex(index) < this.data.length }
  hasRightChild(index) { return this.rightChildIndex(index) < this.data.length }
  hasParent(index)     { return this.parentIndex(index) >= 0 }

  // Access helpers
  leftChild(index)  { return this.data[this.leftChildIndex(index)] }
  rightChild(index) { return this.data[this.rightChildIndex(index)] }
  parent(index)     { return this.data[this.parentIndex(index)] }

  heapifyUp() {
    let index = this.data.length - 1
    
    while (this.hasParent(index)) {
      if (this.data[index] < this.parent(index)) {
        this.swap(index, this.parentIndex(index))
        index = this.parentIndex(index)
      } else {
        return
      }
    }
  }
  
  heapifyDown() {
    let index = 0

    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.leftChildIndex(index)
      if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
        smallerChildIndex = this.rightChildIndex(index)
      }

      if (this.data[index] >= this.data[smallerChildIndex]) {
        this.swap(index, smallerChildIndex)
        index = smallerChildIndex
      } else {
        return
      }
    }
  }
  
  swap(index1, index2) {
    const temp = this.data[index1]

    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }
}
