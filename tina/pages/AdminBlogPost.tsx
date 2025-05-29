import React from 'react'
import { tinaField, useTina } from 'tinacms/dist/react'
import type { BlogQuery, BlogQueryVariables } from '../__generated__/types.ts'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx'

type Props = {
	variables: BlogQueryVariables
	data: BlogQuery
	query: string
}

export default function AdminBlogPost(props: Props) {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const record = data.blog

	return (
		<article>
			<div className="prose">
				<div className="title">
					<div className="date" data-tina-field={tinaField(record, 'pubDate')}>
						{record.pubDate && <FormattedDate date={record.pubDate} />}
						{record.updatedDate && (
							<div
								className="last-updated-on"
								data-tina-field={tinaField(record, 'updatedDate')}
							>
								Last updated on <FormattedDate date={record.updatedDate} />
							</div>
						)}
					</div>
					<h1 data-tina-field={tinaField(record, 'title')}>{record.title}</h1>
					<hr />
				</div>
				<div data-tina-field={tinaField(record, 'body')}>
					<TinaMarkdown content={record.body} />
				</div>
			</div>
		</article>
	)
}
