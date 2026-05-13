import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar } from 'lucide-react'
import { API_URL } from '../apiUrl'

interface EventType {
  _id: string
  eventname: string
  images: string
  artist: string
  location: string
  date: string

}

export const Concerts: React.FC = () => {

  const [events, setEvents] = useState<EventType[]>([])

  useEffect(() => {

    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.log(err))

  }, [])

  return (

    <div className="min-h-screen bg-[#050505] py-24">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-white mb-16">
          คอนเสิร์ตทั้งหมด
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {events.map(event => (

            <div
              key={event._id}
              className="group bg-[#121212] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all"
            >

              <div className="relative aspect-[4/5]">

                <img
                  src={event.images}
                  alt={event.eventname}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

              </div>

              <div className="p-6">

                <h3 className="text-lg font-bold text-white mb-3">
                  {event.eventname}
                </h3>

                <p className="text-sm text-gray-400 mb-3">
                  {event.artist}
                </p>

                <div className="space-y-2 mb-6">

                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {event.location}
                  </p>

                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {event.date}
                  </p>

                </div>

                <Link
                  to={`/select-seats/${event._id}`}
                  className="px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all"
                >
                  จองเลย
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}