var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
];

function searchByName(Object, fruitname){
    for(singlefruit of fruits){
        if (singlefruit.name == fruitname){
            console.log(singlefruit);
        }
    }
};
searchByName(fruits, 'Banana');