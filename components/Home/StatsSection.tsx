import React from 'react'

const StatsSection = () => {

  return (
    <section className="px-16 py-5 mt-0 mb-5 bg-gray-light">
      <div className="flex flex-wrap justify-between items-center mx-16">
        <div className="mx-auto">
          <h4 className="text-gray-dark text-lg uppercase font-medium u text-primary-dark">Reviews</h4>
          <p className="text-primary-dark">Based on 1,500 reviews</p>
          <h5><span>4.5</span><span>|</span><span className="ml-1 text-primary-dark">5 Reviews</span></h5>
        </div>
        <div className="mx-auto">
          <h4 className="text-gray-dark text-lg uppercase font-medium">Call us</h4>
          <h5 className="text-black text-lg mt-1">+966 12 556 7000</h5>
        </div>
        <div className="mx-auto">
          <h4 className="text-gray-dark text-lg uppercase font-medium">address</h4>
          <p className="text-black text-lg mt-1 w-full md:w-1/2">Jabal Omar Ibrahim Al Khalil
            Makkah, 21955, Saudi Arabia</p>
        </div>
        <div className="mx-auto">
          <h4 className="text-gray-dark text-lg uppercase font-medium">arrival time</h4>
          <div className="flex flex-wrap justify-center items-center mt-1">
            <div className="border-r border-gray-400 pr-4">
              <h3 className="text-black text-lg font-medium">Check-in</h3>
              <h5 className="text-gray-400 text-lg font-medium">4:00 PM</h5>
            </div>
            <div className="ml-2">
              <h3 className="text-black text-lg font-medium">Check-in</h3>
              <h5 className="text-gray-400 text-lg font-medium">4:00 PM</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
