import React, { useState, useReducer, useEffect } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import queryString from 'query-string'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Tag from "../components/Tag"
import Header from "../components/Header"



const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const sitePosts = data.allMarkdownRemark.edges;

  // gets the tag param if in url.
  const [activeTag, setActiveTag] = useState(queryString.parse(location?.search)?.tag)

  const [posts, dispatchPosts]  = useReducer((state, action) => action, sitePosts)
  const [tags, dispatchTags] = useReducer((state, action) => action,[])

  useEffect(() => {
    const newTags = posts.map(({ node }) => node.frontmatter.tags).flat()
    console.log('newTags', newTags)
    dispatchTags(Array.from(new Set(newTags)))
  }, [])

  useEffect(() => {
    if (!activeTag) {
      dispatchPosts(sitePosts)
      return;
    }

    const newPosts = data.allMarkdownRemark.edges.filter(({node}) =>{
      return node.frontmatter.tags.includes(activeTag)
    })
    dispatchPosts(newPosts)
  }, [activeTag])

  return (
    <Layout location={location} title={siteTitle} titleOnClick={() => setActiveTag(undefined)}>
      <SEO title="All posts" />
      <hr/>
      <Header />
      <div>
        
        {tags && tags.map((tag, i) => {
          console.log('tags', tags)
          return (
            // <div key={i}>{tag}</div>
            <Tag 
              key={i}
              isActive={activeTag === tag}
              text={tag} 
              onActivate={() => setActiveTag(tag)} 
              onDeactivate={() => setActiveTag(undefined)}
            />
          )
        })}
        <div>
          <small><em>Powered by - Wild Fox Card</em></small>
        </div>
        <hr />
      </div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
