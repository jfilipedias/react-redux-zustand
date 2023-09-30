import { Loader } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useCurrentLesson, useStore } from '@/store'

export function Video() {
	const { isLoading, next } = useStore((state) => ({
		isLoading: state.isLoading,
		next: state.next,
	}))

	const { currentLesson } = useCurrentLesson()

	const url = new URL('https://youtube.com/watch')
	url.searchParams.append('v', currentLesson?.id || '')

	function handlePlayNextVideo() {
		next()
	}

	return (
		<div className="aspect-video w-full bg-zinc-950">
			{isLoading ? (
				<div className="flex h-full items-center justify-center">
					<Loader className="animate-spin text-zinc-400" size={24} />
				</div>
			) : (
				<ReactPlayer
					url={url.toString()}
					width="100%"
					height="100%"
					onEnded={handlePlayNextVideo}
					controls
					playing
				/>
			)}
		</div>
	)
}
