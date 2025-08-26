import { apiSlice } from "./api";

export const usersSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => "/users",
        providesTags: (result, error, arg) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "User" as const, id })),
                "User",
              ]
            : ["User"],
      }),
      getUser: builder.query({
        query: (id) => `/users/${id}`,
      }),
      editProfile: builder.mutation({
        query: (user) => ({
          url: `users/${user.id}/profile/edit`,
          method: "PUT",
          body: user,
        }),
        invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
      }),
    }),
  });
