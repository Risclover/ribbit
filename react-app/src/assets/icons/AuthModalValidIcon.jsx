export function AuthModalValidIcon({ name }) {
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
}
