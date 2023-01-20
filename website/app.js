/* Global Variables */
const baseUrl="https://api.openweathermap.org/data/2.5/weather?zip=";
const zip=document.getElementById("zip").value;
const apiKey ="f0e65c5d737d64ad495c78d12eab0df9&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener("click",workPage);
function workPage(e){
const zip=document.getElementById("zip").value;
const feeling=document.getElementById("feelings").value;
e.target
getWetherWebApi(baseUrl,zip,apiKey).then(function(data){    
   console.log(data.name);                /*data.main.temp */
postDataToServer("/post",{temperature:data.main.temp,date:newDate,Name:data.name,userresponse:feeling}).then(retrieveData());});}

const getWetherWebApi=async(baseUrl,zip,apiKey)=>{
const res=await fetch(baseUrl+zip+"&appid="+apiKey);
try {
   const alldata=await res.json(); 
   return alldata;
} catch (error) {
   
   console.log("error",error);
}
}
 const postDataToServer=async(url="",data={})=>{
   const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
        
      console.log("error", error);
      // appropriately handle the error
      }
 }

 const retrieveData = async () =>{
   const request = await fetch('/all');
   try {
   // Transform into JSON
   const allData = await request.json()
   console.log(allData)
   // Write updated data to DOM elements
   document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' F° degrees';
   document.getElementById('content').innerHTML = allData.userresponse;
   document.getElementById("date").innerHTML =allData.date;
   document.getElementById("city").innerHTML =allData.Name;
   }
   catch(error) {
      
     console.log("error", error);
     // appropriately handle the error
   }
  }