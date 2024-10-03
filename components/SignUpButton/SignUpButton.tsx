import style from "./SignUpButton.module.scss";

export default function SignUpButton() {
  return (
    <div className={style.signUpButton}>
      <a href="https://mixpanel.com/register">Sign Up</a>
    </div>
  );
}
