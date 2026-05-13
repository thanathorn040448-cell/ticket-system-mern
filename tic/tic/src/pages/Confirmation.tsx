import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, QrCode, Download, Share2, Home, MapPin, Ticket, Bell } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Confirmation: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { event, selectedSeats = [], finalTotal = 0 } =
    (location.state as any) || {};

  useEffect(() => {

    if (!event) return;

    const ticket = {
      id: Date.now(),
      event,
      seats: selectedSeats,
      total: finalTotal,
      date: new Date().toLocaleString()
    };

    const existing =
      JSON.parse(localStorage.getItem("tickets") || "[]");

    const exists =
      existing.some((t: any) => t.id === ticket.id);

    if (!exists) {
      localStorage.setItem(
        "tickets",
        JSON.stringify([...existing, ticket])
      );
    }

  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center space-y-6">
          <p className="text-gray-500">ไม่พบข้อมูลการจอง</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-blue-600 text-white rounded-full"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] py-12 font-sans">

      <div className="max-w-3xl mx-auto px-4">

        <div className="text-center text-white space-y-6">

          <CheckCircle2 size={80} className="mx-auto text-blue-500" />

          <h1 className="text-3xl font-bold">
            จองตั๋วสำเร็จ!
          </h1>

          <p className="text-gray-400">
            {event.title}
          </p>

          <p className="text-gray-400">
            Seats: {selectedSeats.join(", ")}
          </p>
          <div className="bg-white p-6 rounded-2xl inline-block">

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PromptPayFakePayment"
              alt="PromptPay QR"
            />

          </div>

          <p className="text-xl text-blue-400">
            ฿{finalTotal}
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 rounded-xl"
          >
            กลับหน้าหลัก
          </button>

        </div>

      </div>

    </div>
  );
};