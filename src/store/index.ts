import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { player } from './slices/player'

export const store = configureStore({
	reducer: {
		player,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export const useCurrentLesson = () => {
	return useAppSelector((state) => {
		const { currentModuleIndex, currentLessonIndex } = state.player

		const currentModule = state.player.course?.modules[currentModuleIndex]
		const currentLesson = currentModule?.lessons[currentLessonIndex]

		return { currentModule, currentLesson }
	})
}
