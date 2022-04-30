import style from "../styles/Error.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons"

export default function Error({error}) {
    const errors = {
      Signin: "Try signing with a different account.",
      OAuthSignin: "Try signing with a different account.",
      OAuthCallback: "Try signing with a different account.",
      OAuthCreateAccount: "Try signing with a different account.",
      EmailCreateAccount: "Try signing with a different account.",
      Callback: "Try signing with a different account.",
      FailedRequest: "Fail to connect to the server.",
      OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
      EmailSignin: "Check your email address.",
      CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
      RequiredInputs: "Provide the required data",
      default: "Unable to sign in.",
    };
    const errorMessage = errors[error] || errors.default;
  
    return (
        <div className={style.error}>
            <FontAwesomeIcon icon={faX} /> 
            <h3>{errorMessage}</h3>            
        </div>
    )
}
