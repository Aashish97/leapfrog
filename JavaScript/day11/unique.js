function getUnique(value, index, self){
    console.log(self.indexOf(value),index)
    return self.indexOf(value) === index;
}

var languages = ['c', 'c++', 'java', 'js', 'python', 'php',
                'c', 'c++','Ruby', 'java', 'js', 'python', 'php',
                'c', 'c++', 'java', 'js', 'go', 'python', 'php',
                'c', 'c++', 'java', 'js', 'python', 'php'
                ];

var Unique = languages.filter(getUnique);
console.log(Unique);