import { baseApi } from '../apiSlice';

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  API for fetching leads
    fetchLeads: builder.query({
      query: ({ categoryId, columnName, sortingType, limit, offset }) => ({
        url: `leads/leads-data/?category_id=${categoryId}&column_name=${columnName}&sorting_type=${sortingType}&limit=${limit}&offset=${offset}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    //  API for refreshing data
    refreshData: builder.mutation({
      query: ({ asin, categoryId }) => ({
        url: 'spapi/get_sp_api_bulk_data',
        method: 'POST',
        body: {
          lead_asin_with_cat_id: [{ asin, category_id: categoryId }],
          marketplace_id: 'A2EUQ1WTGCTBG2',
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // API for refreshing ASIN
    refreshAsin: builder.mutation({
      query: (asin) => ({
        url: `spapi/refresh/${asin}/`,
        method: 'POST',
        body: { asin },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    // API for checking a list of ASINs
    checkAsins: builder.mutation({
      query: (asins) => ({
        url: 'spapi/check-asins/',
        method: 'POST',
        body: { asins },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useFetchLeadsQuery,
  useRefreshDataMutation,
  useRefreshAsinMutation,
  useCheckAsinsMutation,
} = leadsApi;