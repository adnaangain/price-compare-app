import * as sdk from 'paapi5-nodejs-sdk';

const normalizeAmazonItem = (item) => {
  const offer = item.Offers?.Listings?.[0];
  const price = offer?.Price?.Amount || null;
  const currency = offer?.Price?.Currency || 'INR';
  return {
    platform: 'Amazon',
    asin: item.ASIN,
    title: item.ItemInfo?.Title?.DisplayValue || item.ASIN,
    price,
    currency,
    url: item.DetailPageURL,
    image: item.Images?.Primary?.Medium?.URL || item.Images?.Primary?.Large?.URL || null,
  };
};

export async function searchAmazon(query) {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;
  const host = process.env.AMAZON_MARKETPLACE || 'www.amazon.in';
  const region = process.env.AMAZON_REGION || 'us-east-1';

  if (!accessKey || !secretKey || !partnerTag) {
    console.warn('Amazon PA-API keys missing; skipping Amazon');
    return [];
  }

  const defaultClient = sdk.ApiClient.instance;
  defaultClient.accessKey = accessKey;
  defaultClient.secretKey = secretKey;
  defaultClient.host = host;
  defaultClient.region = region;

  const api = new sdk.DefaultApi();
  const searchItemsRequest = new sdk.SearchItemsRequest();
  searchItemsRequest['PartnerTag'] = partnerTag;
  searchItemsRequest['PartnerType'] = 'Associates';
  searchItemsRequest['Keywords'] = query;
  searchItemsRequest['SearchIndex'] = 'All';
  searchItemsRequest['ItemCount'] = 5;
  searchItemsRequest['Resources'] = [
    'Images.Primary.Medium',
    'Images.Primary.Large',
    'ItemInfo.Title',
    'Offers.Listings.Price',
  ];

  const data = await api.searchItems(searchItemsRequest);
  const items = data?.SearchResult?.Items || [];
  return items.map(normalizeAmazonItem).filter(Boolean);
}
