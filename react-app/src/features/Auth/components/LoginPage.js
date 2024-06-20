import React, { useState } from "react";
import { LoginSignupModal, ProtectedRoute } from ".";

export function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div>
      <ProtectedRoute />
    </div>
  );
}
