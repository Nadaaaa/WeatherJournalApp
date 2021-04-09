/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const apiKey = '&appid=566c7073111f5ed97ab8dd691be1bd7c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getData(baseURL, zip, apiKey)
    .then(function (userData) {
      postData('/add', { date: newDate, temp: userData.list[0].main.temp, content })
    }).then(function (newData) {
      updateUI()
    })
}



const getData = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const allData = await request.json()
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temp;
      document.getElementById('content').innerHTML = allData[0].content;
    }
    catch (error) {
      console.log("error", error);
    }
  };