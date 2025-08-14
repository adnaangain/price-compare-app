import axios from 'axios';

const normalizeFlipkartItem = (item) => {
  const priceObj = item.productBaseInfoV1?.flipkartSpecialPrice || item.productBaseInfoV1?.flipkartSellingPrice || item.productBaseInfoV1?.maximumRetailPrice;
  const title = item.productBaseInfoV1?.title || item.productBaseInfoV1?.productName;
  const url = item.productBaseInfoV1?.productUrl || item.productBaseInfoV1?.productUrl;
  const image = item.productBaseInfoV1?.imageUrls?.['200x200'] || item.productBaseInfoV1?.imageUrls?.['400x400'];
  const price = priceObj?.amount || null;
  const currency = priceObj?.currency || 'INR';

  return {
    platform: 'Flipkart',
    title,
    price,
    currency,
    url,
    image,
  };
};

/**
 * Flipkart Affiliate Search API
 * Docs vary by account; commonly:
 *   GET https://affiliate-api.flipkart.net/affiliate/search/json?query=<q>&resultCount=5
 * Headers:
 *   Fk-Affiliate-Id: <id>
 *   Fk-Affiliate-Token: <token>
 */
export async function searchFlipkart(query) {
  const id = process.env.FLIPKART_AFFILIATE_ID;
  const token = process.env.FLIPKART_AFFILIATE_TOKEN;
  if (!id || !token) {
    console.warn('Flipkart affiliate keys missing; skipping Flipkart');
    return [];
  }
  const url = 'https://affiliate-api.flipkart.net/affiliate/search/json';
  const res = await axios.get(url, {
    params: { query, resultCount: 5 },
    headers: { 'Fk-Affiliate-Id': id, 'Fk-Affiliate-Token': token },
    timeout: 10000,
  });
  const list = res.data?.products || [];
  return list.map(normalizeFlipkartItem).filter(Boolean);
}
