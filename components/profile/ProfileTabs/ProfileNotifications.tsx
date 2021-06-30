import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../profile.module.scss';
import clsx from 'clsx'
import { style } from '@material-ui/system';


interface Alerts {
  id: number;
  city: string;
  compound: string;
  prop_type: string;
  minPrice: number;
  maxPrice: number;
}
const dummyAlerts = [
  {
    id: 1,
    city: 'algona',
    compound: 'algona',
    prop_type: 'chalets',
    minPrice: 800000,
    maxPrice: 1800000
  },
  {
    id: 2,
    city: 'alsahel',
    compound: 'almaza bay',
    prop_type: 'apartments',
    minPrice: 800000,
    maxPrice: 1800000
  },

]
const ProfileNotifications = () => {
  const [alerts, setAlerts] = useState<Alerts[]>(dummyAlerts)
  const { register, errors, handleSubmit } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur'
  })
  const createAlertHandler = (data: any) => {
    console.log(data)
    setAlerts(prev => [...prev, { id: prev.length + 2, ...data }])
  }
  const removeAlertHandler = (alertId: number) => {
    setAlerts(prev => prev.filter(item => item.id !== alertId))
  }
  return (
    <section className="w-full mx-auto px-5 py-4 my-3">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl text-black font-bold mt-2 mb-6">
            Create new alert ! </h2>
          <form className="my-5 mr-12" onSubmit={handleSubmit(createAlertHandler)}>
            <div className="my-5 relative">
              <select className={styles.textInput} name="prop_type" ref={register} >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="duplex">Duplex</option>
                <option value="studio">Studio</option>
              </select>
              <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">Property Type</small>
            </div>
            <div className="my-5 relative">
              <select className={styles.textInput} name="city" ref={register} >
                <option value="new cairo">New Cairo</option>
                <option value="al sahel">Al Sahel</option>
                <option value="algona">Al Gona</option>
                <option value="ain shams">Ain Shams</option>
              </select>
              <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">City</small>
            </div>
            <div className="my-5 relative">
              <select className={styles.textInput} name="compound" ref={register} >
                <option value="almaza bay">Almaza Bay</option>
                <option value="bloomfields">Bloomfields</option>
                <option value="zahraa">Zahraa</option>
                <option value="zed east">Zed East</option>
              </select>
              <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">Compound</small>
            </div>
            <div className="my-5 relative">
              <select className={styles.textInput} name="minPrice" ref={register({
                valueAsNumber: true
              })} >
                <option value="800000">80,0000</option>
                <option value="1000000">100,0000</option>
                <option value="1500000">150,0000</option>
                <option value="2000000">200,0000</option>
                <option value="2500000">250,0000</option>
              </select>
              <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">Min Price</small>
            </div>
            <div className="my-5 relative">
              <select className={styles.textInput} name="maxPrice" ref={register({
                valueAsNumber: true
              })} >
                <option value="800000">80,0000</option>
                <option value="1000000">100,0000</option>
                <option value="1500000">150,0000</option>
                <option value="2000000">200,0000</option>
                <option value="2500000">250,0000</option>
              </select>
              <small className="text-xs font-medium pl-3 mt-1 mb-2 text-black text-opacity-25">Max Price</small>
            </div>
            <div className="my-8 relative flex justify-end items-start">
              <button className="btn-primary m-0 py-2 px-16 font-medium text-xl" type="submit">Add Alert</button>
            </div>
          </form>

        </div>
        <div className="col-span-1 md:col-span-4">
          <div className="mr-12 bg-white px-5 py-6 bg-outline-secondary">
            <h2 className="text-2xl text-black font-bold mt-2 mb-6">
              My Alerts </h2>
            <table className={clsx(styles.table, 'my-5')}>
              <tbody>
                {alerts.map(alert => (
                  <tr key={alert.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{alert.city}</td>
                    <td>
                      <div className={styles.propTypeChip} >{alert.prop_type}</div>
                      <p className="text-center" style={{ color: '#6E6893' }}>Property Types</p>
                    </td>
                    <td>
                      <p>{alert.minPrice}</p>
                      <p>Min Price</p>
                    </td>
                    <td>
                      <p>{alert.maxPrice}</p>
                      <p>Max Price</p>
                    </td>
                    <td>
                      <button className="bg-transparent border-transparent mx-auto cursor-pointer"
                        onClick={() => removeAlertHandler(alert.id)}
                        style={{ color: '#6E6893' }}>
                        Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProfileNotifications
