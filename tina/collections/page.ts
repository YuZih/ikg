import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router({ document }) {
      const locale = document._sys.breadcrumbs[0];
      const fileName = document._sys.breadcrumbs[1];
      return `/${locale}/${fileName}`;
    },
  },
  fields: [
    {
      name: "seoTitle",
      type: "string",
      required: true
    },
    {
      name: "body",
      type: "rich-text",
      isBody: true,
      required: true
    }
  ]
}
