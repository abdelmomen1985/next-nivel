import React from 'react'

const AmenitiesSection = () => {
  return (
    <section className="mt-10 mb-5  w-full">
      <h3 className="text-center text-2xl text-black font-semibold mb-5">Our Amenities</h3>
      <div className="grid grid-cols-5 gap-3 items-center">
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/outline/room-service.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">Room Service</h5>
        </div>
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/outline/gym.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">Fitness center</h5>
        </div>
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/outline/swimming-pool.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">swimming pool</h5>
        </div>
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/outline/restaurant.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">On-site restaurant</h5>
        </div>
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/outline/Group.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">conference room</h5>
        </div>
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/outline/food-cart.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">Concierge</h5>
        </div>
        <div className="mx-2 my-2 rounded-md w-11/12 h-full border py-4 px-5 border-gray-400">
          <img src="/images/icons/stroke/meeting.svg" className="w-16 my-4 mx-auto" />
          <h5 className="text-primary-light text-center mx-auto mt-2 mb-4 text-lg font-medium capitalize">Business center</h5>
        </div>
      </div>
    </section>
  )
}

export default AmenitiesSection
