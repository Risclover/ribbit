import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { PostPopup } from "components/PostPopup";
import { PostModal } from "context/PostModal";
import { HomepageFeed } from "pages/HomepageFeed";
import { useSelector } from "react-redux";

function Layout() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      <Switch location={background || location}>
        {user ? (
          <Route path="/" exact={true}>
            <HomepageFeed />
          </Route>
        ) : (
          <Route path="/" exact={true}>
            <AllPostsFeed />
          </Route>
        )}

        <Route path="/home" exact={true}>
          <HomepageFeed />
        </Route>
      </Switch>
      {background && (
        <Route path="/posts/:postId">
          <PostModal>
            <PostPopup />
          </PostModal>
        </Route>
      )}
    </div>
  );
}

export default Layout;
