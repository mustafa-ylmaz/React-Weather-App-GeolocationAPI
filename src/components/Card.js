import React, { useEffect } from 'react'


function Card(props) {
  const {data,city,lat} = props;


  function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

/*       <p>Hava durumu: {data&&data.weather?.[0].description}</p>
*/ 
const datestr = data&&data.list?.[0].dt_txt
var day = getDayName(datestr, 'tr-TR')


  useEffect(() => {
    
  }, [data,city,lat])
  return (
    <>
    {day}
    
    </>
  )
}

export default Card

/*
  {props.data.coord}

    {lat &&
        <div>
        <h1>{data.name}</h1>
        </div>
          
          || 
          
          city&&<p>{data.timezone}</p>
          }*/