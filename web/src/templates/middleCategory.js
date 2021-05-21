import React from "react";
import { graphql, Link } from "gatsby";

import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { getBlogUrl } from "../lib/helpers";
export const query = graphql`
  query GetMiddleCategory($secondId: String) {
    middleCategory: sanityMiddleCategory(id: { eq: $secondId }) {
      title
      description
    }
  }
`;

const CategoryPostTemplate = (props) => {
  console.log(props);
  const { data = {}, errors } = props;
  const { title, description, posts } = data.middleCategory || {};

  return (
    <Layout>
      <Container>
        {errors && <GraphQLErrorList errors={errors} />}
        {!data.category && <p>No category data</p>}
        <SEO title={title} description={description} />
        <article>
          <h1>Category: {title}</h1>
          <p>{description}</p>

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
