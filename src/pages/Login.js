import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import OtpInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth, provider } from "../firebase.config";
import logo from "../assets/logo.png";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
const App = ({ setIsAuth, isAuth }) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  if (isAuth) {
    navigate("/");
    return null;
  }

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("login successfully");
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        // toast.error("OTP fail to send!");
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        console.log("login successfully");
        toast.success("Login successfully!");
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Login fail!");
      });
  }

  return (
    <div className="bg-site">
      <section className=" flex flex-col items-center justify-center min-h-screen bg-errorPage bg-fixed bg-cover bg-bottom py-10">
        <div className="px-5  w-full md:w-auto">
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <h2 className="text-center text-white font-medium text-2xl">
              👍Login Success
            </h2>
          ) : (
            <div className=" border border-white/30 rounded-3xl">
              <div className="w-100 flex flex-col gap-4  p-8 rounded-3xl">
                <div>
                  <img src={logo} alt="logo" />
                </div>
                <h1 className="text-center leading-normal  font-bold text-4xl mb-6 text-blue-400 uppercase">
                  Login
                </h1>
                {showOTP ? (
                  <>
                    <div className="bg-white text-blue-400 w-fit mx-auto rounded-full">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-white text-center"
                    >
                      Enter your OTP
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      autoFocus
                      className="opt-container text-black"
                    ></OtpInput>
                    <button
                      onClick={onOTPVerify}
                      className="btn btn-sm w-full flex gap-1 items-center justify-center"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-white text-blue-400 w-fit mx-auto rounded-full p-4">
                      <BsTelephoneFill size={30} />
                    </div>
                    <label
                      htmlFor=""
                      className="font-bold text-xl text-white text-center"
                    >
                      Verify your phone number
                    </label>
                    <PhoneInput country={"kh"} value={ph} onChange={setPh} />
                    <button
                      onClick={onSignup}
                      className="btn btn-sm w-full flex gap-1 items-center justify-center "
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Send code via SMS</span>
                    </button>
                  </>
                )}
              </div>
              <div className="mb-5">
                <div className="text-center mt-5 text-white">
                  ---------or---------
                </div>
                <ContinueWithGoogle signIn={signIn} />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
