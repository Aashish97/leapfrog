var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [{
          id: 2,
          name: 'Sally'
        },
        {
          id: 3,
          name: 'Mark',
          children: [{
            id: 4,
            name: 'Harry'
          }]
        }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{
        id: 6,
        name: 'Peter'
      }]
    }
  };
  
  function normalize(input) {
    var keys = Object.keys(input);
  
    return keys.reduce(function(acc, key) {
      if (!acc[key]) {
        acc[key] = input[key];
      }
  
      flattenChild(acc[key], acc);
  
      return acc;
    }, {});
  }
  
  function flattenChild(obj, parent) {
    if (!obj.children) {
      return;
    }
  
    obj.children.forEach(function(value, index) {
      parent[value.id] = value;
      obj.children[index] = value.id;
  
      flattenChild(value, parent);
    });
  }
  
  console.log(normalize(input));