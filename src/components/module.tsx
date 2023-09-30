import { ChevronDown } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useStore } from '@/store'
import { Lesson } from './lesson'

interface ModuleProps {
	moduleIndex: number
	title: string
}

export function Module({ moduleIndex, title }: ModuleProps) {
	const { currentLessonIndex, currentModuleIndex, lessons, play } = useStore(
		(state) => ({
			currentLessonIndex: state.currentLessonIndex,
			currentModuleIndex: state.currentModuleIndex,
			lessons: state.course?.modules[moduleIndex].lessons,
			play: state.play,
		}),
	)

	const lessonsAmount = lessons?.length

	return (
		<Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
			<Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm">
					{moduleIndex + 1}
				</div>

				<div className="flex flex-col gap-1 text-left">
					<strong>{title}</strong>
					<span className="text-sm text-zinc-400">
						{lessonsAmount === 1
							? `${lessonsAmount} aula`
							: `${lessonsAmount} aulas`}
					</span>
				</div>

				<ChevronDown
					className="ml-auto text-zinc-400 transition-transform group-data-[state=open]:rotate-180"
					size={20}
				/>
			</Collapsible.Trigger>

			<Collapsible.Content>
				<nav className="relative flex flex-col gap-4 p-6">
					{lessons &&
						lessons.map((lesson, lessonIndex) => (
							<Lesson
								key={lesson.id}
								title={lesson.title}
								duration={lesson.duration}
								isCurrent={
									currentModuleIndex === moduleIndex &&
									currentLessonIndex === lessonIndex
								}
								onPlay={() => play([moduleIndex, lessonIndex])}
							/>
						))}
				</nav>
			</Collapsible.Content>
		</Collapsible.Root>
	)
}
