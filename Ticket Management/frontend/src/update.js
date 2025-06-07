import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

export default function Update() {
    const [data, setData] = useState({
            name: "",
            email: "",
            password: "",
            description: ""
        })

        const navigate = useNavigate()

        const params = useParams();
        // console.log(params.id)

        useEffect(() =>{
            axios.get('http://localhost:8000/api/v1/getsingledata/'+params.id)
            .then((res) => setData(res.data.getsingleData))
            .catch((err) => console.log(err))
        },[])

        function submitHandler(e){
            e.preventDefault();
            axios.put('http://localhost:8000/api/v1/updatesingledata/'+params.id,data)
            .then((res) => navigate('/'))
            .catch((err) => console.log(err))
        }

    return (
        <>
            <div className="flex justify-center mt-8">
                <form className="lg:w-1/5 md:1/3 bg-slate-100 p-6 rounded-xl shadow-xl" onSubmit={submitHandler} >
                    <div className="flex flex-col">
                        <label className="text-xl text-black mb-2">Enter your name</label>
                        <input type="text" className="rounded-md p-1 border  border-gray-400 outline-none mb-3 text-base text-black" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl text-black mb-2">Enter your email</label>
                        <input type="email" className="rounded-md p-1 border  border-gray-400 outline-none mb-3 text-base text-black" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl text-black mb-2">Enter your Password</label>
                        <input type="password" className="rounded-md p-1 border  border-gray-400 outline-none mb-3 text-base text-black" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl text-black mb-2">Description</label>
                        <textarea className="rounded-md p-1 border  border-gray-400 outline-none mb-3 text-base text-black" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} required />
                    </div>
                    <div>
                        <button className="bg-black text-lg text-white rounded-md py-2 px-6 mt-6 flex mx-auto">Update</button>
                    </div>            
                </form>
            </div>
        </>
    )
}