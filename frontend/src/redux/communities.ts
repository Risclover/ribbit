import { apiSlice } from "./api";
import type { Community } from "@/types"; // define this type according to your backend

type GetCommunitiesResponse = {
  Communities: Community[];
};

type AddCommunityPayload = {
  name: string;
  description: string;
};

type UpdateCommunityPayload = {
  displayName: string;
  description: string;
};

export const communitiesApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Communities"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCommunities: builder.query<Community[], void>({
        query: () => `/communities`,
        transformResponse: (response: GetCommunitiesResponse) =>
          response.Communities,
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: "Communities" as const,
                  id,
                })),
                { type: "Communities", id: "PARTIAL-LIST" },
              ]
            : [{ type: "Communities", id: "PARTIAL-LIST" }],
      }),

      getCommunity: builder.query<Community, number>({
        query: (communityId) => `/communities/${communityId}`,
        providesTags: (result, error, id) => [{ type: "Communities", id }],
      }),

      addCommunity: builder.mutation<Community, AddCommunityPayload>({
        query: (payload) => ({
          url: `/communities`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: [{ type: "Communities", id: "PARTIAL-LIST" }],
      }),

      updateCommunity: builder.mutation<
        Community,
        { payload: UpdateCommunityPayload; id: number }
      >({
        query: ({ payload, id }) => ({
          url: `/communities/${id}/edit`,
          method: "PUT",
          body: {
            display_name: payload.displayName,
            description: payload.description,
          },
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "Communities", id },
        ],
      }),

      deleteCommunity: builder.mutation<{ success: boolean }, number>({
        query: (id) => ({
          url: `/communities/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, id) => [
          { type: "Communities", id },
          { type: "Communities", id: "PARTIAL-LIST" },
        ],
      }),

      checkCommunityName: builder.mutation<void, string>({
        query: (name) => ({
          url: `/communities/${name}`,
          method: "POST",
          body: { name },
        }),
      }),
    }),
  });

export const {
  useGetCommunitiesQuery,
  useGetCommunityQuery,
  useAddCommunityMutation,
  useUpdateCommunityMutation,
  useDeleteCommunityMutation,
  useCheckCommunityNameMutation,
} = communitiesApi;
