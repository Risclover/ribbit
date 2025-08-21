/**
 * A button used on the post-creation bar.
 *
 * @param icon        Icon component to render
 * @param onClick     Click handler
 * @param testId      ID for testing purposes
 * @param ariaLabel   Accessibility label
 *
 * @example
 * <PostBarBtn
 *   icon={MyIcon}
 *   onClick={handleClick}
 *   testId="new-post"
 *   ariaLabel="Create post"
 * />
 */

export const PostBarBtn = ({
  icon: Icon,
  onClick,
  testId,
  ariaLabel,
  ...rest
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    data-testid={testId}
    {...rest}
  >
    <Icon />
  </button>
);
