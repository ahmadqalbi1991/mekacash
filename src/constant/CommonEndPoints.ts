export const E_COMMON_END_POINTS = {
  COUNTRIES_DATA: 'location/countries',
  PROVINCES_DATA: 'location/provinces',
  CITIES_DATA: 'location/cities',
  AREAS_DATA: 'location/areas',
  CAR_MODELS: 'new-cars/models',
  CAR_MAKES: 'new-cars/makes',
  CAR_VARIENTS: 'new-cars/variants',

  CAR_BODY_TYPE: 'new-cars/sub-categories',
  GET_USED_CAR_DATA: 'used-cars/search',
  USED_CAR_ACTIVE_COUNT: 'used-cars/active-count',
  NEW_CAR_ACTIVE_COUNT: 'new-cars/active-count',
  FAQS_DATA: 'faqs',
  HOME_BANNER: 'banners',
  HOME_SEARCH: 'home-search',
  VIDEOS: 'external-links',
  ME_STATS: 'me/stats',
  NEWSLETTER_SUBSCRIBE: '/newsletter/subscribe',
  CAR_INSPECTION_BOOKING_V1: 'car-inspection',
  CAR_VARIENT_BY_ID: (
    make_slug: string,
    model_slug: string,
    variant_slug: string
  ) => `new-cars/${make_slug}/${model_slug}/${variant_slug}`,
};
