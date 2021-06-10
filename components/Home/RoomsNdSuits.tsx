import React from 'react'
// import {room}
const roomsNdSuits = [
  {
    img: '/images/rooms/1.png',
    title: 'Guest Room',
  },
  {
    img: '/images/rooms/2.png',
    title: 'Suites'
  },
  {
    img: '/images/rooms/3.png',
    title: 'Accessible'
  },
]

const RoomsNdSuits = () => {
  return (
    <section className="bg-gray-light px-10 py-10 my-4">
      <h3 className="my-3 text-center text-primary-dark text-xl font-bold">
        Rooms and suites
      </h3>
      <div className="grid grid-cols-3 gap-2 items-center">
        {roomsNdSuits.map((room, i) => (
          <div className="relative" key={i} style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%), url(${room.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '90%',
            height: '300px'
          }}>
            <h3 style={{
              position: 'absolute',
              bottom: '2rem',
              left: 0,
              right: 0,
              margin: '0 auto',
              textAlign: 'center',
              color: '#fff',
              fontSize: '1.4rem',
              fontWeight: 600
            }}>{room.title}</h3>
          </div>
        ))}

      </div>
      <button className="btn-primary-dark text-white text-lg font-semibold capitalize mx-auto my-5 block">
        view all rooms
      </button>
    </section>
  )
}

export default RoomsNdSuits
