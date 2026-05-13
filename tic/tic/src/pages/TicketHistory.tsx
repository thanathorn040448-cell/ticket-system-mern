import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../apiUrl";

interface Ticket {
  id: string
  eventId: string
  seats: string[]
  totalPrice: number
  createdAt: string

  eventName: string
  artist: string
  location: string
  eventDate: string
  image?: string
}

export const TicketHistory = () => {

  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {

    if (!user) return

    fetch(`${API_URL}/bookings/user/${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setTickets(data)
        } else {
          setTickets([])
        }

      })
      .catch(err => console.error(err))

  }, [user])

  return (

    <div className="min-h-screen bg-[#050505] text-white p-10">

      <h1 className="text-3xl mb-10">
        ประวัติการซื้อตั๋ว
      </h1>

      {tickets.length === 0 && (
        <p className="text-gray-400">
          ยังไม่มีประวัติการซื้อ
        </p>
      )}

      <div className="space-y-6">

        {tickets.map(ticket => (

          <div
            key={ticket.id}
            className="bg-[#121212] rounded-2xl overflow-hidden flex gap-6 p-6 hover:bg-[#1a1a1a] transition items-center"
          >

            {/* IMAGE */}
            {ticket.image && (
              <img
                src={ticket.image}
                alt={ticket.eventName}
                className="w-40 h-40 object-cover rounded-xl"
              />
            )}

            {/* INFO */}
            <div className="flex flex-col justify-between flex-1">

              <div>

                <h2 className="text-2xl font-bold text-white mb-1">
                  {ticket.eventName}
                </h2>

                <p className="text-gray-400 text-sm">
                  ศิลปิน: {ticket.artist}
                </p>

                <p className="text-gray-400 text-sm">
                  สถานที่: {ticket.location}
                </p>

                <p className="text-gray-400 text-sm">
                  วันที่จัด: {ticket.eventDate}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  วันที่ซื้อ: {new Date(ticket.createdAt).toLocaleString()}
                </p>

              </div>
              {/* BOTTOM */}
              <div className="flex items-end justify-between mt-4">

                {/* SEATS */}
                <div className="flex gap-2 flex-wrap">
                  {ticket.seats.map(seat => (
                    <span
                      key={seat}
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {seat}
                    </span>
                  ))}
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    Total
                  </p>
                  <p className="text-blue-400 font-bold text-xl tracking-wide">
                    ฿{ticket.totalPrice}
                  </p>
                </div>

              </div>
            </div>

            {/* QR CODE */}
            <div className="flex flex-col items-center gap-2">

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticket.eventId}-${ticket.seats.join("-")}`}
                alt="QR Code"
                className="w-28 h-28 bg-white p-2 rounded-lg"
              />

              <p className="text-xs text-gray-400">
                Scan Ticket
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}