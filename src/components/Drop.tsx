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
    console.log("Picked new custom colour : ", colour)
    setColour(colour)
    handleBloodUpdate(colour)
  }

  const handleDropClick = () => {
    if (!handleBloodUpdate) return

    console.log("blood before click : ", blood)
    if (blood) {
      // toggle the blood off the entry
      handleBloodUpdate(undefined)
    } else {
      // toggle default blood on the entry and open modal colour picker
      console.log('default red')
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
        {/* <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        /> */}

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center relative w-full text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative w-screen transform flex justify-center shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-100 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >

              <DropColourPicker pickNewColour={pickNewColour} />
              {/* <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Deactivate account
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}


// const DropColourPicker = () => {
//   const backgroundGradient = [
//     { colour: "red", fraction: 0 },
//     { colour: "darkred", fraction: 70 },
//     { colour: "black", fraction: 85 }
//   ]
//   console.log(`linear-gradient(90deg,${backgroundGradient.map(mark => (" " + mark.colour + ' ' + mark.fraction + "%"))})`)
//   return (
//     <div
//       className="flex fixed bottom-0 w-full border-t border-gray-100"
//     >
//       <div className="grow" style={{ background: `linear-gradient(90deg,${backgroundGradient.map(mark => (" " + mark.colour + ' ' + mark.fraction + "%"))})` }} />
//       <div className="flex justify-center items-center size-8 bg-white"><XCircleIcon /></div>
//     </div>
//   )
// }

export default Drop