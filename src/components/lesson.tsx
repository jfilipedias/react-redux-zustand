import { PlayCircle, Video } from 'lucide-react'

interface LessonProps {
	title: string
	duration: string
	isCurrent: boolean
	onPlay: () => void
}

export function Lesson({ title, duration, isCurrent, onPlay }: LessonProps) {
	return (
		<button
			data-active={isCurrent}
			className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100"
			onClick={onPlay}
			disabled={isCurrent}
		>
			{isCurrent ? (
				<PlayCircle className="text-emerald-500" size={16} />
			) : (
				<Video className="text-zinc-500" size={16} />
			)}
			<span>{title}</span>
			<span className="ml-auto font-mono text-xs text-zinc-500">
				{duration}
			</span>
		</button>
	)
}
