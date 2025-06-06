import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const isToken = localStorage.getItem("Token")
        if (isToken) {
            let data = JSON.parse(window.atob(isToken.split('.')[1]))
            let expTime = data.exp * 1000
            let currentTime = Date.now() 
            console.log(data)
            console.log(expTime, currentTime)
            if (isToken && currentTime < expTime) {
                return
            }
            else {
                localStorage.removeItem("Token")
                navigate('/login')
            }
 
        }
        else{
            navigate('/login');
        } 
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/getusers',{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("Token")
            }
        }) 
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err))
    },[])
    return (
        <div>
            {data.length > 0 && data.map((item, i) => <li key={i}>{item.email}</li>)}
        </div>
    )
}       