import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import { PostPopup } from "components/PostPopup/PostPopup";
import { PostModal } from "context/PostModal";
import { HomepageFeed } from "pages/HomepageFeed";

function Layout() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route path="/" component={HomepageFeed} />
      </Switch>
      {background && (
        <Route
          path="/posts/:postId"
          children={
            <PostModal>
              <PostPopup />
            </PostModal>
          }
        />
      )}
    </div>
  );
}

export default Layout;
