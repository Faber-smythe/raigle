import { useNavigate, useLocation, useParams } from "react-router"
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { formatDateForStorage } from '@/misc/Utils'

interface TodayButtonProps {
  handleDoToDay?: Function
}

const TodayButton = ({ handleDoToDay }: TodayButtonProps) => {
  const navigate = useNavigate()
  const { dayParam } = useParams();
  const location = useLocation()

  const handleTodayClick = () => {
    if (!dayParam) return
    const currentRoute = location.pathname.replace(dayParam, "")

    if (handleDoToDay) handleDoToDay(new Date())
    navigate(currentRoute + formatDateForStorage(new Date()))

  }

  return (
    <div onClick={handleTodayClick} className="flex items-center justify-center text-xs rounded-md border-2 border-amber-400 px-1 cursor-pointer">
      <ArrowPathIcon className="size-3" />
      &nbsp;
      Aujourd'hui
    </div>
  )
}

export default TodayButton