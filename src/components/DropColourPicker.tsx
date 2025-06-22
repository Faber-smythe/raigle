import { useRef, useEffect, useState } from "react"

const backgroundGradient = [
  { colour: [45, 10, 0], percentage: 0 },
  // { colour: [154, 13, 12], percentage: 30 },
  { colour: [255, 23, 21], percentage: 50 },
  { colour: [255, 190, 190], percentage: 80 },
  { colour: [94, 68, 68], percentage: 90 },
  { colour: [212, 92, 32], percentage: 100 }
]

const fractionStops = backgroundGradient.map(stop => ({
  ...stop,
  fraction: stop.percentage / 100
}));

interface DropColourPickerProps {
  pickNewColour: (colour: string) => void
}

const DropColourPicker = ({ pickNewColour }: DropColourPickerProps) => {
  const pickerWrapper = useRef(null)
  const [colorPickerBoundingRec, setColorPickerBoundingRec] = useState<DOMRect | null>(null)

  useEffect(() => {
    const wrapper = pickerWrapper.current as any as HTMLDivElement
    setColorPickerBoundingRec(wrapper.getBoundingClientRect())

  }, [])

  const interpolate = (c1: number[], c2: number[], t: number): string => {
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleColourPicking = (e: React.TouchEvent) => {
    if (!colorPickerBoundingRec) return

    let position = e.touches[0].clientX - colorPickerBoundingRec.left
    position = Math.max(0, Math.min(position, colorPickerBoundingRec.width));

    const ratio = position / colorPickerBoundingRec.width
    console.log("colour ratio : ", ratio)

    for (let i = 0; i < fractionStops.length - 1; i++) {
      const start = fractionStops[i];
      const end = fractionStops[i + 1];
      if (ratio >= start.fraction && ratio <= end.fraction) {
        const localRatio =
          (ratio - start.fraction) / (end.fraction - start.fraction);
        const color = interpolate(start.colour, end.colour, localRatio);
        pickNewColour(color);
        break;
      }
    }
  }

  return (
    <div
      className="flex relative w-9/10 rounded-md overflow-hidden mb-4 border-t border-gray-100"
      ref={pickerWrapper}
      onTouchMove={(e) => { handleColourPicking(e) }}
      onTouchStart={(e) => { handleColourPicking(e) }}
    >
      <div
        className="grow size-8"
        style={{ background: `linear-gradient(90deg,${backgroundGradient.map(stop => (" rgb(" + stop.colour.join(',') + ') ' + stop.percentage + "%"))})` }}
      />
    </div>
  )
}

export default DropColourPicker