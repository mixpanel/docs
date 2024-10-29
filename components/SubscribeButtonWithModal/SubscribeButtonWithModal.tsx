import { useState, MouseEvent } from "react";
import { Checkbox, Dialog } from "@headlessui/react";
import { track } from "../../utils/tracking";
import { APIMethods, BaseAPI, HeaderContentType } from "../../utils/client";
//import { APIMethods, BaseAPI, HeaderContentType } from "@src/utils/client";

// default, focus, error, success
const enum SubscribeInputState {
  Default = `default`,
  Focus = `focus`,
  Error = `error`,
  Success = `success`,
}

// From /iron/common/util/string.ts
// See https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
export const IRON_EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const GTMFormEndpoint = `https://mixpanel.com/api/app/form/gtm_form`; // prod domain for testing even in staging

export default function SubscribeButtonWithModal() {
  const [email, setEmail] = useState(``);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState(``);
  const [isOpen, setIsOpen] = useState(false);
  const [subscribeInputState, setSubscribeInputState] = useState(
    SubscribeInputState.Default
  );

  const validateEmail = (): string => {
    let errorMsg = ``;
    if (!email) {
      errorMsg = `Email address is required.`;
    } else if (!IRON_EMAIL_REGEX.test(email)) {
      errorMsg = `Please enter a valid email address`;
    }
    if (errorMsg) {
      setSubscribeInputState(SubscribeInputState.Error);
      setError(errorMsg);
    } else {
      setSubscribeInputState(SubscribeInputState.Default);
      setError(``);
    }
    return errorMsg;
  };

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (!validateEmail()) {
      try {
        await BaseAPI({
          url: GTMFormEndpoint,
          method: APIMethods.POST,
          headerContentType: HeaderContentType.JSON,
          body: {
            form_name: `Product Updates Subscription`,
            subscribe_topics: [`Product Newsletter Emails`],
            email_address: email,
            //TODO: Follow Up with Legal/Design
            agreed_on_privacy_terms: true,
            email_preference_opt_in_info: true,
            distinct_id:
              // @ts-ignore
              mixpanel?.get_property !== undefined
                ? // @ts-ignore
                  mixpanel?.get_property(`distinct_id`)
                : ``,
          },
        });
        track(`[DOCS] Subscribed to Product Updates`, {});
        setSubscribeInputState(SubscribeInputState.Success);
        setError(``);
        setIsOpen(false);
      } catch (e) {
        // send to rollbar.
        /* track(
          BlogEvents.SubscribeRequestFailed,
          {
            message:
              `failed to succesfully submit Subscribe request` +
              (e instanceof Error ? e.message : JSON.stringify(e)),
          },
          true,
          RollbarType.Error
        ); */
        setError(`Failed to subscribe. Please try again.`);
      }
    }
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        SUBSCRIBE
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="nx-fixed nx-inset-0 nx-flex nx-w-screen nx-items-center nx-justify-center nx-p-4 nx-bg-black nx-bg-opacity-80 nx-z-20">
          <Dialog.Panel className="nx-w-full nx-max-w-2xl ">
            <div className="changelogSubscribeModalInner nx-bg-base80 nx-p-8 nx-rounded-3xl">
              <div className="nx-text-3xl nx-font-medium nx-text-center nx-mb-4">
                Subscribe to product updates
              </div>
              <div className="nx-text-lg nx-text-center nx-mb-6">
                Sign up to stay up-to-date on our newest releases.
              </div>
              <div className="nx-flex nx-flex-col">
                <label className="nx-font-medium nx-ml-6 nx-mb-1">
                  Company Email
                </label>
                <input
                  className="nx-rounded-full nx-px-6 nx-py-3.5"
                  aria-label="Subscribe"
                  disabled={subscribeInputState === SubscribeInputState.Success}
                  value={
                    subscribeInputState === SubscribeInputState.Success
                      ? `Thanks for subscribing!`
                      : email
                  }
                  onChange={(evt) => setEmail(evt.target.value)}
                  placeholder="you@email.com"
                  onFocus={(_e) =>
                    setSubscribeInputState(SubscribeInputState.Focus)
                  }
                  onBlur={(_e) => {
                    setSubscribeInputState(SubscribeInputState.Default);
                    validateEmail();
                  }}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  aria-label="Subscribe"
                  disabled={subscribeInputState === SubscribeInputState.Success}
                  aria-selected={agreedToTerms}
                  onChange={(_e) => setAgreedToTerms((agreed) => !agreed)}
                  onBlur={(_e) => {
                    validateEmail();
                  }}
                />
                <span>
                  I agree to receive product update emails about Mixpanel
                  products pursuant to the{" "}
                  <a
                    href="https://www.mixpanel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Statement
                  </a>
                  . I understand that I can opt-out at any time.
                </span>
              </div>
              {error ? (
                <div>
                  <p>{error}</p>
                </div>
              ) : (
                <></>
              )}
              <button
                onClick={handleSubmit}
                disabled={
                  subscribeInputState === SubscribeInputState.Error ||
                  !agreedToTerms
                }
              >
                Subscribe
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
