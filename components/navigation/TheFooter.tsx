import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSnapchat, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
const TheFooter = () => {
  return (
    <footer className="w-full bg-gray-light px-5 py-10 mt-0 mb-0">
      <div className="mx-5 my-5 grid grid-col-1 md:grid-cols-3 gap-3 items-start">
        <div>
          <img src="/images/logo-large.png" className="w-full mb-3" />
          <p className="text-primary-light text-base font-normal text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis sequi dolores quia nostrum veritatis, architecto nulla adipisci ullam eligendi ipsum necessitatibus debitis, perspiciatis exercitationem quo in pariatur magni, sit cum.</p>
        </div>
        <div className="ml-0 md:ml-6">
          <h3 className="text-primary-dark text-xl font-semibold capitalize">important links</h3>
          <Link href="/about">
            <a className="text-gray-dark text-lg font-medium block my-3">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-dark text-lg font-medium block my-3">Contact Us</a>
          </Link>
          <Link href="/events">
            <a className="text-gray-dark text-lg font-medium block my-3">Events</a>
          </Link>
          <Link href="/location">
            <a className="text-gray-dark text-lg font-medium block my-3">Our Location</a>
          </Link>
        </div>
        <div className="ml-0 md:ml-6">
          <h3 className="text-primary-dark text-xl font-semibold capitalize">Our Social Media</h3>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faFacebook} className="" />
          </a>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faTwitter} className="" />
          </a>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faSnapchat} className="" />
          </a>
          <a className="text-primary-light text-lg font-medium block my-3">
            <FontAwesomeIcon icon={faYoutube} className="" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default TheFooter