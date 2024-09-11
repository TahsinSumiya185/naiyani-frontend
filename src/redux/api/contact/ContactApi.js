import { baseApi } from "../apiSlice";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postContact: builder.mutation({
      query: (contactData) => {
     
        return {
          url: 'contact/c2n/',
          method: 'POST',
          body: contactData,
          headers: {
            'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
        };
      },
    }),
  }),
});

export const { usePostContactMutation } = contactApi;
