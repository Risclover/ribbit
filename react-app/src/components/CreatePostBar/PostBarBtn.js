import React from "react";

/**
 * A simple component representing the right-most buttons on the post creation bar.
 *
 * @param {string} icon -
 * @param {onClick} onClick -
 * @param {string} testId - id given to component for testing purposes
 * @param {} ariaLabel -
 *
 * @example
 * <PostBarBtn icon={} onClick={} testId={} ariaLabel={} />
 */

export const PostBarButton = ({ icon: Icon, onClick, testId, ariaLabel }) => (
  <button aria-label={ariaLabel} onClick={onClick} data-testid={testId}>
    <Icon />
  </button>
);
