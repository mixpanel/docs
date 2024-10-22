import style from "./SignUpButton.module.scss";

export default function SignUpButton() {
  return (
    <a className={style.signUpButton} href="https://mixpanel.com/register">
      Sign Up
    </a>
  );
}
