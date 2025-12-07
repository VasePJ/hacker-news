<script setup lang="ts">
const { formatTime } = useTimeFormat()

interface StoryProps {
	id: number;
	title: string;
	url: string;
	time: number;
	score: number;
	by: string;
	authorKarma: number;
}
defineProps<StoryProps>()
const router = useRouter()

const story = ref<StoryProps | null>(null)

onMounted(() => {
	const navigationState = history?.state?.story as StoryProps
	if(navigationState) {
		story.value = navigationState
	} else {
		router.push('/')
	}
})


</script>

<template>
	<div class="story-detail-page">
		<div class="detail-page-container">
			<NuxtLink to="/"  class="back-button">
				⇦ Back to Stories
			</NuxtLink>
			<div v-if="!story">
				<p>Please navigate to the stories page</p>
				<NuxtLink to="/"  class="back-button">
					Back to Stories
				</NuxtLink>
			</div>
			<article v-else class="story-detail">
				<NuxtImg 
					class="story-detail-image"
					src="https://picsum.photos/800/600" 
					alt="dummy image"
				/>
				<h1 class="story-title">{{ story.title }}</h1>
				<section class="story-information">
					<h2 class="story-information-title">Story information</h2>
					<span class="story-metadata">Article score: {{ story.score }}</span>
					<span class="story-metadata">Author id:{{ story.by }}</span>
					<span class="story-metadata">Author karma: {{ story.authorKarma }}</span>
					<span class="story-metadata">Story crated: {{ formatTime(story.time) }}</span>
				</section>
			</article>
			<a :href="story?.url" target="_blank" rel="noopener noreferrer" class='url'>
				Read original article
			</a>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.story-detail-page {
		max-width: 1400px;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-decoration: none;
		.detail-page-container {
			padding: 2rem;

		}

		.back-button {
    		display: block;
			text-decoration: none;
			margin-bottom: 15px;
			color: #ff6600;
			width: 250px;
		}
		.url{
			font-size: 1rem;
			color: #0063e4;
			margin-top: 8px;
			word-break: break-word;
			text-decoration: none;
		}
		.story-detail {
			.story-title {
				color: #828282;
			}
			.story-detail-image{
				max-width: 1024px;
				width: 100%;
			}
			.story-information {
				display: flex;
				flex-direction: column;

				.story-information-title {
					color: #828282
				}
				.story-metadata {
					font-size: 1rem; 
					color:#595959;
					margin-bottom: 8px
				}
			}
		}
	}
</style>