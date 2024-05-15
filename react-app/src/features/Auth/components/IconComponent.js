import React from "react";

export const IconComponent = ({ iconType, name }) => {
  switch (iconType) {
    case "error":
      return (
        <svg
          rpl=""
          className={`trailing-icon invalid${
            name === "email" || name === "password" || name === "signup-email"
              ? " valid-pass"
              : ""
          }`}
          fill="#A50016"
          height="20"
          icon-name="error-outline"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 20a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Zm0-18.75A8.75 8.75 0 1 0 18.75 10 8.76 8.76 0 0 0 10 1.25Zm-.533 13.716a1.077 1.077 0 0 1-.53-.92 1.058 1.058 0 0 1 .53-.919c.16-.096.343-.146.53-.144a1.056 1.056 0 0 1 .926.527 1.045 1.045 0 0 1 0 1.069c-.096.16-.23.293-.39.387a1.03 1.03 0 0 1-.536.143 1.016 1.016 0 0 1-.53-.143Zm-.14-3.329-.192-6.613h1.73l-.192 6.613H9.327Z"></path>
        </svg>
      );

    case "valid":
      return (
        <svg
          rpl=""
          className={`trailing-icon valid${
            name === "password" || name === "email" || name === "signup-email"
              ? " valid-pass"
              : ""
          }`}
          fill="#0E8A00"
          height="20"
          icon-name="checkmark-fill"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.5 15.958a1.102 1.102 0 0 1-.778-.322l-5.429-5.429 1.414-1.414L7.5 13.586 17.793 3.293l1.414 1.414L8.278 15.636a1.101 1.101 0 0 1-.778.322Z"></path>
        </svg>
      );

    case "rotate":
      return (
        <svg
          rpl=""
          fill="#000000"
          height="20"
          icon-name="rotate-fill"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.2 15.376a1 1 0 0 1 0 1.25l-2.4 2.999a1 1 0 0 1-1.112.318 1 1 0 0 1-.673-.943v-2H7.8A5.8 5.8 0 0 1 2 11.206V9.001h2v2.205a3.8 3.8 0 0 0 3.8 3.795h2.22v-2a1 1 0 0 1 1.781-.625l2.399 3ZM12.205 3.002h-2.22v-2A1 1 0 0 0 8.2.38l-2.4 3a1 1 0 0 0 0 1.25l2.4 3a1 1 0 0 0 1.116.315 1 1 0 0 0 .669-.943v-2h2.22A3.8 3.8 0 0 1 16 8.802v2.2h2v-2.2a5.8 5.8 0 0 0-5.795-5.8Z"></path>
        </svg>
      );

    default:
      return null;
  }
};
