var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
    var arr = [];
    collection.forEach(function(item) {
    arr.push(tranFunc(item));
  });
    return arr;
}

var output = transform(numbers, function(num) {
    return num*2;
});

console.log("output is: ", output);