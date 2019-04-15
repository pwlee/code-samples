// https://leetcode.com/problems/word-ladder

// Given two words (beginWord and endWord), and a dictionary's word list, find the
// length of shortest transformation sequence from beginWord to endWord, such that:
// 
// Only one letter can be changed at a time.
// Each transformed word must exist in the word list. Note that beginWord is not
// a transformed word.
// Note:
// 
// Return 0 if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.
// You may assume no duplicates in the word list.
// You may assume beginWord and endWord are non-empty and are not the same.
// Example 1:
// 
// Input:
// beginWord = "hit",
// endWord = "cog",
// wordList = ["hot","dot","dog","lot","log","cog"]
// 
// Output: 5
// 
// Explanation: As one shortest transformation is
// "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.
// Example 2:
// 
// Input:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
// 
// Output: 0
// 
// Explanation: The endWord "cog" is not in wordList, therefore no
// possible transformation.

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */

var ladderLength = function(beginWord, endWord, wordList) {
    const queue = [beginWord]
    const visited = {}
    visited[beginWord] = true
    const previous = {}
    
    let found = false
    
    while(queue.length > 0) {
        const currentWord = queue.shift()

        if (currentWord === endWord) {
            found = true
            break
        }
        
        for (const neighborWord of wordList) {
            if (!visited[neighborWord] && numberOfDifferences(currentWord, neighborWord) === 1) {
                queue.push(neighborWord)
                visited[neighborWord] = true
                previous[neighborWord] = currentWord
            }
        }
    }
    
    if (found) {
        let pathLength = 1
        let currentWord = endWord

        while(currentWord != beginWord) {
            currentWord = previous[currentWord]
            pathLength++
        }
        
        return pathLength
    }
    
    return 0
};

var numberOfDifferences = function(word1, word2) {
    let numDifferences = 0
    
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) {
            numDifferences++
        }
    }
    
    return numDifferences
}
