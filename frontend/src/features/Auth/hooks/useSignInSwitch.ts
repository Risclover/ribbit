import { useAuthFlow } from "@/context";

/**
 * Hook for logic for SignInSwitch
 *
 * @param linkText: Link's text
 */
export default function useSignInSwitch({ linkText }) {
  const { openLogin, openSignupPage1 } = useAuthFlow();

  const switchAuthForms = () =>
    linkText === "Log In" ? openLogin() : openSignupPage1();

  return { switchAuthForms };
}
