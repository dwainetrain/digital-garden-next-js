import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import path, { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import styles from './[slug].module.css';
import { getParsedFileContentBySlug, renderMarkdown } from '@dwainebest/markdown';
import { MDXRemote } from 'next-mdx-remote';
import { Youtube, CustomLink } from '@dwainebest/shared/mdx-elements';

/* eslint-disable-next-line */
export interface ArticleProps extends ParsedUrlQuery {
  slug: string
}

const MDXElements = {
  Youtube,
  // Whenever there's an a tag, use custom link instead
  a: CustomLink
}

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter, html }) {
  return (
    <div className="m-6">
      <article className='prose prose-lg'>
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>
      <hr />
      <MDXRemote {...html} components={MDXElements} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }: {
  params: ArticleProps
}) => {
  // 1. parse the content of markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(params.slug, POSTS_PATH)

  // 2. convert markdown => html
  const renderHTML = await renderMarkdown(articleMarkdownContent.content)


  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML
    }
  }
}



export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {

  const paths = readdirSync(POSTS_PATH)
    .filter(item => path.parse(item).ext === '.md' || path.parse(item).ext === '.mdx')
    .map(item => path.parse(item).name)
    .map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default Article;
