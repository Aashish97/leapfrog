function removePunctuations(word) {
    return word.replace(/[\!\.\,\-\?]/gi, "");
  }
  
function removeSymbols(word) {
    return word.replace(/[\+\*\(\)\>\<\;\/\"\'\=\{\}\[\]]/gi, "");
  }
  
function toLowercase(word) {
    return word.toLowerCase();
  }
  
function calcVectorSize(vec) {
    return Math.sqrt(vec.reduce((accum, curr) => accum + Math.pow(curr, 2), 0));
    }
  