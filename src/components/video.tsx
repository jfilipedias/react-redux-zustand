import ReactPlayer from 'react-player'
import { useAppSelector } from '@/store'

export function Video() {
	const lesson = useAppSelector((state) => {
		const { currentModuleIndex, currentLessonIndex } = state.player

		return state.player.course.modules[currentModuleIndex].lessons[
			currentLessonIndex
		]
	})

	const url = new URL('https://youtube.com/watch')
	url.searchParams.append('v', lesson.id)

	return (
		<div className="aspect-video w-full bg-zinc-950">
			<ReactPlayer url={url.toString()} width="100%" height="100%" controls />
		</div>
	)
}
