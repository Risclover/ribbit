import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import CommunityWelcome from "../../features/Communities/CommunityWelcome";

export default function CommunityWelcomeModal({
  community,
  user,
  posts,
  commPosts,
}) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (community?.userId === user?.id) {
        if (posts.length === 0 || posts === undefined || !posts) {
          setShowWelcomeModal(true);
        } else if (commPosts.length !== 0) {
          setShowWelcomeModal(false);
        }
      }
    }, 1000);
  }, [commPosts]);

  return (
    <div>
      {showWelcomeModal && (
        <Modal
          onClose={() => setShowWelcomeModal(false)}
          title="Create your first post"
        >
          <CommunityWelcome
            setShowWelcomeModal={setShowWelcomeModal}
            showWelcomeModal={showWelcomeModal}
            community={community}
          />
        </Modal>
      )}
    </div>
  );
}
