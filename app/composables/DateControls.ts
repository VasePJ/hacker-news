export const useTimeFormat = () =>  {
	const formatTime = (time: number) => {
		const date = new Date(time * 1000)
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year:'numeric'
		})
	}
	return {formatTime}
}
