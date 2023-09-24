import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { next } from '@/store/slices/player'

export function Video() {
	const dispatch = useDispatch()

	const lesson = useAppSelector((state) => {
		const { currentModuleIndex, currentLessonIndex } = state.player

		return state.player.course.modules[currentModuleIndex].lessons[
			currentLessonIndex
		]
	})

	const url = new URL('https://youtube.com/watch')
	url.searchParams.append('v', lesson.id)

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
