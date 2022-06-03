

fetch('https://the-trivia-api.com/api/questions')
    .then((response) => response.json())
    .then((data) => {
        const formatedData =  data;
        const valueOfIndex = 0;
       console.log(formatedData[0],"DATA")
    //    console.log(${})
     }) 
    
    
    .catch((err) => console.log(err, 'questions are not found'))

