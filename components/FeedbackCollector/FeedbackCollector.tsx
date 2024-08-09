import clsx from "clsx";
import { useState } from "react";

import { track } from "../../utils/tracking";
import ThumbsDownIcon from "../svg/ThumbsDown";
import ThumbsUpIcon from "../svg/ThumbsUp";

// import style from "./FeedbackCollector.module.scss";

export function FeedbackCollector() {
  const [gaveFeedback, setGaveFeedback] = useState(false);

  const handleFeedback = function (isPositive: boolean) {
    // changelogs don't have h1s
    const props = {
      title: document.querySelector(`h1`)?.textContent || document.title,
    };
    track(isPositive ? `Docs Promoter` : `Docs Detractor`, props);
    setGaveFeedback(true);

    // reset feedback to 5 seconds
    setTimeout(() => {
      setGaveFeedback(false);
    }, 5000);
  };

  return (
    <div className="feedbackCollectorContainer">
      <div className="feedbackCollectorRoot">
        {gaveFeedback ? (
          <p className="feedbackThankYouText">Thanks for your feedback!</p>
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
