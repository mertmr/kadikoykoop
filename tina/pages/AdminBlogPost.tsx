import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { BlogQuery, BlogQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';


type Props = {
	variables: BlogQueryVariables;
	data: BlogQuery;
	query: string;
}

export default function AdminBlogPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const blog = data.blog;

	return (
		<article>
			<div className="prose">
				<div className="title">
					<h1 data-tina-field={tinaField(blog, "title")} >{blog.title}</h1>
					<div className="date" data-tina-field={tinaField(blog, "pubDate")} >
						<FormattedDate date={blog.pubDate} />
						{
							blog.updatedDate && (
								<div className="last-updated-on" data-tina-field={tinaField(blog, "updatedDate")} >
									Son güncelleme: <FormattedDate date={blog.updatedDate} />
								</div>
							)
						}
					</div>
				</div>
				<div data-tina-field={tinaField(blog, "body")}>
					<TinaMarkdown content={blog.body} />
				</div>
			</div>
		</article>
	);
}
