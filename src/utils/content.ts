import { getCollection, type CollectionKey } from "astro:content";
import client from '../../tina/__generated__/client';


export const getContentByLocale = async (locale: string | undefined, collection: CollectionKey) => {
  // get all collection items from Tina
  const allTinaItems = await getCollection(collection);

  // filter items by locale
  const localeItems = allTinaItems.filter((item) => {
    return item.data.tinaInfo.relativePath.startsWith(`${locale || 'en'}/`);
  });

  // get each Tina data
  const localeItemsWithTinaData = await Promise.all(localeItems.map(async (item) => {
    const result = await client.queries[collection]({
      relativePath: item.data.tinaInfo.relativePath,
    })
    return (result.data as any)[collection];
  }))

  return localeItemsWithTinaData
}
