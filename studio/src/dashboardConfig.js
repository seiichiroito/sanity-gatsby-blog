export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "60a738dd27241854c19193e1",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-blog-studio-4fg8o613",
                  apiId: "750f260d-efd1-44a6-ba4e-d5916c9bf166",
                },
                {
                  buildHookId: "60a738ddaa537b4eec248c71",
                  title: "Blog Website",
                  name: "sanity-gatsby-blog-web-auw7iuka",
                  apiId: "80680a6d-0d41-476f-a05e-0f7d79cacb12",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/seiichiroito/sanity-gatsby-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-blog-web-auw7iuka.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
