// printing stars
var input = prompt("Enter number of stars for pattern");
for(var i = input; i>0; i--){
    star = "";
    for(var j = i; j>0 ; j--){
        star = star + "*";
    }
    console.log(star);
};