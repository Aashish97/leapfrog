var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    var newArr = array.slice();
    var key = key;
  
    newArr.sort(function(a, b) {
      
      var compareA = a[key];
      
      var compareB = b[key];
      if (compareA < compareB) {
        return -1;
      }
  
      if (compareA > compareB) {
        return 1;
      }
  
      return 0;
    });
  
    console.log('sorted array');
    console.log(newArr);
    
    console.log('old array');
    console.log(arr);

  }
  
  var sorted = sortBy(arr, "name");
