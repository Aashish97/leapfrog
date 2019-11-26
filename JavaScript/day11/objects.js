// basic information

var info = {
    name: "Aashish",
    address: "Harisiddhi, Lalitpur",
    email: "itsmeasish98@gmail.com",
    interests: "coding, testing",
    education: [
        {name: "SLC", enrollDate: "2070"},
        {name: "HSEB", enrollDate: "2072"},
        {name: "Bachelors", enrollDate: "running"}
    ]
};

for(individual of info.education){
    console.log("Name:",individual.name, "Date:",individual.enrollDate);
}