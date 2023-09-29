import ReactPlayer from 'react-player'
import { useAppDispatch, useCurrentLesson } from '@/store'
import { next } from '@/store/slices/player'

export function Video() {
	const dispatch = useAppDispatch()

	const { currentLesson } = useCurrentLesson()

	if (!currentLesson) {
		return null
	}

	const url = new URL('https://youtube.com/watch')
	url.searchParams.append('v', currentLesson.id)

	function handlePlayNextVideo() {
		dispatch(next())
	}

	return (
		<div className="aspect-video w-full bg-zinc-950">
			<ReactPlayer
				url={url.toString()}
				width="100%"
				height="100%"
				onEnded={handlePlayNextVideo}
				controls
				playing
			/>
		</div>
	)
}
