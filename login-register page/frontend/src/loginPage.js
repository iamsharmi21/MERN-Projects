import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    useEffect(() => {
        const isToken = localStorage.getItem("Token")
        if (!isToken) {
            return
        }
        else {
            navigate('/home')
        }
    }, [])
    function submitHandler(e) {
        e.preventDefault();
        console.log(data)
        axios.post('http://localhost:8000/api/v1/login', data)
            .then((result) => {
                console.log(result.data)
                if (result.data.success == true) {
                    const token = result.data.token
                    localStorage.setItem("Token", token)
                    navigate('/home')
                }
                else {
                    alert('Invalid user or password');
                }
            }
            )
            .catch((err) => console.log(err))
    }
    return (
        <div className="flex flex-col items-center justify-center bg-blue-50 h-dvh">
            <h1 className="text-3xl pt-4 pb-4 font-semibold text-slate-700">LogIn</h1>
            <form className="bg-white rounded-xl p-8 w-1/4 shadow-xl" onSubmit={submitHandler}>
                <div className="flex flex-col">
                    <label className="mt-3 mb-2 text-xl text-gray-600 ">Enter Email</label>
                    <input type="email" className="p-1 border-2 border-gray-400 rounded-lg text-base" onChange={(e) => setData({ ...data, email: e.target.value })} />
                </div>
                <div className="flex flex-col">
                    <label className="mt-3 mb-2 text-xl text-gray-600 ">Enter Password</label>
                    <input type="password" className="p-1 border-2 border-gray-400 rounded-lg" onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>
                <button className="bg-black text-white py-2 px-4 rounded-lg mt-6 w-full ">LogIn</button>
                <Link to="/"><p className="mt-4 text-sm text-violet-900">Create an account? SignUp</p></Link>
            </form>
        </div>
    )
}