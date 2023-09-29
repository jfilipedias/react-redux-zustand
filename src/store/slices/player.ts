import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useAppSelector } from '..'

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
}

const initialState: PlayerState = {
	course: null,
	currentModuleIndex: 0,
	currentLessonIndex: 0,
	isLoading: true,
}

export const loadCourse = createAsyncThunk('player/load', async () => {
	const response = await fetch('http://localhost:3000/courses/1')
	return await response.json()
})

const playerSlice = createSlice({
	initialState,
	name: 'player',
	reducers: {
		start: (state, action: PayloadAction<Course>) => {
			state.course = action.payload
		},
		play: (state, action: PayloadAction<[number, number]>) => {
			state.currentModuleIndex = action.payload[0]
			state.currentLessonIndex = action.payload[1]
		},
		next: (state) => {
			const nextLessonIndex = state.currentLessonIndex + 1
			const nextLesson =
				state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

			if (nextLesson) {
				state.currentLessonIndex = nextLessonIndex
				return
			}

			const nextModuleIndex = state.currentModuleIndex + 1
			const nextModule = state.course?.modules[nextModuleIndex]

			if (nextModule) {
				state.currentModuleIndex = nextModuleIndex
				state.currentLessonIndex = 0
			}
		},
	},
	extraReducers(builder) {
		builder.addCase(loadCourse.pending, (state) => {
			state.isLoading = true
		})

		builder.addCase(loadCourse.fulfilled, (state, action) => {
			state.course = action.payload
			state.isLoading = false
		})
	},
})

export const player = playerSlice.reducer

export const { play, next, start } = playerSlice.actions
