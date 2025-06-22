import { Disclosure } from '@headlessui/react'
import { NavLink, useParams } from "react-router";


const routes = [
  {
    en: 'day',
    fr: 'jour'
  },
  {
    en: 'week',
    fr: 'semaine'
  },
  {
    en: 'month',
    fr: 'mois'
  }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const { dayParam } = useParams();


  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex flex-2 items-center justify-center ">
            <div className="flex shrink-0 items-center">
              {/* <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              /> */}

            </div>
            <div className="flex space-x-4">
              {routes.map((route) => (
                <NavLink
                  key={route.en}
                  to={dayParam ? `/${route.en}/${dayParam}` : `/${route.en}`}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )
                  }
                >
                  {route.fr}
                </NavLink>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Disclosure >
  )
}
