import { ProtectedRoute } from "components";
import React, { useState } from "react";

export function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  return (
    <div>
      <ProtectedRoute />
    </div>
  );
}
