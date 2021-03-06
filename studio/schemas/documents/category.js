export default {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "string",
      title: "Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "middleCategories",
      type: "array",
      title: "Middle categories",
      of: [
        {
          type: "reference",
          to: {
            type: "middleCategory",
          },
        },
      ],
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
  ],
};
