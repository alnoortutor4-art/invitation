"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const Animations = () => (
  <style jsx>{`
    @keyframes petalFloat {
      0%   { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
      10%  { opacity: 0.8; }
      80%  { opacity: 0.6; }
      100% { transform: translateY(-110vh) translateX(30px) rotate(360deg); opacity: 0; }
    }
    @keyframes petalFloat2 {
      0%   { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
      10%  { opacity: 0.7; }
      80%  { opacity: 0.5; }
      100% { transform: translateY(-110vh) translateX(-40px) rotate(-300deg); opacity: 0; }
    }
    @keyframes petalFloat3 {
      0%   { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
      10%  { opacity: 0.9; }
      80%  { opacity: 0.4; }
      100% { transform: translateY(-110vh) translateX(20px) rotate(280deg); opacity: 0; }
    }
    @keyframes petalDrift {
      0%   { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
      10%  { opacity: 0.6; }
      50%  { transform: translateY(-55vh) translateX(-25px) rotate(180deg); opacity: 0.5; }
      100% { transform: translateY(-110vh) translateX(15px) rotate(360deg); opacity: 0; }
    }

    .petal-1  { animation: petalFloat  9s ease-in-out infinite; }
    .petal-2  { animation: petalFloat2 11s ease-in-out infinite 1.5s; }
    .petal-3  { animation: petalDrift  8s ease-in-out infinite 3s; }
    .petal-4  { animation: petalFloat3 13s ease-in-out infinite 0.5s; }
    .petal-5  { animation: petalFloat  10s ease-in-out infinite 4s; }
    .petal-6  { animation: petalDrift  7s ease-in-out infinite 2s; }
    .petal-7  { animation: petalFloat2 12s ease-in-out infinite 5s; }
    .petal-8  { animation: petalFloat3 9s ease-in-out infinite 1s; }
    .petal-9  { animation: petalDrift  11s ease-in-out infinite 6s; }
    .petal-10 { animation: petalFloat  8s ease-in-out infinite 3.5s; }
    .petal-11 { animation: petalFloat2 14s ease-in-out infinite 2.5s; }
    .petal-12 { animation: petalDrift  10s ease-in-out infinite 7s; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.05); }
    }

    .fade-in { animation: fadeIn 0.8s ease-out; }
    .pulse   { animation: pulse 2s ease-in-out infinite; }
  `}</style>
)

// SVG flower petal shapes
const Petal = ({ className, color }: { className: string; color: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.10))" }}
  >
    <ellipse cx="12" cy="12" rx="5" ry="11" />
    <ellipse cx="12" cy="12" rx="11" ry="5" />
  </svg>
)

const FloatingPetals = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Warm dusty rose petals */}
    <Petal className="petal-1 absolute bottom-0 left-[8%] w-5 h-5 opacity-70" color="#d4a5a5" />
    <Petal className="petal-4 absolute bottom-0 left-[22%] w-4 h-4 opacity-60" color="#d4a5a5" />
    <Petal className="petal-7 absolute bottom-0 left-[65%] w-6 h-6 opacity-70" color="#d4a5a5" />
    <Petal className="petal-10 absolute bottom-0 left-[85%] w-4 h-4 opacity-55" color="#e8dcc8" />

    {/* Warm terracotta petals */}
    <Petal className="petal-2 absolute bottom-0 left-[35%] w-5 h-5 opacity-65" color="#a47060" />
    <Petal className="petal-5 absolute bottom-0 left-[50%] w-4 h-4 opacity-55" color="#f0e6d8" />
    <Petal className="petal-8 absolute bottom-0 left-[75%] w-6 h-6 opacity-60" color="#9b6b5c" />

    {/* Cream/white petals */}
    <Petal className="petal-3 absolute bottom-0 left-[14%] w-4 h-4 opacity-50" color="#ffffff" />
    <Petal className="petal-9 absolute bottom-0 left-[58%] w-5 h-5 opacity-45" color="#f0e6d8" />

    {/* Warm beige petals */}
    <Petal className="petal-6 absolute bottom-0 left-[42%] w-4 h-4 opacity-55" color="#e8dcc8" />
    <Petal className="petal-11 absolute bottom-0 left-[28%] w-5 h-5 opacity-50" color="#d4a5a5" />
    <Petal className="petal-12 absolute bottom-0 left-[92%] w-4 h-4 opacity-60" color="#a47060" />
  </div>
)

export default function Component() {
  const [currentPage, setCurrentPage] = useState("cover")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const targetDate = new Date("2026-04-03T16:30:00").getTime()
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSaveTheDate = () => {
    const eventDetails = {
      title: "Nikkah Ceremony - Syed Usman Hussain & Shafaq Amin",
      start: "20260403T163000",
      end: "20260403T193000",
      description: "Join us for the Nikkah Ceremony of Syed Usman Hussain and Shafaq Amin. Your presence will add joy to our special day.",
      location: "Quran Academy Yaseenabad branch",
    }
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`
    const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&startdt=${eventDetails.start}&enddt=${eventDetails.end}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Nikkah Invitation//EN\nBEGIN:VEVENT\nUID:nikkah-${Date.now()}@invitation.com\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\nDTSTART:${eventDetails.start}Z\nDTEND:${eventDetails.end}Z\nSUMMARY:${eventDetails.title}\nDESCRIPTION:${eventDetails.description}\nLOCATION:${eventDetails.location}\nEND:VEVENT\nEND:VCALENDAR`

    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      const blob = new Blob([icsContent], { type: "text/calendar" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "nikkah-ceremony.ics"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else if (userAgent.includes("android")) {
      window.open(googleCalendarUrl, "_blank")
    } else {
      const choice = confirm("Choose your calendar:\nOK for Google Calendar\nCancel for Outlook Calendar")
      if (choice) window.open(googleCalendarUrl, "_blank")
      else window.open(outlookCalendarUrl, "_blank")
    }
  }

  const handleLocationClick = () => {
    window.open("https://maps.app.goo.gl/KeQ4oc18Y9uwfXTr5?g_st=aw", "_blank")
  }

  const handleRSVPClick = () => {
    const phoneNumber = "923118335838"
    const message = encodeURIComponent("Assalamualaikum! I would like to confirm my attendance for the Nikkah ceremony of Syed Usman Hussain & Shafaq Amin on 3rd April 2026.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleOpenInvitation = async () => {
    setCurrentPage("loading")
    setLoadingProgress(0)

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 2

        if (newProgress >= 50 && prev < 50) {
          ;(async () => {
            try {
              const audioSrc = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0627%282%29-fHKFYsFQhHNnJVWGHooruickURw9h3.MP3"
              const audio = new Audio()
              audio.crossOrigin = "anonymous"
              audio.loop = true
              audio.volume = 0.7
              audio.preload = "auto"
              audioRef.current = audio

              audio.addEventListener("error", (e) => { console.error("Audio error:", e) })

              audio.src = audioSrc

              await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error("Audio loading timeout")), 10000)
                audio.addEventListener("canplaythrough", () => { clearTimeout(timeout); resolve(true) }, { once: true })
                audio.addEventListener("error", () => { clearTimeout(timeout); reject(new Error("Audio loading failed")) }, { once: true })
                audio.load()
              })

              const playPromise = audio.play()
              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  const playOnInteraction = () => {
                    audio.play().then(() => {
                      document.removeEventListener("click", playOnInteraction)
                      document.removeEventListener("touchstart", playOnInteraction)
                    }).catch(() => {})
                  }
                  document.addEventListener("click", playOnInteraction, { once: true })
                  document.addEventListener("touchstart", playOnInteraction, { once: true })
                })
              }
            } catch (error) {
              console.error("Audio setup failed:", error)
            }
          })()
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setCurrentPage("invitation"), 500)
          return 100
        }
        return newProgress
      })
    }, 60)
  }

  // ─── Cover Page ───────────────────────────────────────────────────────────────
  if (currentPage === "cover") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0e6d8] via-[#e8dcc8] to-[#f0e6d8] flex items-center justify-center p-4 relative overflow-hidden">
        <Animations />
        <FloatingPetals />

        <div style={{ display: "none" }}>
          <audio ref={audioRef} preload="auto" />
        </div>

        <div className="text-center space-y-12 max-w-md mx-auto relative z-10">
          <h1
            className="text-5xl text-[#9b6b5c] font-normal leading-tight"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Nikkah Invitation
          </h1>

          {/* Monogram */}
          <div className="relative pulse">
            <div className="w-80 h-80 mx-auto rounded-full bg-white/90 backdrop-blur-sm p-4 shadow-2xl ring-4 ring-[#d4a5a5]/60">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/monogram.png"
                  alt="U & S Monogram"
                  className="w-full h-full object-cover rounded-full"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
            {/* Decorative petals around monogram */}
            <Petal className="absolute top-6 right-10 w-6 h-6 opacity-50" color="#d4a5a5" />
            <Petal className="absolute bottom-10 left-6 w-5 h-5 opacity-50" color="#d4a5a5" />
            <Petal className="absolute top-20 left-10 w-4 h-4 opacity-40" color="#e8dcc8" />
            <Petal className="absolute bottom-18 right-6 w-4 h-4 opacity-45" color="#a47060" />
          </div>

          <div
            className="text-3xl text-[#9b6b5c] font-normal tracking-wider"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            ٱلْـحَـمْدُ لِلّٰهِ
          </div>

          <div className="pt-2">
            <Button
              onClick={handleOpenInvitation}
              className="bg-[#a47060] hover:bg-[#9b6b5c] text-white rounded-full px-12 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Open Invitation
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Loading Page ─────────────────────────────────────────────────────────────
  if (currentPage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0e6d8] via-[#e8dcc8] to-[#f0e6d8] flex items-center justify-center p-4 relative overflow-hidden">
        <Animations />
        <FloatingPetals />

        <div className="text-center space-y-12 max-w-md mx-auto relative z-10">
          <div className="relative pulse">
            <div className="w-64 h-64 mx-auto rounded-full bg-white/90 backdrop-blur-sm p-4 shadow-2xl ring-4 ring-[#d4a5a5]/60">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/monogram.png"
                  alt="U & S Monogram"
                  className="w-full h-full object-cover rounded-full"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-2xl text-[#9b6b5c] font-normal" style={{ fontFamily: "Great Vibes, cursive" }}>
              Loading Invitation...
            </div>
            <div className="w-full max-w-xs mx-auto">
              <div className="bg-white/50 rounded-full h-3 shadow-inner">
                <div
                  className="bg-gradient-to-r from-[#d4a5a5] to-[#a47060] h-3 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div
                className="text-lg font-semibold text-[#9b6b5c] mt-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {loadingProgress}%
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Main Invitation Page ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d8] via-[#e8dcc8] to-[#f0e6d8] p-4 relative overflow-hidden fade-in">
      <Animations />
      <FloatingPetals />

      {/* Back Button */}
      <div className="fixed top-4 left-4 z-20">
        <Button
          onClick={() => {
            setCurrentPage("cover")
            // Stop audio when going back
            if (audioRef.current) {
              audioRef.current.pause()
              audioRef.current.currentTime = 0
              audioRef.current = null
            }
          }}
          variant="outline"
          className="bg-white/90 backdrop-blur-sm border-[#d4b9a8] text-gray-700 hover:bg-[#f5e6d3] hover:border-[#c9a896] rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          ← Back
        </Button>
      </div>

      {/* Hero Section */}
      <div className="max-w-md mx-auto text-center py-12 space-y-8 relative z-10">
        <div className="space-y-4">
          <div
            className="text-gray-600 tracking-widest font-light leading-7 text-3xl"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </div>
          <div className="italic font-light text-slate-700 text-base" style={{ fontFamily: "Playfair Display, serif" }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </div>
          <h1
            className="text-4xl text-[#a47060] font-normal leading-tight"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Nikkah Mubarak
          </h1>
          <div
            className="font-light leading-relaxed text-slate-900 text-base"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Assalamualaikum Warahmatullahi Wabarakatuh
          </div>
        </div>

        <div className="space-y-4 px-4">
          <div
            className="font-light leading-relaxed text-lg text-black"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Mr. & Mrs. Syed Imran Hussain and Mr. & Mrs. Muhammad Amin

request the pleasure of your company at the Nikkah Ceremony of their beloved children

Syed Usman Hussain & Shafaq Amin
          </div>
        </div>

        {/* Couple Illustration */}
        <div className="relative">
          <div className="w-72 h-72 mx-auto rounded-full bg-gradient-to-br from-[#d4a5a5] via-[#c9a89c] to-[#b89888] p-3 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
              <img
                src="/couple-sitting.png"
                alt="Couple sitting together"
                className="w-full h-full object-cover rounded-full"
                crossOrigin="anonymous"
              />
            </div>
          </div>
          {/* Decorative elements - subtle accents */}
          <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-[#9b7a8c] opacity-40"></div>
          <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-[#b89888] opacity-50"></div>
        </div>

        {/* Couple Names */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2
              className="text-5xl text-gray-800 font-normal leading-none"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Syed Usman Hussain
            </h2>
            <div className="text-sm font-light tracking-wide text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Son of Syed Imran Hussain
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#d4a5a5]"></div>
            <div className="text-3xl font-light text-[#9b6b5c]" style={{ fontFamily: "Playfair Display, serif" }}>
              with
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#d4a5a5]"></div>
          </div>

          <div className="space-y-2">
            <h2
              className="text-5xl text-gray-800 font-normal leading-none"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Shafaq Amin
            </h2>
            <div className="text-sm font-light tracking-wide text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Daughter of Muhammad Amin
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="space-y-4">
          <h3 className="text-2xl text-[#9b6b5c] font-normal" style={{ fontFamily: "Great Vibes, cursive" }}>
            Countdown
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/80 rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {value}
                </div>
                <div className="text-xs text-gray-500" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save The Date */}
        <div className="space-y-4">
          <Button
            onClick={handleSaveTheDate}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-[#d4b9a8] text-gray-700 hover:bg-[#f5e6d3] hover:border-[#c9a896] rounded-full px-8 py-3 text-sm font-medium shadow-lg transition-all duration-300"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            📅 Save The Date
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center space-y-3 pt-12">
          <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
          <div className="text-sm text-gray-500 font-light tracking-wide" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Scroll Down
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
        </div>
      </div>

      {/* Details Card */}
      <div className="max-w-md mx-auto relative z-10">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-10 space-y-10">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div
                  className="text-gray-700 font-light leading-relaxed"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  By asking for the grace and blessing of Allah Subhanahu Wa Ta'ala, God willing, we will hold an event:
                </div>
                <h3
                  className="text-3xl font-normal text-gray-800 leading-relaxed"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Nikkah Ceremony
                </h3>
              </div>

              <div className="space-y-8">
                {/* Date — clickable for calendar reminder */}
                <div
                  onClick={handleSaveTheDate}
                  className="flex flex-col items-center space-y-3 p-6 border border-[#d4a5a5]/60 rounded-2xl bg-gradient-to-br from-white to-[#f0e6d8]/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <Calendar className="w-8 h-8 mb-2 text-[#a47060]" />
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 mb-1 text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                      Date
                    </div>
                    <div className="text-lg text-gray-600 font-light" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Friday, 3 April 2026
                    </div>
                    <div className="text-xs text-[#a47060] mt-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Tap to set reminder
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex flex-col items-center space-y-3 p-6 border border-[#d4a5a5]/60 rounded-2xl bg-gradient-to-br from-white to-[#f0e6d8]/40 shadow-sm hover:shadow-md transition-all duration-300">
                  <Clock className="w-8 h-8 mb-2 text-[#a47060]" />
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 mb-1 text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                      Time
                    </div>
                    <div className="text-lg text-gray-600 font-light" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Baad Namaz e Asr
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex flex-col items-center space-y-4 p-6 border border-[#d4a5a5]/60 rounded-2xl bg-gradient-to-br from-white to-[#f0e6d8]/40 shadow-sm hover:shadow-md transition-all duration-300">
                  <MapPin className="w-8 h-8 mb-2 text-[#a47060]" />
                  <div className="text-center space-y-3">
                    <div className="font-semibold text-gray-800 text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                      Venue
                    </div>
                    <div className="text-lg leading-relaxed text-black font-normal" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      Quran Academy
                      <br />
                      Yaseenabad Branch
                    </div>
                    <Button
                      onClick={handleLocationClick}
                      className="bg-[#a47060] hover:bg-[#8a5c50] text-white rounded-full px-8 py-2.5 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-4"
                    >
                      📍 Location
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-[#d4b9a8] to-transparent h-px" />

            {/* Islamic Quote */}
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-[#f5e6d3]/30 to-[#e8dcc8]/30 rounded-lg">
              <div
                className="leading-relaxed text-base font-light text-slate-600"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Allah Subhanahu Wa Ta'ala says:
              </div>
              <div
                className="leading-relaxed text-lg font-light italic text-black"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "And among His signs is that He created for you mates from among yourselves, that you may dwell in
                tranquility with them, and He placed between you affection and mercy. Indeed, in that are signs for a
                people who give thought."
              </div>
              <div
                className="text-sm text-gray-500 font-medium tracking-wide"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                — Surah Ar-Rum (30:21)
              </div>
            </div>

            {/* RSVP */}
            <div className="text-center space-y-4 p-6 bg-gradient-to-br from-[#f0e6d8]/20 to-transparent rounded-lg">
              <div className="font-semibold text-gray-800 text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                RSVP
              </div>
              <div className="text-lg text-gray-600 font-light mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                +92 311 8335838
              </div>
              <Button
                onClick={handleRSVPClick}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-2.5 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Usman
                </span>
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 pt-6 border-t border-[#d4b9a8]">
              <div className="mb-8 font-light text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Your presence will add joy to our special day
              </div>
              <div
                className="font-normal text-xl text-slate-600"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                ٱلْـحَـمْدُ لِلّٰهِ رَبِّ ٱلْعَٰلَمِينَ
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-16"></div>
    </div>
  )
}
