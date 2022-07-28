import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from './components/Card';
import axios from 'axios';

const geolocationAPI = navigator.geolocation;
const  cities  = require('./iller.js');



const APIKEY = '9650d51c3088b5c10d7eea04f6f313a7';
//

function App() {
  
  const [data, setData] = useState(null);
  const [city, setCity] = useState('Istanbul');

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  
  const [error, setError] = useState(null);
  
  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!')
    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      }, (error) => {
        setError('Something went wrong getting your position!')
      })
    }
    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!')
    }
    else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);
      },
      (error) => {
        setError('Something went wrong getting your position!')
      })} }
      


  const listCity = cities.sort((a,b) => a.id-b.id);
  const handleSelect=(e)=>{
    setCity(e);
  }
  
  const fetchdata = async() => { 
    if(lat) { 
       await axios(`https://api.openweathermap.org/data/2.5/weather?${'lat='+lat+'&lon='+long}&appid=${APIKEY}&lang=tr&units=metric`)
      .then((res) => setData(res.data));
      
    }
    else {
      await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&lang=tr&units=metric`)
      .then(res => setData(res));
    } }
    


    useEffect(() => {
      

      fetchdata();
      getUserCoordinates();
      
      
      
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
