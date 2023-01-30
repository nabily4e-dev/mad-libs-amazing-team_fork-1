/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.

  // matching pos
  const posDict = {
    '[n]': 'noun',
    '[v]': 'verb', 
    '[a]': 'adjective',
  }
  const parsedStory = [];
  const splittedWords = rawStory.split(/([\s,.])/gm)
                              .filter(word => /\S/.test(word)); // to remove leading and trailing space
  splittedWords.forEach(elem => {
    const posType = elem.match(/\[.*\]/g);
    const wordObj = {};
    if(posType != null){
      wordObj.word = elem.replace(posType,'');
      wordObj.pos = posDict[posType];
    }
    else 
      wordObj.word = elem; 
    parsedStory.push(wordObj);
  });
  return parsedStory
  // return {}; // This line is currently wrong :)
}

function showStory(processedStory){
  // Variables
  const allStory = '';

  // Grap DOM elements
  const edit = document.querySelector(".madLibsEdit");
  const preview = document.querySelector(".madLibsPreview");
  
  processedStory.forEach((wordObj, index) => {
    if(wordObj.hasOwnProperty('pos')){
      const input = document.createElement('input');
      input.type = "text";
      input.id = `blank-${index}`;
      edit.appendChild(input);
      edit.innerHTML += ` `;
      preview.innerHTML += `_____________`;
    }else{
      edit.innerHTML += ` ${wordObj.word} `;
      preview.innerHTML += ` ${wordObj.word} `;
    }
  });
  
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  showStory(processedStory);
});
