import { ChevronDown } from 'lucide-react'
import { Lesson } from './lesson'

interface ModuleProps {
	index: number
	title: string
	lessonsAmount: number
}

export function Module({ index, title, lessonsAmount }: ModuleProps) {
	return (
		<div>
			<button className="flex w-full items-center gap-3 bg-zinc-800 p-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm">
					{index + 1}
				</div>

				<div className="flex flex-col gap-1 text-left">
					<strong>{title}</strong>
					<span className="text-sm text-zinc-400">
						{lessonsAmount === 1
							? `${lessonsAmount} aula`
							: `${lessonsAmount} aulas`}
					</span>
				</div>

				<ChevronDown className="ml-auto text-zinc-400" size={20} />
			</button>

			<nav className="relative flex flex-col gap-4 p-6">
				<Lesson title="fundamentos do redux" duration="09:13" />
			</nav>
		</div>
	)
}
