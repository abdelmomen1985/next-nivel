import {
  faBars,
  faMinusCircle,
  faPlusCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Link from 'next/link'
import router from 'next/router'
import { useContext } from 'react'
import { LayoutType } from '../../../types/layout'
import styles from '../navigation.module.scss'
import { AppContext } from './../../../context/AppContext'
import { useSignout } from './../../../hooks/useSignout'
import useTranslation from './../../../hooks/useTranslation'
import ActiveLink from './../ActiveLink'
import LocaleSwitch from './LocaleSwitch'

const TopLevel = ({
  setOpenNav,
  openNav,
  layout,
  setIsRegister,
}: {
  setOpenNav: (open: boolean) => void
  openNav: boolean
  layout: LayoutType
  setIsRegister: (isReg: boolean) => void
}) => {
  const { locale, t } = useTranslation()
  const { isMobile, isTablet, setLoginModal, user } = useContext(AppContext)

  const { signOutHandler } = useSignout()
  const navToProfileHandler = () => {
    if (user) {
      router.push(`/${locale}/profile`)
    } else {
      setLoginModal(true)
    }
  }
  return (
    <div className="text-center flex-wrap justify-between lg:justify-between items-center my-2 mx-2 md:mx-5 px-1 md:px-2">
      <Link href={`/${locale}/`}>
        <img
          src={layout?.remoteSchemaUrl + layout?.top_logo_en?.url}
          className="cursor-pointer mx-auto"
          style={{ height: '80px' }}
        />
      </Link>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center relative">
          {!isMobile && (
            <div
              className={clsx(
                styles.userMenu,
                isMobile ? 'hidden' : 'hidden md:flex',
              )}
            >
              <LocaleSwitch />
              {isMobile ? (
                <hr
                  className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                  style={{ height: '2px' }}
                />
              ) : (
                <span>{/*|*/}</span>
              )}
              {user && (
                <ActiveLink
                  href={`/${locale}/profile`}
                  activeClassName={styles.active}
                >
                  <a
                    className={clsx(
                      isMobile || isTablet ? 'my-2' : 'my-0',
                      'mx-3 font-medium text-primary-dark',
                    )}
                  >
                    {user?.name}
                  </a>
                </ActiveLink>
              )}
              {isMobile ? (
                <hr
                  className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                  style={{ height: '2px' }}
                />
              ) : (
                <span>|</span>
              )}
              {user ? (
                <button
                  onClick={signOutHandler}
                  className={clsx(
                    isMobile || isTablet ? 'my-2' : 'my-0',
                    'mx-3 font-medium text-primary-dark',
                  )}
                >
                  {t('signOut')}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsRegister(false)
                    setLoginModal(true)
                  }}
                  className={clsx(
                    isMobile || isTablet ? 'my-2' : 'my-0',
                    'mx-3 font-medium text-primary-dark',
                  )}
                >
                  {t('signIn')}
                </button>
              )}

              {!user && isMobile && (
                <>
                  <hr
                    className="mx-auto my-2 w-1/2 bg-primary-dark border-transparent"
                    style={{ height: '2px' }}
                  />
                </>
              )}
            </div>
          )}
          <button
            onClick={navToProfileHandler}
            className="bg-transparent border-none mx-1 cursor-pointer"
          >
            {user && user.media && user?.media?.profile_img ? (
              <img
                src={user?.media?.profile_img?.secure_url}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                }}
              />
            ) : (
              <>
                {/* <FontAwesomeIcon
                icon={faUserCircle}
                className="text-primary-light text-3xl "
                /> */}
              </>
            )}
          </button>
          <span>|</span>
          <div className="mx-3 flex">
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="text-primary-light text-2xl "
              onClick={() => {
                const currentZoom = (
                  (document.body.style as any)['zoom'] + ''
                ).replace('%', '')
                const currentZoomLevel = +currentZoom || 100

                ;(document.body.style as any)['zoom'] =
                  currentZoomLevel + 10 + '%'
              }}
            />
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                const currentZoom = (
                  (document.body.style as any)['zoom'] + ''
                ).replace('%', '')
                const currentZoomLevel = +currentZoom || 100

                ;(document.body.style as any)['zoom'] =
                  currentZoomLevel - 10 + '%'
              }}
              className="text-primary-light text-2xl "
            />
          </div>
        </div>
        {isMobile && (
          <FontAwesomeIcon
            icon={openNav ? faTimes : faBars}
            className="text-primary-dark text-3xl mx-1 mt-1 cursor-pointer"
            onClick={(e: any) => {
              e.stopPropagation()
              setOpenNav((prev: boolean) => !prev)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default TopLevel
