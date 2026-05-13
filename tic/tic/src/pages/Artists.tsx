import { useEffect, useState } from "react";

interface Artist {
  _id: string
  name: string
  image: string
}

export const Artists = () => {

  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {

    fetch("http://localhost:3000/artists")
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setArtists(data)
        }

      })
      .catch(err => console.error(err))

  }, [])

  return (

    <div className="min-h-screen bg-[#050505] text-white p-10">

      <h1 className="text-3xl mb-10">
        Artists
      </h1>

      <div className="grid grid-cols-3 gap-10">

        {artists.map(a => (

          <div key={a._id} className="text-center hover:scale-105 transition">

            <img
              src={a.image}
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />

            <p className="mt-4">
              {a.name}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}