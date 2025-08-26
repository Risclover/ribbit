import { apiSlice } from "./api";
import type { Post } from "@/types";

type GetPostsArgs = {
  limit?: number;
  offset?: number;
  order?: string;
};

type GetPostsResponse = {
  posts: Post[];
  nextOffset: number | null;
  hasMore: boolean;
};

export const postsApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Posts"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query<GetPostsResponse, GetPostsArgs>({
        query: ({ limit = 100, offset = 0, order = "new" } = {}) => ({
          url: "/posts",
          params: { limit, offset, order },
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.posts.map(({ id }) => ({
                  type: "Posts" as const,
                  id,
                })),
                { type: "Posts", id: "PARTIAL-LIST" },
              ]
            : [{ type: "Posts", id: "PARTIAL-LIST" }],
      }),

      getPost: builder.query<Post, number>({
        query: (id) => `/posts/${id}`,
        providesTags: (result, error, id) => [{ type: "Posts", id }],
      }),

      addPost: builder.mutation<Post, Partial<Post>>({
        query: (post) => ({
          url: `/posts/submit`,
          method: "POST",
          body: post,
        }),
        invalidatesTags: [{ type: "Posts", id: "PARTIAL-LIST" }],
      }),

      editPost: builder.mutation<Post, Post>({
        query: (post) => ({
          url: `/posts/${post.id}/edit`,
          method: "PUT",
          body: post,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "Posts", id: arg.id },
        ],
      }),

      addImagePost: builder.mutation<Post, Partial<Post>>({
        query: (post) => ({
          url: `/posts/img/submit`,
          method: "POST",
          body: post,
        }),
        invalidatesTags: [{ type: "Posts", id: "PARTIAL-LIST" }],
      }),

      addLinkPost: builder.mutation<Post, Partial<Post>>({
        query: (post) => ({
          url: `/posts/url/submit`,
          method: "POST",
          body: post,
        }),
        invalidatesTags: [{ type: "Posts", id: "PARTIAL-LIST" }],
      }),

      deletePost: builder.mutation<{ success: boolean }, number>({
        query: (id) => ({
          url: `/posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, id) => [
          { type: "Posts", id },
          { type: "Posts", id: "PARTIAL-LIST" },
        ],
      }),

      addPostVote: builder.mutation<Post, { postId: number; votetype: string }>(
        {
          query: ({ postId, votetype }) => ({
            url: `/posts/${postId}/vote/${votetype}`,
            method: "POST",
          }),
          invalidatesTags: (result, error, { postId }) => [
            { type: "Posts", id: postId },
          ],
        }
      ),

      removePostVote: builder.mutation<Post, number>({
        query: (postId) => ({
          url: `/posts/${postId}/vote`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, postId) => [
          { type: "Posts", id: postId },
        ],
      }),
    }),
  });
