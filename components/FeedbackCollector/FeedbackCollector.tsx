import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { track } from "../../utils/tracking";
import ThumbsDownIcon from "../svg/ThumbsDown";
import ThumbsUpIcon from "../svg/ThumbsUp";

const scheduleLink = `https://calendly.com/d/ckzh-2ym-kpx/talk-to-a-mixpanel-pm`;

export function FeedbackCollector() {
  const router = useRouter();
  const [gaveFeedback, setGaveFeedback] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState(``);

  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      // reset the feedback on URL change.
      setGaveFeedback(false);
    });
  });

  const handleFeedback = function (isPositive: boolean) {
    // changelogs don't have h1s
    const props = {
      title: document.querySelector(`h1`)?.textContent || document.title,
    };
    track(isPositive ? `Docs Promoter` : `Docs Detractor`, props);
    setGaveFeedback(true);
  };

  const handleSubmitFeedback = () => {
    track(`Docs feedback sumitted`, {
      feedback: feedbackContent,
    });
    alert("Your feedback was successfully submitted.");
    setFeedbackContent(``);
    setGaveFeedback(false);
  };

  return (
    <div className="feedbackCollectorContainer">
      <div className="feedbackCollectorRoot">
        {gaveFeedback ? (
          <div>
            <p className="feedbackThankYouText">Thanks for your feedback!</p>
            <p> Have additional feedback? Please fill out the form below. </p>
            <textarea
              onChange={(e) => setFeedbackContent(e.target.value)}
              className="feedbackTextArea"
            />
            <div>
              <button
                className="cancelButton"
                onClick={() => setGaveFeedback(false)}
              >
                Close
              </button>
              <button
                className="submitButton"
                onClick={() => handleSubmitFeedback()}
              >
                Submit Feedback
              </button>
              <p className="scheduleCallContainer">
              <strong>{"Would a call be easier? Grab time with a Mixpanel PM "}
              <a
                target="_blank"
                className="scheduleCallAnchorTag"
                rel="noopener noreferrer"
                href={scheduleLink}
              >
                
                { "here."}
              </a>
              </strong>
            </p>
            </div>
          </div>
        ) : (
          <>
            <p className="feedbackQuestionTitle">Was this page useful?</p>
            <div className="feedbackButtonContainer">
              <button
                className="feedbackButton"
                onClick={() => handleFeedback(true)}
              >
                Yes
                <span className="feedbackThumbsUpIcon">
                  <ThumbsUpIcon />
                </span>
              </button>
              <button
                className="feedbackButton"
                onClick={() => handleFeedback(false)}
              >
                Could be better
                <span className="feedbackThumbsDownIcon">
                  <ThumbsDownIcon />
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
