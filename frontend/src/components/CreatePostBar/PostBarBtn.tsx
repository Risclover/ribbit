import { ComponentType, MouseEventHandler, ButtonHTMLAttributes } from "react";

/**
 * A simple button used on the post-creation bar.
 *
 * @param icon        React component to render (usually an icon)
 * @param onClick     Click handler
 * @param testId      ID for testing purposes
 * @param ariaLabel   Accessibility label
 * @param className   Optional extra class names
 *
 * @example
 * <PostBarBtn
 *   icon={MyIcon}
 *   onClick={handleClick}
 *   testId="new-post"
 *   ariaLabel="Create post"
 *   className="ml-2"
 * />
 */
interface PostBarBtnProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  icon: ComponentType<any>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  testId?: string;
  ariaLabel?: string;
  className?: string;
}

export const PostBarBtn = ({
  icon: Icon,
  onClick,
  testId,
  ariaLabel,
  className = "",
  ...rest
}: PostBarBtnProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    data-testid={testId}
    className={className}
    {...rest}
  >
    <Icon />
  </button>
);
