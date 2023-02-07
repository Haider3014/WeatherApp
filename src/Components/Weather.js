import React, { useState, useEffect } from 'react'

const Weather = () => {
  const apikey = "07f5d34e8253d2b76bc521f2b62ff213"
  const [coordinates, setcoordinates] = useState({ lon: '', lat: '', name: '' })
  const [weather, setweather] = useState({ temp: "", feels_like: "", temp_max: "", temp_min: "", humidity: "" })
  const [city, setcity] = useState("")
  const [aqivalue, setaqivalue] = useState({ value: "" })


  const Fetchlocation = async () => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apikey}`
    const data = await fetch(url)
    const res = await data.json()
    setcoordinates(
      {
        lon: res[0].lon,
        lat: res[0].lat,
        name: res[0].name
      }
    )
  }

  const Fetchweather = async () => {
    const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apikey}`
    const Data = await fetch(Url)
    const Res = await Data.json()
    setweather({
      temp: Res.main.temp,
      feels_like: Res.main.feels_like,
      humidity: Res.main.humidity,
      temp_max: Res.main.temp_max,
      temp_min: Res.main.temp_min,
      wind: Res.wind.speed


    })
  }
  useEffect(() => {
    // eslint-disable-next-line
    Fetchweather()
    // eslint-disable-next-line
  }, [coordinates])
  // fetchweather will run when the key will upadte it will work with the usestate('')

  const aqi = async () => {
    const aqiurl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}`
    const aqifetch = await fetch(aqiurl)
    const aqidata = await aqifetch.json()
    setaqivalue(
      { value: aqidata.list[0].main.aqi }
    )
  }
  useEffect(() => {
    aqi()
  }, [coordinates])

  const handlesearch = (e) => {
    setcity(e.target.value)
  }
  const click = () => {
    Fetchlocation()
  }
  const Aqidisp = () => {
    if (aqivalue.value === 5)
      return <div className="card text-bg-dark mt-5 image">
        <img src={require('./images/aqi1.jpg')} className="card-img backimage" alt="..." />
        <div className="card-img-overlay">
          <h3 className="card-title">AQI</h3>
          <h4 className="card-text" style={{ color: '#4d0000' }}>VERY POOR</h4>
          <p className="card-text">Wind speed- {weather.wind} km/hr</p>
        </div>
      </div>
    else if (aqivalue.value === 4)
      return <div className="card text-bg-dark mt-5 image">
        <img src={require('./images/aqi1.jpg')} className="card-img backimage " alt="..." />
        <div className="card-img-overlay">
          <h3 className="card-title">AQI</h3>
          <h4 className="card-text" style={{ color: '#990000'  }}>POOR</h4>
          <p className="card-text">Wind speed- {weather.wind} km/hr</p>
        </div>
      </div>
    else if (aqivalue.value === 3)
      return <div className="card text-bg-dark mt-5 image">
        <img src={require('./images/aqi1.jpg')} className="card-img backimage" alt="..." />
        <div className="card-img-overlay">
          <h3 className="card-title">AQI</h3>
          <h4 className="card-text" style={{ color: '#ffbf00' }}>MODERATE</h4>
          <p className="card-text">Wind speed- {weather.wind} km/hr</p>
        </div>
      </div>
    else if (aqivalue.value === 2)
      return <div className="card text-bg-dark mt-5 image">
        <img src={require('./images/aqi1.jpg')} className="card-img backimage" alt="..." />
        <div className="card-img-overlay">
          <h3 className="card-title">AQI</h3>
          <h4 className="card-text" style={{ color: '#80ff00' }}>FAIR</h4>
          <p className="card-text">Wind speed- {weather.wind} km/hr</p>
        </div>
      </div>
    else if (aqivalue.value === 1)
      return <div className="card text-bg-dark mt-5 image">
        <img src={require('./images/aqi1.jpg')} className="card-img backimage" alt="..." />
        <div className="card-img-overlay">
          <h3 className="card-title">AQI</h3>
          <h4 className="card-text" style={{ color: '#00ff00' }}>GOOD</h4>
          <p className="card-text">Wind speed- {weather.wind} km/hr</p>
        </div>
      </div>
  }




  return (

    <>
    <div className="container mt-5">
    <div className="d-flex"  >
      <input className="form-control me-2 searchbar" id="search" name='search' type="search" placeholder="Search" aria-label="Search" onChange={handlesearch} />
      <button className="btn btn-outline-primary" onClick={click} >Search</button>
    </div>
    {Fetchweather?"loading":
    <div className='image-cards container'>
    <div className="card text-bg-dark mt-5 image">
      <img src={require('./images/gorgeous-clouds-background-with-blue-sky-design_1017-25501.webp')} className="card-img backimage " alt="..." />
      <div className="card-img-overlay">
        <h2 className="card-title">{coordinates.name}</h2>
        <h3 className="card-title">{weather.temp} °C</h3>
        <p className="card-text">Feels like- {weather.feels_like}°C</p>
        <p className="card-text">Max temperature- {weather.temp_max}°C</p>
        <p className="card-text">Min temperature- {weather.temp_min}°C</p>
        <p className="card-text">Humidity- {weather.humidity}%</p>
      </div>
    </div>
    <Aqidisp></Aqidisp>
    
  </div>}
    
  </div>
          
      
        
    </>
  )
}

export default Weather

