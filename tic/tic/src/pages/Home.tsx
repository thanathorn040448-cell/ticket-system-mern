import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Music,
  Globe
} from 'lucide-react';

import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Globe,
  Music,
};

export const Home: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [events, setEvents] = useState<any[]>([])

  /* FETCH EVENTS FROM DATABASE */

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err))
  }, [])

  /* HERO EVENTS */

  const heroEvents = events.slice(0, 5)

  /* AUTO SLIDE */

  useEffect(() => {

    if (heroEvents.length === 0) return

    const interval = setInterval(() => {

      setCurrentSlide(prev =>
        prev === heroEvents.length - 1 ? 0 : prev + 1
      )

    }, 5000)

    return () => clearInterval(interval)

  }, [heroEvents.length])

  /* FILTER EVENTS */

  const filteredEvents = useMemo(() => {

    return events.filter((event: any) => {

      const name = event.eventname?.toLowerCase() || ''
      const location = event.location?.toLowerCase() || ''

      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) ||
        location.includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' ||
        event.category === selectedCategory

      return matchesSearch && matchesCategory

    })

  }, [events, searchQuery, selectedCategory])

  return (

    <div className="min-h-screen bg-[#050505]">

      {/* HERO */}

      {heroEvents.length > 0 && (

        <section className="relative h-[600px] overflow-hidden">

          <AnimatePresence mode="wait">

            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >

              <img
                src={heroEvents[currentSlide]?.images}
                className="w-full h-full object-cover opacity-60"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

            </motion.div>

          </AnimatePresence>

          <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-24">

            <motion.div
              key={heroEvents[currentSlide]?._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <span className="inline-block px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full mb-4 uppercase">
                Featured Event
              </span>

              <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold mb-4">

                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />

                {heroEvents[currentSlide]?.location}

              </div>

              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter leading-[0.9]">

                {heroEvents[currentSlide]?.eventname}

              </h1>

              <div className="flex gap-4">

                <Link
                  to={`/select-seats/${heroEvents[currentSlide]?._id}`}
                  className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all"
                >
                  จองตั๋วเลย
                </Link>

              </div>

            </motion.div>

          </div>

          {/* ARROWS */}

          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0
                  ? heroEvents.length - 1
                  : currentSlide - 1
              )
            }
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === heroEvents.length - 1
                  ? 0
                  : currentSlide + 1
              )
            }
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* DOTS */}

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">

            {heroEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full",
                  currentSlide === index
                    ? "bg-blue-500"
                    : "bg-white/30"
                )}
              />
            ))}

          </div>

        </section>

      )}

      {/* SEARCH + CATEGORY */}

      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">

        <div className="bg-[#121212] border border-white/10 rounded-3xl shadow-2xl p-8">

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

            <div className="flex flex-wrap gap-3">

              {CATEGORIES.map(cat => {

                const Icon = iconMap[cat.icon]

                return (

                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border",
                      selectedCategory === cat.id
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-400"
                    )}
                  >

                    <Icon className="w-4 h-4" />

                    {cat.name}

                  </button>

                )

              })}

            </div>

            <div className="relative w-full lg:w-96">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

              <input
                type="text"
                placeholder="ค้นหาคอนเสิร์ต..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-6 py-3 text-sm text-white"
              />

            </div>

          </div>

        </div>

      </section>

      {/* EVENTS GRID */}

      <section className="max-w-7xl mx-auto px-4 py-24">

        <div className="flex justify-between items-end mb-12">

          <div>

            <h2 className="text-3xl font-bold text-white mb-2">
              คอนเสิร์ตที่น่าสนใจ
            </h2>

            <p className="text-gray-500">
              งานแสดงสดที่คุณไม่ควรพลาด
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredEvents.slice(0, 5).map((event: any) => (

            <div
              key={event._id}
              className="group bg-[#121212] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all"
            >

              <div className="relative aspect-[4/5]">

                <img
                  src={event.images}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

              </div>

              <div className="p-6">

                <h3 className="text-lg font-bold text-white mb-3">
                  {event.eventname}
                </h3>

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

      </section>

    </div>

  )

}