import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components";
import { searchRoutes, messageRoutes, createPostPageRoutes } from "@/routes";
import { ScrollProvider } from "@/context";
import {
  AllPostsFeed,
  CommunitiesDirectory,
  CommunityPage,
  EditProfile,
  HomepageFeed,
  SingleImagePage,
  SinglePostPage,
  UserProfile,
  CreatePostPage,
} from "@/pages";
import {
  EditCommunity,
  PreviewCommunity,
  UpdateImagePost,
  UpdatePost,
} from "@/features";
import { LoginSignupModal } from "features";

export const AppRoutes = ({
  user,
  postType,
  setPostType,
  searchbarRef,
  setOpenChat,
}) => {
  return (
    <ScrollProvider>
      <Switch>
        <Route path="/" exact>
          {user ? <HomepageFeed /> : <AllPostsFeed />}
        </Route>

        <Route path="/login">
          <LoginSignupModal formType="protected" />
        </Route>

        <Route path="/all" exact={true}>
          <AllPostsFeed />
        </Route>

        <Route path="/directory" exact>
          <CommunitiesDirectory />
        </Route>

        <Route path="/posts/:postId" exact>
          <SinglePostPage />
        </Route>

        <Route path="/images/:postId" exact>
          <SingleImagePage />
        </Route>

        <Route path="/c/:communityName" exact>
          <CommunityPage />
        </Route>

        {createPostPageRoutes.map(({ path, val }) => (
          <ProtectedRoute key={path} path={path} exact>
            <CreatePostPage
              postType={postType}
              setPostType={setPostType}
              val={val}
            />
          </ProtectedRoute>
        ))}

        {messageRoutes.map(({ path, exact, component: MessagesComponent }) => (
          <ProtectedRoute key={path} path={path} exact={exact}>
            <MessagesComponent />
          </ProtectedRoute>
        ))}

        {searchRoutes.map(({ path, component: SearchComponent }) => (
          <Route key={path} path={path} exact>
            <SearchComponent searchbarRef={searchbarRef} />
          </Route>
        ))}

        <ProtectedRoute path="/c/:communityName/style" exact>
          <PreviewCommunity />
        </ProtectedRoute>

        <ProtectedRoute path="/c/:communityName/edit" exact>
          <EditCommunity />
        </ProtectedRoute>

        <ProtectedRoute path="/settings/profile" exact>
          <EditProfile />
        </ProtectedRoute>

        <ProtectedRoute path="/posts/:postId/img/edit" exact>
          <UpdateImagePost />
        </ProtectedRoute>

        <ProtectedRoute path="/posts/:postId/edit" exact>
          <UpdatePost />
        </ProtectedRoute>

        <Route path="/users/:userId/profile" exact>
          <UserProfile setOpenChat={setOpenChat} />
        </Route>
      </Switch>
    </ScrollProvider>
  );
};
