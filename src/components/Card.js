import React, { useEffect } from 'react'


function Card(props) {
  
  const {data,city,lat,long} = props; 


  useEffect(() => {
    
  }, [data,city,lat])
  return (
    <>
      <p>Hava durumu: {data&&data.weather?.[0].description}</p>

    
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