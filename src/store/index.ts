import { create } from 'zustand'

interface Course {
	id: number
	modules: {
		id: number
		title: string
		lessons: {
			id: string
			title: string
			duration: string
		}[]
	}[]
}

export interface PlayerState {
	currentModuleIndex: number
	currentLessonIndex: number
	course: Course | null
	isLoading: boolean

	load: () => Promise<void>
	play: (moduleIndexAndLessonIndex: [number, number]) => void
	next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
	return {
		course: null,
		currentModuleIndex: 0,
		currentLessonIndex: 0,
		isLoading: true,

		load: async () => {
			set({ isLoading: true })

			const response = await fetch('http://localhost:3000/courses/1')
			const data = await response.json()

			set({
				course: data,
				isLoading: false,
			})
		},

		play: (moduleIndexAndLessonIndex: [number, number]) => {
			const [moduleIndex, lessonIndex] = moduleIndexAndLessonIndex

			set({
				currentModuleIndex: moduleIndex,
				currentLessonIndex: lessonIndex,
			})
		},

		next: () => {
			const { currentLessonIndex, currentModuleIndex, course } = get()

			const nextLessonIndex = currentLessonIndex + 1
			const nextLesson =
				course?.modules[currentModuleIndex].lessons[nextLessonIndex]

			if (nextLesson) {
				set({ currentLessonIndex: nextLessonIndex })
				return
			}

			const nextModuleIndex = currentModuleIndex + 1
			const nextModule = course?.modules[nextModuleIndex]

			if (nextModule) {
				set({
					currentModuleIndex: nextModuleIndex,
					currentLessonIndex: 0,
				})
			}
		},
	}
})
export const useCurrentLesson = () => {
	return useStore((state) => {
		const { currentModuleIndex, currentLessonIndex } = state

		const currentModule = state.course?.modules[currentModuleIndex]
		const currentLesson = currentModule?.lessons[currentLessonIndex]

		return { currentModule, currentLesson }
	})
}
