//cosine similarity algorithm
function cosineSimilarity(vec1, vec2) {
    let dotProduct = vec1
      .map((val, i) => val * vec2[i])
      .reduce((accum, curr) => accum + curr, 0);
    let vec1Size = calcVectorSize(vec1);
    let vec2Size = calcVectorSize(vec2);
  
    return dotProduct / (vec1Size * vec2Size);
  }
  
  //
  // tf-idf algorithm implementation
  //
  
  function calcTfIdfVectorForDoc(doc, otherDocs, allWordsSet) {
    return Array.from(allWordsSet).map(word => {
      return tf(word, doc) * idf(word, doc, otherDocs);
    });
  }
  
  function tf(word, doc) {
    let wordOccurences = doc.filter(w => w === word).length;
    return wordOccurences / doc.length;
  }
  
  function idf(word, doc, otherDocs) {
    let docsContainingWord = [doc].concat(otherDocs).filter(doc => {
      return !!doc.find(w => w === word);
    });
  
    return (1 + otherDocs.length) / docsContainingWord.length;
  }