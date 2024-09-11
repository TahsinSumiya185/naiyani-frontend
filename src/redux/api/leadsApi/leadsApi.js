
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../apiSlice';

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLeads: builder.query({
        query: ({ categoryId, columnName, sortingType, limit, offset }) => ({
          url: `leads/leads-data/?category_id=${categoryId}&column_name=${columnName}&sorting_type=${sortingType}&limit=${limit}&offset=${offset}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
      }),
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
  }),
});

export const { useFetchLeadsQuery, useRefreshDataMutation } = leadsApi;
