<script setup lang="ts" >

const { formatTime } = useTimeFormat()

interface StoryCardProps {
	id: number;
	title: string;
	url: string;
	time: number;
	score: number;
	by: string;
	authorKarma: number;
}
const props = defineProps<StoryCardProps>()

const storyData = {
	id: props.id,
	title: props.title,
	url: props.url,
	time: props.time,
	score: props.score,
	by: props.by,
	authorKarma: props.authorKarma
}

</script>
<template>
	<div class="story-card">
		<NuxtLink
			class="story-link"
			:to="{
				path:`/story/${id}`,
				state:{
					story: storyData		
					
			}
		}"
		>
			<NuxtImg 
				src="https://picsum.photos/400/300" 
				:alt="`Illustration for ${title}`"
				loading="lazy"
			/>
			<span class='story-metadata'>Title: {{ title }}</span>
			<span class='story-metadata'>Article created on: {{ formatTime(time) }}</span>
			<span class='story-metadata'>Article score: {{score}} </span>
			<span class='story-metadata'>Author ID: {{by}} </span>
			<span class='story-metadata'>Author karma score: {{authorKarma}} </span>
		</NuxtLink>
		<a :href="url" target="_blank" rel="noopener noreferrer" class='url' :aria-label="`Read original article: ${title}`">	
			Read the original article
		</a>
	</div>
</template>

<style scoped lang="scss">
	.story-card {
		display: flex;
		flex-direction: column;
		width: 100%;

		.story-link {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-decoration: none;
		}
		
		.url{
			font-size: 1rem;
			text-decoration: none;
			color: #0063e4;
			margin-top: 8px;
			word-break: break-word;
		}
		.title, .story-metadata {
			font-size: 1rem; 
			color: #595959; 
			margin: 8px 0; 
			word-break: break-word;
		}
	}
</style>
