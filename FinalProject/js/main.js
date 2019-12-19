let str1, str2;

(function getInputFiles(){
  let firstInput = document.getElementById("firstFile");
  let secondInput = document.getElementById("secondFile");

  firstInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      let myFile = this.files[0];
      let reader = new FileReader();
      
      reader.addEventListener('load', function (e) {
        str1 = e.target.result;
        // console.log(str1.split(' ').length);
        document.getElementById("total-first-word").innerHTML = str1.split(' ').length;
      });
      
      reader.readAsBinaryString(myFile);
    }
  });

  secondInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      let myFile = this.files[0];
      let reader = new FileReader();
      
      reader.addEventListener('load', function (e) {
        str2 = e.target.result;
        // console.log(str2.split(' ').length);
        document.getElementById("total-second-word").innerHTML = str2.split(' ').length;
      });
      
      reader.readAsBinaryString(myFile);
    }
  });

})();

function checkSimilarity() {

  if (str1 !== "" && str2 !== "") {
    //
    // Preprocess strings and combine words to a unique collection
    //
    let str1Words = str1
      .trim()
      .split(" ")
      .map(removePunctuations)
      .map(removeSymbols)
      .map(toLowercase)
      .map(removeStopWords);

    let str2Words = str2
      .trim()
      .split(" ")
      .map(removePunctuations)
      .map(removeSymbols)
      .map(toLowercase)
      .map(removeStopWords);

    //removes empty string from the array
    str1Words = str1Words.filter(function(el, i, arr) {
      // console.log(arr.length);
      return el != "";
    });

    str2Words = str2Words.filter(function(el, i, arr) {
      return el != "";
    });

    // console.log(str1Words, str2Words);

    let firstUnique = Array.from(new Set(str1Words));
    document.getElementById("total-first-keyword").innerHTML = firstUnique.length;
    // console.log(firstUnique.length);
    document.getElementById("firstUnique").innerHTML = firstUnique.join(', ');

    let secondUnique = Array.from(new Set(str2Words));
    // console.log(secondUnique.length);
    document.getElementById("total-second-keyword").innerHTML = secondUnique.length;
    document.getElementById("secondUnique").innerHTML = secondUnique.join(', ');

    let allWordsUnique = Array.from(new Set(str1Words.concat(str2Words)));

    (function matchedString(){
      matchString = [];
      for(let i = 0; i<firstUnique.length+secondUnique.length; i++){
        if (firstUnique.includes(secondUnique[i])) {
          matchString.push(secondUnique[i]);
          document.getElementById("matchedString").innerHTML = matchString.join(', ');
        }
      }
    })();

    //
    // Calculate IF-IDF algorithm vectors
    //
    let str1Vector = calcTfIdfVectorForDoc(
      str1Words,
      [str2Words],
      allWordsUnique
    );
    let str2Vector = calcTfIdfVectorForDoc(
      str2Words,
      [str1Words],
      allWordsUnique
    );

    let cosSim = cosineSimilarity(str1Vector, str2Vector);

    // console.log('similarity>>', similarity);

    document.getElementById("output").innerHTML = cosSim;

    if (cosSim > 0.5) {
      document.getElementById("plagiarism").innerHTML = "PLAGIARISM DETECTED!!!";
      document.getElementById("plagiarism").style.color = 'white';
    } else {
      document.getElementById("plagiarism").innerHTML = "NO PLAGIARISM";
      document.getElementById("plagiarism").style.color = 'white';
    }
  }
}