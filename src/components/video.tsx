import ReactPlayer from 'react-player'

export function Video() {
	return (
		<div className="aspect-video w-full bg-zinc-950">
			<ReactPlayer
				url="https://youtube.com/watch?v=Jai8w6K_GnY"
				width="100%"
				height="100%"
				controls
			/>
		</div>
	)
}
