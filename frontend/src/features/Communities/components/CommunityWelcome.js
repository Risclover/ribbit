import React, { useEffect, useState } from "react";
import { Modal } from "@/context";
import { CommunityWelcomeModal } from "..";

export function CommunityWelcome({ community, user, posts, commPosts }) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (community?.userId === user?.id) {
        if (posts.length === 0 || posts === undefined || !posts) {
          setShowWelcomeModal(true);
        } else if (commPosts.length !== 0) {
          setShowWelcomeModal(false);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [commPosts, community?.userId, user?.id, posts]);

  return (
    <div>
      {showWelcomeModal && (
        <Modal
          close={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          title="Create your first post"
          open={() => setShowWelcomeModal(true)}
        >
          <CommunityWelcomeModal
            setShowWelcomeModal={setShowWelcomeModal}
            showWelcomeModal={showWelcomeModal}
            community={community}
          />
        </Modal>
      )}
    </div>
  );
}
