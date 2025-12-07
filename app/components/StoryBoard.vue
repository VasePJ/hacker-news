<script setup lang="ts" >
interface Story {
  id: number
  title: string
  by: string
  score: number
  url: string
  time: number
}

interface User {
  id: string
  karma: number
  created: number
}

interface StoryWithKarma extends Story {
  authorKarma: number
}
const { data: storiesWithKarma, pending, error} = await useAsyncData(
  'random-stories-with-karma',
  async (_nuxtApp, { signal }) => {
    const storyIds = await $fetch<number[]>(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
      { signal }
    )
    const selectedIds: number[] = []
    while (selectedIds.length < 10 && selectedIds.length < storyIds.length) {
      const randomIndex = Math.floor(Math.random() * storyIds.length)
      const storyId = storyIds[randomIndex]
      if (storyId !== undefined && !selectedIds.includes(storyId)) {
        selectedIds.push(storyId)
      }
    }
    
    const storyPromises = selectedIds.map(id =>
      $fetch<Story>(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        { signal }
      )
    )
    const stories = await Promise.all(storyPromises)
    
    const userIds = [...new Set(stories.map(story => story.by))]
    
    const userPromises = userIds.map(userId =>
      $fetch<User>(
        `https://hacker-news.firebaseio.com/v0/user/${userId}.json`,
        { signal }
      )
    )
    const users = await Promise.all(userPromises)
    

    const storiesWithKarma: StoryWithKarma[] = stories.map(story => ({
      ...story,
      authorKarma: users.find(u => u.id === story.by)?.karma || 0
    }))
    
    return storiesWithKarma
  },
  {
    server: true 
  }


)
const sortBy = ref<'score' | 'karma' | 'timestamp'>('score');
const sortOrder =  ref<'asc' | 'desc'>('asc');

const sortedStories = computed(() => {
	if(!storiesWithKarma.value) return []

	const stories = [...storiesWithKarma.value]

	stories.sort((a,b) => {
		let comparison = 0
		if(sortBy.value === 'score') {
			comparison = a.score - b.score
		} else if (sortBy.value === 'karma'){
			comparison = a.authorKarma - b.authorKarma
		} else if (sortBy.value === 'timestamp'){
			comparison = a.time - b.time
		}
		return sortOrder.value === 'asc' ? comparison : -comparison
	})
	return stories

})
const toggleSortOrder = () => {
	sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}


</script>
<template>
	<main class='story-board-container' role="main">
		<h1 class="title">Hacker News - Top stories</h1>
		<div v-if="!pending && !error" class="sorting-controls">
			<label for="sortBy">
				Sort by:
				<select id="sortBy" v-model="sortBy" aria-label="Sort stories by">
					<option value="score">Article score</option>
					<option value="karma">Author karma</option>
					<option value="timestamp">Timestamp</option>
				</select>
			</label>
			<button  
				class="sort-button" 
				:aria-label="`Change sort order to ${sortOrder === 'asc' ? 'descending' : 'ascending'}`"
				@click="toggleSortOrder" >
				{{ sortOrder === 'asc' ? '⇧ Ascending' : '⇩ Descending' }}
			</button>

		</div>
		<div v-if="pending" class="loading" role="status" aria-live="polite">Hacker News - loading stories</div>
		<div v-else-if="error" class="error" role="alert" aria-live="assertive">Hacker News - {{error.message}}</div>
		<div v-else class="stories-grid">
			<StoryCard
				v-for="(story, index) in sortedStories" 
				:id="story.id"
				:key="index" 
				:title="story.title"
				:url="story.url"
				:time="story.time ?? 0"
				:score="story.score ?? 0"
				:by="story.by"
				:author-karma="story.authorKarma"
			/>
		</div>
	</main>
</template>
<style scoped lang="scss">
	.story-board-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;

		.sorting-controls {
			display: flex;
			align-items: end;
			justify-content: end;
			margin-bottom: 1rem;
			border-radius: 6px;

			select {
				padding: 11px;
				margin-right: 5px;
				border: 1px solid #ddd;
				border-radius: 4px;
				cursor: pointer;
			}

			.sort-button {
				padding: 12px;
				background-color: #ff6600;
				color: white;
				border: none;
				border-radius: 4px;
				cursor: pointer;
				transition: background-color 0.4s;
				
				&:hover {
					background-color: #ff8533;
				}
			}
		}

		.title{
			margin-bottom: 2rem;
			color: #ff6600;
			font-size: 2rem;
			text-align: center;
		}
		.loading {
			color: #666666;
		}
		.error{
			color:#bf1d00;
		}

		.stories-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 30px;

			@media (max-width: 1024px){
				grid-template-columns: repeat(2, 1fr);
			}

			@media (max-width: 640px){
				grid-template-columns: 1fr;
			}
		}
	}
</style>
