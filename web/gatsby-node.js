const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge) => {
      const { id, slug = {}, publishedAt } = edge.node;
      const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      const path = `/blog/${dateSegment}/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id },
      });
    });
}

async function createCategoryPages(graphql, actions) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSanityCategory {
        nodes {
          slug
          id
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const categoryNodes = (result.data.allSanityCategory || {}).nodes || [];

  categoryNodes.forEach((node) => {
    const { id, slug = {} } = node;

    if (!slug) return;

    const path = `/categories/${slug}`;

    createPage({
      path,
      component: require.resolve("./src/templates/category.js"),
      context: { id },
    });
  });
}
async function createMiddleCategoryPages(graphql, actions) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSanityCategory {
        nodes {
          slug
          id
          middleCategories {
            secondSlug: slug
            secondId: id
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const categoryNodes = (result.data.allSanityCategory || {}).nodes || [];

  categoryNodes.forEach((node) => {
    const { id, slug = {}, middleCategories } = node;

    middleCategories.forEach((middleNode) => {
      const { secondId, secondSlug = {} } = middleNode;

      if (!slug || !secondSlug) return;

      const path = `/categories/${slug}/${secondSlug}`;

      createPage({
        path,
        component: require.resolve("./src/templates/middleCategory.js"),
        context: { id, secondId },
      });
    });
  });
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SanityCategory: {
      posts: {
        type: ["SanityPost"],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            type: "SanityPost",
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id,
                    },
                  },
                },
              },
            },
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPostPages(graphql, actions);
  await createCategoryPages(graphql, actions);
  await createMiddleCategoryPages(graphql, actions);
};
