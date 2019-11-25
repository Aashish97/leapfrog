// task two
var languages = ['c', 'c++', 'java', 'js', 'python', 'php',
                'c', 'c++','Ruby', 'java', 'js', 'python', 'php',
                'c', 'c++', 'java', 'js', 'go', 'python', 'php',
                'c', 'c++', 'java', 'js', 'python', 'php'
                ];
languages.sort();
var current = null;
var count = 0;
for (var i = 0; i < languages.length; i++) {
    if (languages[i] != current) {
        if (count > 0) {
            console.log(current + ' comes --> ' + count + ' times');
        }
        current = languages[i];
        count = 1;
    } else {
        count++;
    }
}
if (count > 0) {
    console.log(current + ' comes --> ' + count + ' times');
}