import { Video } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { play } from '@/store/slices/player'

interface LessonProps {
	title: string
	duration: string
	onPlay: () => void
}

export function Lesson({ title, duration, onPlay }: LessonProps) {
	return (
		<button
			className="flex items-center gap-3 text-sm text-zinc-400"
			onClick={onPlay}
		>
			<Video className="text-zinc-500" size={16} />
			<span>{title}</span>
			<span className="ml-auto font-mono text-xs text-zinc-500">
				{duration}
			</span>
		</button>
	)
}
