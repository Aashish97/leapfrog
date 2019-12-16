function checkSimilarity(){
  let str1 = document.getElementById("firstInput").value;
  let str2 = document.getElementById("secondInput").value;

  //
  // Preprocess strings and combine words to a unique collection
  //
  let str1Words = str1.trim().split(' ').map(removePunctuations).map(toLowercase);
  let str2Words = str2.trim().split(' ').map(removePunctuations).map(toLowercase);
  let allWordsUnique = Array.from(new Set(str1Words.concat(str2Words)));

  //
  // Calculate IF-IDF algorithm vectors
  //
  let str1Vector = calcTfIdfVectorForDoc(str1Words, [str2Words], allWordsUnique);
  let str2Vector = calcTfIdfVectorForDoc(str2Words, [str1Words], allWordsUnique);

  let cosSim = cosineSimilarity(str1Vector, str2Vector);

  // console.log('similarity>>', similarity);

  document.getElementById("output").innerHTML = cosSim;

  

  if (cosSim > 0.7){
    document.getElementById("plagiarism").innerHTML = 'Plagiarism Detected';
  }
  else{
    document.getElementById("plagiarism").innerHTML = '';
  };

  (function matchString() { 
    let result = str1.match(str2);
    // console.log(result);
    document.getElementById("display").innerHTML = ("Matched Words: " +result); 
  })(); 
  
};

//
// Main function
//

function cosineSimilarity(vec1, vec2) {
  let dotProduct = vec1.map((val, i) => val * vec2[i]).reduce((accum, curr) => accum + curr, 0);
  let vec1Size = calcVectorSize(vec1);
  let vec2Size = calcVectorSize(vec2);

  return dotProduct / (vec1Size * vec2Size);
};

// function cosinesim(A,B){
//   var dotproduct=0;
//   var mA=0;
//   var mB=0;
//   for(i = 0; i < A.length;){
//       dotproduct += (A[i] * B[i]);
//       mA += (A[i]*A[i]);
//       mB += (B[i]*B[i]);
//   }
//   mA = Math.sqrt(mA);
//   mB = Math.sqrt(mB);
//   var similarity = (dotproduct)/(mA)*(mB)
//   return similarity;
// }


//
// tf-idf algorithm implementation
//

function calcTfIdfVectorForDoc(doc, otherDocs, allWordsSet) {
  return Array.from(allWordsSet).map(word => {
    return tf(word, doc) * idf(word, doc, otherDocs);
  });
};

function tf(word, doc) {
  let wordOccurences = doc.filter(w => w === word).length;
  return wordOccurences / doc.length;
};

function idf(word, doc, otherDocs) {
  let docsContainingWord = [doc].concat(otherDocs).filter(doc => {
    return !!doc.find(w => w === word);
  });

  return (1 + otherDocs.length) / docsContainingWord.length;
};

//
// Helper functions
//

function removeStopWords(word) {

  let stopWords = [
    'i','me','my','myself','we','our','ours','ourselves',
    'you','your','yours','yourself','yourselves','he','him','his','himself',
    'she','her','hers','herself','it','its','itself','they','them','their',
    'theirs','themselves','what','which','who','whom','this','that','these',
    'those','am','is','are','was','were','be','been','being','have','has','had',
    'having','do','does','did','doing','a','an','the','and','but','if','or','because',
    'as','until','while','of','at','by','for','with','about','against','between','into',
    'through','during','before','after','above','below','to','from','up','down',
    'in','out','on','off','over','under','again','further','then','once','here',
    'there','when','where','why','how','all','any','both','each','few','more','most',
    'other','some','such','no','nor','not','only','own','same','so','than','too','very',
    's','t','can','will','just','don','should','now'
  ];

  result = [];
  words = word.split(' ');
  for(let i=0;i<words.length;i++) {
      if(stopWords.includes(words[i])) {
        result.push(words[i]);
      }
  }
  let stoppingWords= result.join(' ');

  // console.log(stoppingWords);

  return word.replace(stoppingWords, '');

};

function removePunctuations(word) {
  return word.replace(/[\!\.\,\?\-\?]/gi, '');
};

function toLowercase(word) {
  return word.toLowerCase();
};

function calcVectorSize(vec) {
  return Math.sqrt(vec.reduce((accum, curr) => accum + Math.pow(curr, 2), 0));
};
