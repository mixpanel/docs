export const SubscribeButtonWithModal = () => {
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

  const GTM_FORM_ENDPOINT = "https://mixpanel.com/api/app/form/gtm_form";

  const STATE = { DEFAULT: "default", FOCUS: "focus", ERROR: "error", SUCCESS: "success" };

  const dialogRef = useRef(null);

  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [inputState, setInputState] = useState(STATE.DEFAULT);

  const submitDisabled =
    !agreedToTerms ||
    inputState === STATE.SUCCESS ||
    !email ||
    !EMAIL_REGEX.test(email);

  const openModal = () => dialogRef.current?.showModal?.();
  const closeModal = () => dialogRef.current?.close?.();

  const validateEmail = () => {
    if (!email) {
      setInputState(STATE.ERROR);
      setError("Email address is required.");
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setInputState(STATE.ERROR);
      setError("Please enter a valid email address");
      return false;
    }
    setInputState(STATE.DEFAULT);
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      await fetch(GTM_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_name: "Product Updates Subscription",
          subscribe_topics: ["Product Newsletter Emails"],
          email_address: email,
          agreed_on_privacy_terms: true,
          email_preference_opt_in_info: true,
          distinct_id: window.mixpanel?.get_property?.("distinct_id") ?? "",
        }),
      });
      window.mixpanel?.track("[DOCS] Subscribed to Product Updates", {});
      setInputState(STATE.SUCCESS);
      setError("");
    } catch (err) {
      console.error("[DOCS] Subscribe to Product Updates Failed", err);
      setError("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openModal}
        className="px-5 py-3 my-4 drop-shadow-sm bg-gradient-to-t from-[#7856ff] to-[#9075ff] rounded-full text-white font-medium"
      >
        Subscribe
      </button>

      <dialog
        ref={dialogRef}
        onMouseDown={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
        className="w-full max-w-2xl p-0 rounded-3xl bg-transparent backdrop:bg-black/80"
      >
        <div className="bg-[#fbf9f9] dark:bg-[#201f24] p-8 rounded-3xl">
          <div className="text-3xl font-medium text-center mb-4">Subscribe to product updates</div>
          <div className="text-lg text-center mb-6">Sign up to stay up-to-date on our newest releases.</div>

          <div className="flex flex-col">
            <label className="font-medium ml-6 mb-1">Company Email</label>
            <input
              className="rounded-full px-6 py-3.5 outline-[#7856ff]"
              aria-label="Email address"
              disabled={inputState === STATE.SUCCESS}
              value={inputState === STATE.SUCCESS ? "Thanks for subscribing!" : email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              onFocus={() => setInputState(STATE.FOCUS)}
              onBlur={() => {
                setInputState(STATE.DEFAULT);
                validateEmail();
              }}
            />
          </div>

          {error && <p className="text-xs text-[#cc332b] ml-6 mt-1">{error}</p>}

          <div className="flex items-center gap-3 mt-4">
            <input
              className="flex-shrink-0"
              type="checkbox"
              aria-label="Agree to terms"
              disabled={inputState === STATE.SUCCESS}
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms((v) => !v)}
            />
            <span className="text-[#626266] text-xs leading-normal">
              I agree to receive product update emails about Mixpanel products pursuant to the{" "}
              <a href="https://www.mixpanel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                Privacy Statement
              </a>
              . I understand that I can opt-out at any time.
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitDisabled}
            className="px-5 py-3 my-4 drop-shadow-sm bg-gradient-to-t from-[#7856ff] to-[#9075ff] rounded-full text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Subscribe
          </button>
        </div>
      </dialog>
    </div>
  );
};
