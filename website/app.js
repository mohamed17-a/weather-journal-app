// base URL and Personal API Key for OpenWeatherMap API used to fetch data
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '8e13a8adbd3a764175d5444f4162531e&units=imperial';
/* Global Variables */
// generate button element 
const generateBtn = document.getElementById('generate');
/*
*Elements: zipcode, feelings, temp, content, date 
*/
const zipCodeE = document.getElementById('zip');
const feelingsE = document.getElementById('feelings');
const tempE = document.getElementById('temp');
const contentE = document.getElementById('content');
const dateE = document.getElementById('date');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener('click', generateNew);
/* Function called by event listener */
function generateNew() {
    let projectData = {
        zipcodeV: zipCodeE.value,
        content: feelingsE.value,
        date: newDate,
    };
    getAPIData(projectData.zipcodeV) //get zipcode value then wait
        .then(
            (result) => { //result refers to data fetched from API about the specific zip code 
                try {
                    projectData.temp = result.main.temp
                    postData(projectData)
                }
                catch (error) { //error handling if user enters an invalid zipcode
                    setTimeout(document.body.getElementsByTagName('input')[0].style.borderColor = 'red', 1000)
                    alert('Error,Please enter a valid zipcode')
                }
            }
        )
}
/* Function to GET Web API Data*/
async function getAPIData(zipcode) {
    return await (await fetch(`${baseURL}${zipcode}&appid=${apiKey}`)).json()
}
/* Function to POST data */
async function postData(projectData) {
    const response = await fetch('/postData', {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: { 'Content-Type': 'application/json' }
    });
    try {
        response.json().then(() => {
            retrieveData(); //Update UI 
        })
    } catch (error) {
        console.log(error)
    }

}

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        tempE.innerHTML = Math.round(allData.temp) + 'degrees';
        contentE.innerHTML = allData.content;
        dateE.innerHTML = allData.date;
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}