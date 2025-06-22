// import { XCircleIcon } from '@heroicons/react/24/outline'
import DropColourPicker from '@/components/DropColourPicker'
import { Dialog, DialogPanel } from '@headlessui/react'

import { useState, useEffect } from 'react'

interface DropProps {
  className?: string
  blood?: string
  size?: string
  handleBloodUpdate?: Function
}

const defaultRed = "#f10000"
const unbloodyColour = "rgba(155, 50, 50, .2)"

const Drop = ({ className, handleBloodUpdate, blood, size }: DropProps) => {
  const [openColourPicker, setOpenColourPicker] = useState(false)
  const [colour, setColour] = useState(blood ?? unbloodyColour)

  useEffect(() => {
    if (blood == "default") setColour(defaultRed)
  }, [])

  useEffect(() => {
    setColour(blood ?? unbloodyColour)
  }, [blood])

  const pickNewColour = (colour: string) => {
    if (!handleBloodUpdate) return
    setColour(colour)
    handleBloodUpdate(colour)
  }

  const handleDropClick = () => {
    if (!handleBloodUpdate) return

    if (blood) {
      // toggle the blood off the entry
      handleBloodUpdate(undefined)
    } else {
      // toggle default blood on the entry and open modal colour picker
      handleBloodUpdate(defaultRed)
      setOpenColourPicker(true)
    }
  }

  return (
    <>
      <svg className={className + " drop-SVG"} onClick={handleDropClick} version="1.0" xmlns="http://www.w3.org/2000/svg"
        width={size ?? "320"} height={size ?? "320"} viewBox="0 0 320.000000 320.000000"
        preserveAspectRatio="xMidYMid meet">

        <g style={{ pointerEvents: "none" }} transform="translate(0.000000,320.000000) scale(0.100000,-0.100000)"
          fill={colour} >
          <path d="M1576 3027 c-22 -48 -37 -89 -42 -116 -6 -29 -36 -96 -115 -256 -96
-191 -142 -271 -245 -423 -16 -23 -34 -50 -39 -60 -6 -9 -42 -64 -80 -121 -82
-121 -87 -128 -155 -246 -158 -271 -240 -511 -240 -706 0 -92 23 -249 47 -314
8 -22 15 -45 17 -52 1 -7 5 -16 9 -19 4 -4 7 -13 7 -20 0 -14 86 -168 111
-199 34 -43 170 -173 211 -201 24 -18 66 -43 94 -57 50 -25 196 -79 224 -82 8
0 40 -5 70 -9 129 -17 299 -11 395 15 75 20 230 92 295 137 277 192 427 530
395 892 -10 120 -86 347 -162 487 -14 26 -37 68 -51 93 -13 25 -52 87 -85 139
-34 52 -75 116 -92 142 -16 27 -70 107 -118 179 -170 254 -324 550 -371 715
-33 113 -54 135 -80 82z m-590 -1459 c-28 -134 -29 -300 -2 -427 8 -36 25 -88
59 -176 77 -200 219 -333 427 -400 30 -10 60 -21 65 -25 6 -5 13 -9 18 -9 15
-1 34 -16 50 -41 55 -88 -3 -191 -105 -184 -129 8 -213 38 -314 109 -280 200
-397 585 -293 970 10 39 33 103 50 143 33 75 57 96 45 40z"/>
        </g>
      </svg>
      <Dialog open={openColourPicker} onClose={setOpenColourPicker} className="relative z-10">

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center relative w-full text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative w-screen transform flex justify-center shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-100 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >

              <DropColourPicker pickNewColour={pickNewColour} />

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}


export default Drop