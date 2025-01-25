import { useAuthFlow } from "@/context";

export default function useSignInSwitch({ linkText }) {
  const { openLogin, openSignupPage1 } = useAuthFlow();

  const switchAuthForms = () => {
    if (linkText === "Log In") {
      openLogin();
    } else {
      openSignupPage1();
    }
  };

  return { switchAuthForms };
}
