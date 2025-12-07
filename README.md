# Brief explanation of implementation approach

I am using useAsyncData to fetch the data from the API. I have implemented randomization logic that selects 10 unique stories from the topstories API.

I am also implementing parallel data fetching with Promise.all for both stories and user data and also joining the data with author karma information.

For State Management, I am using Vue 3 Composition API with reactive refs for sorting. The computed property sortedStories is recalculated when sort parameters change.

Navigation state is passed through NuxtLink to share story data between routes without refetching.

For routing and navigation, I am using Nuxt file-based routing.

# Setup instructions

Clone the repository and make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
