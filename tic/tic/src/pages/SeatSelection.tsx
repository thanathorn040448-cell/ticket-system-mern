import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ChevronRight, Info, ShieldCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from "../context/AuthContext"

export const SeatSelection: React.FC = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth()

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [event, setEvent] = useState<any>(null);

  /* โหลด seats จาก localStorage */

  useEffect(() => {
    const saved = localStorage.getItem("selectedSeats");
    if (saved) setSelectedSeats(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  /* โหลด event จาก database */

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err))
  }, [id]);

  /* zones */

  const zones = useMemo(() => [
    { name: 'VIP ZONE (฿5,500)', type: 'VIP', rows: 2, cols: 12, price: 5500 },
    { name: 'GOLD ZONE (฿3,500)', type: 'GOLD', rows: 3, cols: 14, price: 3500 },
    { name: 'SILVER ZONE (฿1,500)', type: 'SILVER', rows: 4, cols: 16, price: 1500 },
  ], []);

  /* toggle seat */

  const toggleSeat = (seatId: string) => {

    setSelectedSeats(prev => {

      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      }

      if (prev.length >= 4) {
        alert("เลือกที่นั่งได้สูงสุด 4 ใบ");
        return prev;
      }

      return [...prev, seatId];

    });

  };

  /* calculate price */

  const calculateTotal = () => {

    let total = 0;

    selectedSeats.forEach(seatId => {

      const type = seatId.split('-')[0];
      const zone = zones.find(z => z.type === type);

      if (zone) total += zone.price;

    });

    return total > 0 ? total + 50 : 0;

  };

  /* loading */

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#050505] py-12">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT : EVENT INFO */}

          <div className="lg:w-1/3 space-y-8">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#121212] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >

              <div className="relative h-64">

                <img
                  src={event.images}
                  className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />

              </div>

              <div className="p-8">

                <h1 className="text-2xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {event.eventname}
                </h1>

                <div className="space-y-5">

                  <div className="flex items-start gap-4">

                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>

                    <div>
                      <p className="font-bold text-white">{event.date}</p>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>

                    <div>
                      <p className="font-bold text-white">{event.location}</p>
                      <p className="text-sm text-gray-500">Bangkok, Thailand</p>
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* Booking Info */}

            <div className="space-y-6">


              <div className="flex items-center gap-2 text-white font-bold">
                <Info className="w-4 h-4 text-blue-500" />
                <h3>ข้อมูลการจอง (Booking Info)</h3>
              </div>

              <ul className="space-y-3 text-sm text-gray-500">
                <li>จำกัดการซื้อสูงสุด 4 ใบ</li>
                <li>บัตรทุกใบเป็นบัตรระบุที่นั่ง</li>
                <li>ราคาบัตรยังไม่รวมค่าธรรมเนียม</li>
              </ul>

            </div>

          </div>

          {/* RIGHT : SEAT MAP */}

          <div className="flex-1 space-y-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl"
            >

              <div className="text-center mb-16">

                <h2 className="text-3xl font-bold text-white mb-12">
                  เลือกที่นั่งของคุณ
                </h2>

                <div className="space-y-16">

                  {/* STAGE */}

                  <div className="flex justify-center">
                    <div className="w-full max-w-2xl">

                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] text-center mb-3">
                        STAGE
                      </p>

                      <div className="
        h-12 
        rounded-t-[40px] 
        border 
        border-blue-400/60
        bg-gradient-to-b 
        from-blue-400/10 
        to-blue-500/5
        flex 
        items-center 
        justify-center 
        text-sm 
        font-bold 
        text-blue-300
        shadow-[0_0_25px_rgba(59,130,246,0.6)]
      ">
                        เวที
                      </div>

                    </div>
                  </div>

                  {/* ZONES */}

                  {zones.map((zone) => (

                    <div key={zone.name} className="space-y-6">

                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                        {zone.name}
                      </p>

                      <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">

                        {Array.from({ length: zone.rows * zone.cols }).map((_, i) => {

                          const seatId = `${zone.type}-${i}`;
                          const isSelected = selectedSeats.includes(seatId);
                          const isSold = (i + (zone.type === 'VIP' ? 3 : 5)) % 8 === 0;

                          return (

                            <button
                              key={seatId}
                              disabled={isSold}
                              onClick={() => toggleSeat(seatId)}
                              className={cn(
                                "w-6 h-6 rounded-md border transition-all",
                                isSold ? "bg-white/5 border-white/5 opacity-20" :
                                  isSelected ? "bg-blue-500 border-blue-500" :
                                    zone.type === 'VIP' ? "border-amber-500/50" :
                                      zone.type === 'GOLD' ? "border-cyan-500/30" :
                                        "border-white/10"
                              )}
                            />

                          );

                        })}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </motion.div>

            {/* SUMMARY */}

            <div className="bg-[#121212] border border-white/10 rounded-[40px] p-8 md:p-12">

              <h3 className="text-xl font-bold text-white mb-8">
                สรุปรายการเลือกที่นั่ง
              </h3>

              <div className="space-y-5 mb-10">

                {selectedSeats.length === 0 && (
                  <p className="text-gray-500">ยังไม่ได้เลือกที่นั่ง</p>
                )}

                {selectedSeats.map(seatId => {

                  const type = seatId.split('-')[0];
                  const zone = zones.find(z => z.type === type);

                  return (

                    <div key={seatId} className="flex justify-between text-sm">

                      <span className="text-gray-400">
                        {type} Seat {seatId.split('-')[1]}
                      </span>

                      <span className="text-white font-bold">
                        ฿{zone?.price.toLocaleString()}
                      </span>

                    </div>

                  )

                })}

                <div className="flex justify-between text-lg font-bold text-blue-500">

                  <span>Total</span>
                  <span>฿{calculateTotal().toLocaleString()}</span>

                </div>

                <button
                  onClick={() => {

                    if (!user) {
                      navigate("/login")
                      return
                    }

                    navigate(`/checkout/${id}`, {
                      state: {
                        event,
                        selectedSeats,
                        totalPrice: calculateTotal()
                      }
                    })

                  }}
                  disabled={selectedSeats.length === 0}
                  className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2
  ${user ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-600 text-gray-300 cursor-not-allowed"}
  `}
                >
                  ดำเนินการชำระเงิน
                  <ChevronRight className="w-4 h-4" />
                </button>
                {!user && (
                  <p className="text-sm text-red-400 mt-3 text-center">
                    กรุณาเข้าสู่ระบบก่อนดำเนินการชำระเงิน
                  </p>
                )}
                <p className="text-[10px] text-gray-600 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Secure SSL Transaction
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};