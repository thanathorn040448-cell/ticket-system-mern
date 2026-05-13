import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, QrCode, Wallet, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from "../context/AuthContext";

export const Checkout: React.FC = () => {


  const { user } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [paymentMethod, setPaymentMethod] =
    useState<'card' | 'qr' | 'wallet'>('card')

  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")




  const { event, selectedSeats = [], totalPrice = 0 } =
    (location.state as any) || {}

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        ไม่พบข้อมูล
      </div>
    )
  }

  const basePrice = totalPrice > 50 ? totalPrice - 50 : 0
  const serviceFee = 50
  const vat = basePrice * 0.07
  const finalTotal = basePrice + serviceFee + vat

  const handlePayment = async () => {

    // บันทึกลง MongoDB
    try {

      console.log("PAYMENT CLICKED");

      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userEmail: user?.email,
          eventId: id,
          seats: selectedSeats,
          totalPrice: finalTotal
        })
      });

      const data = await res.json();
      console.log("BOOKING RESULT:", data);

    } catch (err) {
      console.error("BOOKING ERROR:", err);
    }

    // backup เก็บ localStorage เหมือนเดิม
    const ticket = {
      id: Date.now(),
      event,
      seats: selectedSeats,
      total: finalTotal,
      date: new Date().toLocaleString()
    }

    const existing =
      JSON.parse(localStorage.getItem("tickets") || "[]")

    localStorage.setItem(
      "tickets",
      JSON.stringify([...existing, ticket])
    )

    navigate('/confirmation', {
      state: { event, selectedSeats, finalTotal }
    })

  }

  return (

    <div className="min-h-screen bg-[#050505] py-12">

      <div className="max-w-5xl mx-auto px-4">

        <div className="flex items-center gap-4 mb-10">

          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/5 rounded-xl"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-2xl text-white font-bold">
            Checkout
          </h1>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* PAYMENT METHOD */}

          <div className="bg-[#121212] p-10 rounded-3xl">

            <h2 className="text-white text-xl mb-6">
              วิธีการชำระเงิน
            </h2>

            <div className="space-y-4 mb-8">

              <button
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "w-full p-6 rounded-xl border text-left",
                  paymentMethod === "card"
                    ? "border-blue-500"
                    : "border-white/10"
                )}
              >
                <CreditCard className="inline mr-2" />
                บัตรเครดิต / เดบิต
              </button>

              <button
                onClick={() => setPaymentMethod("qr")}
                className={cn(
                  "w-full p-6 rounded-xl border text-left",
                  paymentMethod === "qr"
                    ? "border-blue-500"
                    : "border-white/10"
                )}
              >
                <QrCode className="inline mr-2" />
                QR PromptPay
              </button>

              <button
                onClick={() => setPaymentMethod("wallet")}
                className={cn(
                  "w-full p-6 rounded-xl border text-left",
                  paymentMethod === "wallet"
                    ? "border-blue-500"
                    : "border-white/10"
                )}
              >
                <Wallet className="inline mr-2" />
                E-Wallet
              </button>

            </div>


            {/* CREDIT CARD FORM */}

            {paymentMethod === "card" && (

              <div className="space-y-4">

                <input
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white"
                />

                <input
                  placeholder="Card Holder"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 rounded-xl text-white"
                />

                <div className="grid grid-cols-2 gap-4">

                  <input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    className="px-4 py-3 bg-white/5 rounded-xl text-white"
                  />

                  <input
                    placeholder="CVV"
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                    className="px-4 py-3 bg-white/5 rounded-xl text-white"
                  />

                </div>

              </div>

            )}


            {/* PROMPTPAY QR */}

            {paymentMethod === "qr" && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-6"
              >

                <div className="bg-white p-6 rounded-2xl inline-block">

                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PromptPayFakePayment"
                    alt="PromptPay QR"
                  />

                </div>

                <p className="text-gray-400 mt-4">
                  สแกน QR เพื่อชำระเงิน
                </p>

              </motion.div>

            )}


            {/* E WALLET */}

            {paymentMethod === "wallet" && (

              <div className="mt-6 text-gray-500 space-y-2">

                <p className="opacity-50">
                  TrueMoney Wallet
                </p>

                <p className="opacity-50">
                  LINE Wallet
                </p>

              </div>

            )}

          </div>


          {/* ORDER SUMMARY */}

          <div className="bg-[#121212] p-10 rounded-3xl">

            <h2 className="text-white text-xl mb-8">
              Order Summary
            </h2>

            <p className="text-white font-bold mb-2">
              {event.title}
            </p>

            <p className="text-gray-400 mb-6">
              Seats: {selectedSeats.join(", ")}
            </p>

            <div className="space-y-2 mb-8">

              <div className="flex justify-between text-gray-400">
                <span>ค่าบัตร</span>
                <span>฿{basePrice}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Service Fee</span>
                <span>฿{serviceFee}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>VAT</span>
                <span>฿{vat.toFixed(2)}</span>
              </div>

            </div>

            <div className="flex justify-between text-white text-xl font-bold mb-6">

              <span>Total</span>
              <span>฿{finalTotal.toFixed(2)}</span>

            </div>

            <button
              onClick={handlePayment}
              className="w-full py-4 bg-blue-600 rounded-xl text-white font-bold"
            >
              ชำระเงิน
            </button>

          </div>

        </div>

      </div>

    </div>

  )

}