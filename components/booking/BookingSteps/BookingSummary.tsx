import { useState, useEffect } from 'react'
import useTranslation from './../../../hooks/useTranslation'
import { useSpeech } from './../../../hooks/useSpeech'

const BookingSummary = ({ filterValues, selectedPackage }: any) => {
  const { t, locale } = useTranslation()
  const { speechHandler } = useSpeech()
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [nightsCount, setNightsCount] = useState<number>(0)
  const [totalTax, setTotalTax] = useState<number>(0)
  const [showPriceDetails, setShowPriceDetails] = useState(false)
  let tax = 15.75
  let vat = 5.0
  useEffect(() => {
    const calcTotal = async () => {
      // Todo get Taxes rates from context
      let nightCount =
        (filterValues?.currentDateRange?.endDate?.getTime() -
          filterValues?.currentDateRange?.startDate?.getTime()) /
        (1000 * 3600 * 24)
      setNightsCount(nightCount)
      if (nightCount === 0) {
        nightCount = 1
      }
      console.log('nightCount', nightCount)

      let selectedPrice = +selectedPackage?.base_price * nightCount
      console.log('selectedPrice', selectedPrice)

      let priceWTax = selectedPrice * (tax / 100) * nightCount
      console.log('priceWTax', priceWTax)

      let priceWVat = selectedPrice * (vat / 100) * nightCount
      console.log('priceWVat', priceWVat)

      let totalTaxVal = priceWTax + priceWVat
      let totalPriceValue = selectedPrice + totalTaxVal
      setTotalPrice(+totalPriceValue.toFixed(2))
      setTotalTax(+totalTaxVal.toFixed(2))
    }
    calcTotal()
  }, [selectedPackage, filterValues])
  return (
    <div
      className="py-6 bg-outline-primary-light border-2 px-4"
      style={{
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      }}
    >
      <div className="flex justify-between items-center my-2 text-xl font-bold text-primary-dark">
        <h2 onMouseEnter={() => speechHandler(t('total4Stay'))}>
          {t('total4Stay')}
        </h2>
        <h2 onMouseEnter={() => speechHandler(`${totalPrice} ${t('sar')}`)}>
          {totalPrice} <i className="sicon-sar"></i>
        </h2>
      </div>
      <div className="my-2 text-lg font-medium text-black">
        <button
          onMouseEnter={() =>
            speechHandler(
              showPriceDetails ? t('showPriceDetails') : t('hidePriceDetails'),
            )
          }
          onClick={() => setShowPriceDetails((prev) => !prev)}
          className="underline bg-transparent text-primary-light capitalize text-lg font-normal"
        >
          {showPriceDetails ? t('showPriceDetails') : t('hidePriceDetails')}
        </button>

        {showPriceDetails && (
          <>
            <hr className="w-full mt-5 my-2" />
            <h5
              onMouseEnter={() =>
                speechHandler(selectedPackage?.rate?.title[locale])
              }
              className="text-gray-300 text-lg font-normal my-2"
            >
              {selectedPackage?.rate?.title[locale]}
            </h5>
            <div className="flex justify-between items-center text-gray-300 text-base font-normal">
              <h3
                onMouseEnter={() =>
                  speechHandler(`${selectedPackage?.base_price} ${t('sar')} ${t(
                    'perNight',
                  )} * 
									${nightsCount} ${t('nights')}`)
                }
              >
                {selectedPackage?.base_price} <i className="sicon-sar"></i>{' '}
                {t('perNight')} * {nightsCount} {t('nights')}
              </h3>
              <h3
                onMouseEnter={() =>
                  speechHandler(`${(
                    selectedPackage?.base_price * nightsCount
                  ).toFixed(2)} 
									${t('sar')}`)
                }
              >
                {(selectedPackage?.base_price * nightsCount).toFixed(2)}{' '}
                <i className="sicon-sar"></i>
              </h3>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between items-center my-2 text-lg font-medium text-black">
        <h2 onMouseEnter={() => speechHandler(t('totalRoomCharge'))}>
          {t('totalRoomCharge')}
        </h2>
        <h2
          onMouseEnter={() =>
            speechHandler(
              `${(selectedPackage?.base_price * nightsCount).toFixed(2)} ${t(
                'sar',
              )}`,
            )
          }
        >
          {(selectedPackage?.base_price * nightsCount).toFixed(2)} {t('sar')}
        </h2>
      </div>
      {showPriceDetails && (
        <div className=" text-gray-300 text-base font-normal">
          <h3
            onMouseEnter={() =>
              speechHandler(`15.75 % ${t('perRoom')}
							${t('comma')} ${t('perNight')}`)
            }
          >
            15.75 % {t('perRoom')}
            {t('comma')} {t('perNight')}
          </h3>
          <h3
            onMouseEnter={() =>
              speechHandler(`5.00 % ${t('perRoom')}
							${t('comma')} ${t('perNight')}`)
            }
          >
            5.00 % {t('perRoom')}
            {t('comma')} {t('perNight')}
          </h3>
        </div>
      )}
      <div className="flex justify-between items-center my-2 text-lg font-medium text-black">
        <h2 onMouseEnter={() => speechHandler(t('totalTaxes'))}>
          {t('totalTaxes')}
        </h2>
        <h2 onMouseEnter={() => speechHandler(`${totalTax} ${t('sar')}`)}>
          {totalTax} <i className="sicon-sar"></i>
        </h2>
      </div>
      {showPriceDetails && (
        <>
          <hr className="w-full mt-5 my-2" />
          <div className="flex justify-end items-center font-semibold">
            <h2
              onMouseEnter={() => speechHandler(t('total4Stay'))}
              className="mx-1"
            >
              {t('total4Stay')}:
            </h2>
            <h2 onMouseEnter={() => speechHandler(`${totalPrice} ${t('sar')}`)}>
              {totalPrice} <i className="sicon-sar"></i>
            </h2>
          </div>
        </>
      )}
    </div>
  )
}

export default BookingSummary
