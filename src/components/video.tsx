import { Loader } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector, useCurrentLesson } from '@/store'
import { next } from '@/store/slices/player'

export function Video() {
	const { currentLesson } = useCurrentLesson()
	const isLoading = useAppSelector((state) => state.player.isLoading)
	const dispatch = useAppDispatch()

	const url = new URL('https://youtube.com/watch')
	url.searchParams.append('v', currentLesson?.id || '')

	function handlePlayNextVideo() {
		dispatch(next())
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
