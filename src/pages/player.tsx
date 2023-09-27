import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MessageCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { Module } from '@/components/module'
import { Video } from '@/components/video'
import { useAppSelector, useCurrentLesson } from '@/store'
import { start } from '@/store/slices/player'

export function Player() {
	const modules = useAppSelector((state) => state.player.course?.modules)

	const { currentLesson } = useCurrentLesson()

	const dispatch = useDispatch()

	useEffect(() => {
		fetch('http://localhost:3000/courses/1')
			.then((response) => response.json())
			.then((data) => dispatch(start(data)))
	}, [])

	useEffect(() => {
		if (currentLesson) {
			document.title = `Assistindo: ${currentLesson.title}`
		}
	}, [currentLesson])

	return (
		<div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-50">
			<div className="flex w-[1100px] flex-col gap-6">
				<div className="flex items-center justify-between">
					<Header />

					<button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
						<MessageCircle size={16} />
						Deixar feedback
					</button>
				</div>

				<main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 pr-80 shadow">
					<div className="flex-1">
						<Video />
					</div>

					<aside className="absolute inset-y-0 right-0 w-80 divide-y-2 divide-zinc-900 overflow-y-scroll border-l border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-700">
						{modules &&
							modules.map((module, index) => (
								<Module
									key={module.id}
									moduleIndex={index}
									title={module.title}
								/>
							))}
					</aside>
				</main>
			</div>
		</div>
	)
}
