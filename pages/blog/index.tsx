import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import orderby from 'lodash.orderby'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import PostPreview from '../../components/postPreview'
import { posts as postsFromCMS } from '../../content'

const Blog = ({ posts }) => {
  // console.log(fs);
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  )
}

Blog.defaultProps = {
  posts: [],
}

export function getStaticProps() {


  const cmsPosts = postsFromCMS.published.map((post) => {
    const { data } = matter(post);
    return data;
  });

  const postPath = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postPath)
  const filePosts = fileNames.map((name) => {
    const fullPostPath = path.join(process.cwd(), 'posts', name)
    const postsFromFile = fs.readFileSync(fullPostPath, 'utf-8')
    const { data } = matter(postsFromFile);
    return data
  })

  const posts = [...cmsPosts, ...filePosts]


  return {
    props: {
      posts: posts,
    }
  }
}

export default Blog