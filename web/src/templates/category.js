import React from "react";
import { graphql, Link } from "gatsby";

import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { getBlogUrl } from "../lib/helpers";
export const query = graphql`
  query CatgoryTemplateQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      title
      description
      slug
      middleCategories {
        title
        slug
        id
      }
      posts {
        _id
        title
        publishedAt
        slug {
          current
        }
      }
    }
  }
`;

const CategoryPostTemplate = (props) => {
  const { data = {}, errors } = props;
  const { title, description, slug, middleCategories, posts } =
    data.category || {};

  return (
    <Layout>
      <Container>
        {errors && <GraphQLErrorList errors={errors} />}
        {!data.category && <p>No category data</p>}
        <SEO title={title} description={description} />
        <article>
          <h1>Category: {title}</h1>
          <p>{description}</p>
          {middleCategories && (
            <>
              <h2>Child Categories</h2>
              <ul>
                {middleCategories.map((middleCategory) => (
                  <li key={middleCategory.id}>
                    <Link to={`/categories/${slug}/${middleCategory.slug}`}>
                      {middleCategory.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {posts && (
            <>
              <h2>Posts</h2>
              <ul>
                {posts.map((post) => (
                  <li key={post._id}>
                    <Link to={getBlogUrl(post.publishedAt, post.slug)}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      </Container>
    </Layout>
  );
};

export default CategoryPostTemplate;
