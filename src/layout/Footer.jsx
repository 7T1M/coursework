import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`}{" "}
        <span className="font-weight-semibold">TAB DEV TEAM</span>
        <span className="font-weight-semibold"></span>&nbsp;Все права защищены
      </span>
    </footer>
  );
}
