import axios from "axios";
import { useEffect, useState } from "react";
import wpics from './images/wether.png';
import './App.css';

function App() {
    let Wstyle = {
        color: "black",
        overflowY: "auto",
        margin: "auto",
        marginTop: "3%",
        width: "850px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "skyblue"
    }

    let d = new Date()
    let dtime = d.getHours();
    let dmin = d.getMinutes();

    let [b, setb] = useState('');
    let [a, seta] = useState([])


    let getWethearrReport = (q) => {
        q.preventDefault();
        let city = q.target[0].value;
        if (city !== '') {
            setb(city);
        } else {
            alert("shold be empty")
        }
        console.log(city);
        q.target[0].value = "";
    }


    useEffect(() => {
        let key = 'e4ef1914d07e1759b712293299504806';
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${b}&appid=${key}`).then((val) => {
            console.log(val);
            if (val.status === 200) {
                seta([val.data])
            }

        }, (err) => {
            console.log(err);
            if (err.response.data.cod === "404") {
                alert(err.response.data.message + ",  please enter a valid city name..");
                seta([])
            }

        })

    }, [b])
    console.log(a);

    let dataa = a.map((value, index, array) => {
        return (
            <div style={{ marginTop: "19px", height: '320px', position: "relative" }}>

                <div style={{ display: "flex", justifyContent: "space-around" }}>

                    <div style={{ marginLeft: "-180px" }}>
                        <span>Current Weather</span><br />
                        <span>{dtime + ":" + dmin}PM</span>
                    </div>

                    <div>
                        <span style={{ fontWeight: "bold" }}>{value.name}</span> <span>{Math.floor(value.main.temp - 273)}  <sup>0</sup>C</span>

                    </div>
                </div>

                <div style={{ marginTop: "20px", display: "flex", textAlign: "center" }}>
                    <img src={wpics} alt="sunny" width="180px" height="180px" /> <span style={{ fontSize: "7.5rem", marginLeft: "30px" }}>{Math.floor(value.main.temp - 273)} <sup>oC</sup> </span>
                </div>


                <div style={{ display: "grid", gridTemplateColumns: "100px 100px 100px 100px 100px", justifyContent: "space-evenly", position: "absolute", bottom: "0", width: "100%" }} id="child">
                    <div>
                        <span>Air Quality</span><br />
                        <span>{value.wind.deg}</span>
                    </div>

                    <div>
                        <span>Wind</span><br />
                        <span>{value.wind.speed}</span>
                    </div>
                    <div>
                        <span>Humidity</span><br />
                        <span>{value.main.humidity}</span>
                    </div>

                    <div>
                        <span>Visibity</span><br />
                        <span>{value.visibility}</span>
                    </div>

                    <div>
                        <span>Pressure</span><br />
                        <span>{value.main.pressure}</span>
                    </div>

                </div>


            </div>
        )
    })
    return (
        <div  >
            <h1 style={{ color: "black", margin: "auto", width: "100%", paddingTop: "100px" }}>Weather App</h1>
            <div style={Wstyle}>
                <form onSubmit={getWethearrReport} style={{ width: "100%" }}>
                    <input type="text" name="tex" id="pop" placeholder="Enter any city name to check for weather details" style={{ width: "75%", height: "2.4rem", color: "black" }} />
                    <input type="submit" value="SEARCH" style={{ height: "2.4rem", width: "25%" }} />
                </form>
                <div style={{width:"100%"}}>{dataa}</div>
            </div>
        </div>
    )
}

export default App;
