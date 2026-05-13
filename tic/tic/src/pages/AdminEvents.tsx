import React, { useEffect, useState } from "react"

export const AdminEvents = () => {

    const API = "http://localhost:3000/events"

    const [events, setEvents] = useState<any[]>([])
    const [eventname, setEventname] = useState("")
    const [artist, setArtist] = useState("")
    const [location, setLocation] = useState("")
    const [images, setImages] = useState("")
    const [date, setDate] = useState("")

    const [editingId, setEditingId] = useState<string | null>(null)

    // โหลดข้อมูล event
    const fetchEvents = async () => {

        const res = await fetch(API)
        const data = await res.json()

        setEvents(data)

    }

    useEffect(() => {
        fetchEvents()
    }, [])

    // เพิ่ม Event
    const createEvent = async () => {

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventname,
                artist,
                location,
                images,
                date
            })
        })

        clearForm()
        fetchEvents()

    }

    // ลบ Event
    const deleteEvent = async (id: string) => {

        await fetch(`${API}/${id}`, {
            method: "DELETE"
        })

        fetchEvents()

    }

    // แก้ไข Event
    const updateEvent = async () => {

        await fetch(`${API}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventname,
                artist,
                location,
                images,
                date
            })
        })

        clearForm()
        fetchEvents()

    }

    // เลือก event เพื่อแก้ไข
    const editEvent = (event: any) => {

        setEditingId(event._id)

        setEventname(event.eventname)
        setArtist(event.artist)
        setLocation(event.location)
        setImages(event.images)
        setDate(event.date)

    }

    const clearForm = () => {

        setEditingId(null)

        setEventname("")
        setArtist("")
        setLocation("")
        setImages("")
        setDate("")

    }

    return (

        <div className="p-10 text-white">

            <h1 className="text-3xl font-bold mb-8">
                Admin Event Management
            </h1>

            {/* Form */}

            <div className="bg-[#111] p-6 rounded-xl mb-10">

                <h2 className="text-xl mb-4">

                    {editingId ? "Edit Event" : "Add Event"}

                </h2>

                <div className="grid grid-cols-5 gap-4">

                    <input
                        placeholder="Event name"
                        value={eventname}
                        onChange={(e) => setEventname(e.target.value)}
                        className="bg-black p-2"
                    />

                    <input
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="bg-black p-2"
                    />

                    <input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-black p-2"
                    />

                    <input
                        placeholder="Image URL"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        className="bg-black p-2"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-black p-2"
                    />

                </div>

                <div className="mt-4">

                    {editingId ? (

                        <button
                            onClick={updateEvent}
                            className="bg-yellow-500 px-4 py-2 rounded"
                        >
                            Update
                        </button>

                    ) : (

                        <button
                            onClick={createEvent}
                            className="bg-green-600 px-4 py-2 rounded"
                        >
                            Add Event
                        </button>

                    )}

                </div>

            </div>

            {/* ตาราง Event */}

            <table className="w-full text-left">

                <thead>

                    <tr className="border-b border-gray-700">

                        <th className="py-2">Event</th>
                        <th>Artist</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {events.map((event) => (
                        <tr key={event._id} className="border-b border-gray-800">

                            <td className="py-2">{event.eventname}</td>

                            <td>{event.artist}</td>

                            <td>{event.location}</td>

                            <td>{event.date}</td>

                            <td className="space-x-2">

                                <button
                                    onClick={() => editEvent(event)}
                                    className="bg-blue-600 px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteEvent(event._id)}
                                    className="bg-red-600 px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    )

}