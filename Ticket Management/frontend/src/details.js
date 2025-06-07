import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Details() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        description: ""
    })

    const [ticketList, setTicketlist] = useState([])

    const [activetab, setActivetab] = useState(null);

    function submitHandler(e) {
        e.preventDefault();
        console.log(data);
        axios.post('http://localhost:8000/api/v1/ticket', data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        setData({
            name: "",
            email: "",
            password: "",
            description: ""
        })
        setActivetab(null)
    }

    function toggle(tickets) {
        setActivetab((prev) => {
            return (prev === tickets ? null : tickets)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/getdata')
            .then((res) => {
                setTicketlist(res.data.ticketData)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    function deleteHandler(id) {
        axios.delete('http://localhost:8000/api/v1/deletedata/' + id)
            //     {
            //     _id: item
            // }
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))

    }

    return (
        <div>
            <button className="bg-black text-lg text-white rounded-md py-2 px-6 flex mx-auto mt-6" onClick={() => toggle("ticket")}>Create Ticket</button>
            <p className="text-center mt-6 text-green-400 font-bold">Refresh the page after created a ticket or deleted a ticket</p>
            {activetab === "ticket" && <div className="flex justify-center mt-8">
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
                        <button className="bg-black text-lg text-white rounded-md py-2 px-6 mt-6 flex mx-auto">Create</button>
                    </div>
                </form>
            </div>}
            {ticketList.length > 0 &&
                <div className="flex justify-center mt-8">
                    <ul className="bg-slate-100 p-6 rounded-xl shadow-xl">
                        {ticketList.map((item, i) => <>
                            <li key={i} className="text-lg text-gray-600">name: {item.name}</li>
                            <li key={i} className="text-lg text-gray-600">email: {item.email}</li>
                            <li key={i} className="text-lg text-gray-600">description: {item.description}</li>
                            <li key={i} className="text-lg text-gray-600">password: {item.password}</li>
                            <div className="flex justify-center gap-x-8">
                                <button className="bg-black text-lg text-white rounded-md py-2 px-6  mt-4" onClick={() => deleteHandler(item._id)}>Delete</button>
                                <Link to={`/edit/${item._id}`}><button className="bg-black text-lg text-white rounded-md py-2 px-6  mt-4">Edit</button></Link>
                            </div>
                        </>)}
                    </ul>
                </div>
            }

        </div>
    )
}