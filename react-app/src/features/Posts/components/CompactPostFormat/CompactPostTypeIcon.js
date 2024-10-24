import { HiOutlineExternalLink } from "react-icons/hi";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";

export function CompactPostTypeIcon({ post, setPostExpand, postExpand }) {
  const handlePostExpandClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPostExpand(!postExpand);
  };

  const renderExpandCollapseButton = () => (
    <button
      aria-label="Expand/close post"
      className="compact-post-icon-btn"
      onClick={handlePostExpandClick}
    >
      {postExpand ? (
        <span className="compact-post-icon-btn-collapse">
          <BsArrowsAngleContract />
        </span>
      ) : (
        <>
          <span className="compact-post-icon-btn-post">
            {post?.imgUrl ? <RxImage /> : <CgNotes />}
          </span>
          <span className="compact-post-icon-btn-expand">
            <BsArrowsAngleExpand />
          </span>
        </>
      )}
    </button>
  );

  const renderLinkButton = () => (
    <button
      aria-label="Open external link"
      className="compact-post-icon-btn"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        window.open(post?.linkUrl);
      }}
    >
      <HiOutlineExternalLink />
    </button>
  );

  return (
    <div className="compact-post-icon">
      {post?.content === "" && post.linkUrl === null && (
        <button
          aria-label="Open text post"
          className="compact-post-icon-btn expandless"
        >
          <CgNotes />
        </button>
      )}
      {post?.content !== "" &&
        post.linkUrl === null &&
        post.imgUrl === null &&
        renderExpandCollapseButton()}
      {post?.linkUrl !== null && renderLinkButton()}
      {post?.imgUrl && renderExpandCollapseButton()}
    </div>
  );
}
