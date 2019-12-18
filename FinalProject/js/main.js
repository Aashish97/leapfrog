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
    document.getElementById("firstUnique").innerHTML = firstUnique;

    let secondUnique = Array.from(new Set(str2Words));
    document.getElementById("secondUnique").innerHTML = secondUnique;

    let allWordsUnique = Array.from(new Set(str1Words.concat(str2Words)));

    (function matchedString(){
      matchString = [];
      for(let i = 0; i<firstUnique.length+secondUnique.length; i++){
        if (firstUnique.includes(secondUnique[i])) {
          matchString.push(secondUnique[i]);
          document.getElementById("matchedString").innerHTML = matchString;
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

    if (cosSim > 0.7) {
      document.getElementById("plagiarism").innerHTML = "Plagiarism Detected";
    } else {
      document.getElementById("plagiarism").innerHTML = "No Plagiarism";
    }
  }
}