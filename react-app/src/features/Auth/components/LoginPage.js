import React, { useState } from "react";
import { AuthModal, Modal } from "@/context";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { LoginSignupModal } from ".";

export function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div>
      <LoginSignupModal showLoginForm={showLoginForm} />
    </div>
  );
}
