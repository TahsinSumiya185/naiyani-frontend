import { baseApi } from '../apiSlice';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => ({
        url: '/payment/config/',
      
      }),
      providesTags: ['Config'],
    }),
    createSubscription: builder.mutation({
      query: (priceId) => ({
        url: '/payment/create-subscription/',
        method: 'POST',
        body: { priceId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      }),
      invalidatesTags: ['Subscription'],
    }),
    getAllSubscriptions: builder.query({
      query: () => ({
        url: '/payment/subscriptions/',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      }),
      providesTags: ['Subscription'],
    }),
    cancelSubscription: builder.mutation({
      query: (subscriptionId) => ({
        url: '/payment/cancel-subscription/',
        method: 'POST',
        body: { subscriptionId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      }),
      invalidatesTags: ['Subscription'],
    }),
  }),
});


export const {
  useGetConfigQuery,
  useCreateSubscriptionMutation,
  useGetAllSubscriptionsQuery,
  useCancelSubscriptionMutation,
} = paymentApi;
