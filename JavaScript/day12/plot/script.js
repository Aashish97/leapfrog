var points = [
    {x: 90, y: 90},
    {x: 120, y: 120},
    {x: 150, y: 120},
    {x: 180, y: 150},
    {x: 210, y: 180},
    {x: 240, y: 210},
];

var wrapper = document.getElementById("wrapper");
wrapper.style.height = '500px';
wrapper.style.width = '400px';
wrapper.style.backgroundColor = 'grey';

var parent = document.getElementById('wrapper');

for(var i=0; i<points.length; i++){
    var element = document.createElement('div');
    element.style.height = '10px';
    element.style.width = '10px';
    element.style.backgroundColor = 'red';
    element.style.position = 'absolute';
    element.style.borderRadius = '50%';
    element.style.top = points[i].x + 'px';
    element.style.left = points[i].y + 'px';
    parent.appendChild(element);
}