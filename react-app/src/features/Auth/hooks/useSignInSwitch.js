import { useAuthFlow } from "@/context";

export default function useSignInSwitch({ linkText }) {
  const { openLogin, openSignupPage1 } = useAuthFlow();

  const switchAuthForms = () =>
    linkText === "Log In" ? openLogin() : openSignupPage1();

  return { switchAuthForms };
}
