import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from './components/Card';
import axios from 'axios';


const  cities  = require('./iller.js');
const APIKEY = '9650d51c3088b5c10d7eea04f6f313a7';


function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('Istanbul');

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);


  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude)
    setLong(position.coords.longitude) })


  const listCity = cities.sort((a,b) => a.id-b.id);
  const handleSelect=(e)=>{
    setCity(e);
  }
  
  const fetchdata = async() => { 
    if(lat) { 
       await axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=30&appid=${APIKEY}`)
      .then((res) => setData(res.data));
      console.log(data);

      
    }
    else {
      await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&lang=tr&units=metric`)
      .then(res => setData(res));
    } }
    


    useEffect(() => {
      let unix_timestamp = 1659290400

      var date = new Date(unix_timestamp * 1000);

      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();
      
      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      
      console.log(date);
      fetchdata();
      
  


      
      
    }, [city,lat]) 
  return (
    <div className="App">
        
      {
      lat?''
         : <DropdownButton
          
         title={city?city:"Select City"}
         id="dropdown-menu-align-right"
         onSelect={(e) => setCity(e)}
         >
             {listCity.map(city => <Dropdown.Item eventKey={city.name} key={city.id}>{city.name}</Dropdown.Item>)}

             <Dropdown.Divider />
             
     </DropdownButton>
      }
      {<Card  lat={lat} city={city} data={data} />   
}



    </div>
  )
}

export default App;
