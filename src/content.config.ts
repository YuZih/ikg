import { defineCollection, z } from 'astro:content'
import client from '../tina/__generated__/client'


const page = defineCollection({
	// @ts-ignore
	loader: async () => {
		const postsResponse = await client.queries.pageConnection()

		// Map Tina posts to the correct format for Astro
		return postsResponse.data.pageConnection.edges
			?.filter((p) => !!p)
			.map((p) => {
				const node = p?.node

				return {
					...node,
					id: node?._sys.relativePath.replace(/\.mdx?$/, ''), // Generate clean URLs
					tinaInfo: node?._sys, // Include Tina system info if needed
				}
			})
	},
	schema: z.object({
		tinaInfo: z.object({
			filename: z.string(),
			basename: z.string(),
			path: z.string(),
			relativePath: z.string(),
		}),
		seoTitle: z.string(),
		body: z.any(),
	}),
})

const blog = defineCollection({
	// @ts-ignore
	loader: async () => {
		const blogResponse = await client.queries.blogConnection()

		// Map Tina posts to the correct format for Astro
		return blogResponse.data.blogConnection.edges
			?.filter((blog) => !!blog)
			.map((blog) => {
				const node = blog?.node
				return {
					...node,
					id: node?._sys.relativePath.replace(/\.mdx?$/, ''),  // Generate clean URLs
					tinaInfo: node?._sys,  // Include Tina system info if needed
				}
			})
	},
	schema: z.object({
		tinaInfo: z.object({
			filename: z.string(),
			basename: z.string(),
			path: z.string(),
			relativePath: z.string(),
		}),
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().nullish(),
	}),
})

export const collections = { page, blog }
