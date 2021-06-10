import React from 'react'
import clsx from 'clsx'
import styles from './home.module.scss'
const Dining = () => {

  return (
    <section className="my-8 w-full py-4 px-5 bg-white">
      <div className="my-4 text-center mx-auto">
        <h2 className="text-primary-dark text-xl my-2 font-semibold">Dining and drinks</h2>
        <p className="font-normal text-base text-black w-full md:w-2/4 mx-auto text-center">Our dining options include three comfortable cafes serving light bites, coffee, and other beverages throughout the day. Alorchid Restaurant offers a range of pan-Asian cuisine while Alqandeel has a range of buffet and a la carte options as well as live cooking stations.</p>
      </div>
      <div className={"my-5 w-full"}
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(240, 100, 150, 0.2) 60%, rgba(140, 200, 208, 0.3) 40%), url(/images/restaurant.png)`,
          height: '500px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
      </div>
      <button className="btn-primary-dark text-white text-lg font-semibold capitalize mx-auto my-5 block">
        view all Dining
      </button>
    </section>
  )
}

export default Dining
