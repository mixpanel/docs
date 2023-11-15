import clsx from "clsx";
import { useState } from "react";

import { track } from "../../utils/tracking";
import ThumbsDownIcon from "../svg/ThumbsDown";
import ThumbsUpIcon from "../svg/ThumbsUp";

import style from "./FeedbackCollector.module.scss";

export function FeedbackCollector() {
  const [gaveFeedback, setGaveFeedback] = useState(false);

  const handleFeedback = function (value: boolean) {
    const props = {
      title: document.querySelector(`h1`).textContent,
    }
    track(value ? `Docs Promoter` : `Docs Detractor`, props);
    setGaveFeedback(true);
  };

  return (
    <>
      {gaveFeedback ?
        <p className="nx-text-lg nx-font-medium">Thanks for your feedback!</p> : (
          <>
            <p className="nx-text-lg nx-font-medium">Was this page useful?</p>
            <div className={style.buttonContainer}>
              <button className={style.button} onClick={() => handleFeedback(true)}>
                Yes
                <span className={clsx(style.thumbsUp, style.inlineIcon)}>
                  <ThumbsUpIcon />
                </span>
              </button>
              <button className={style.button} onClick={() => handleFeedback(false)}>
                Could be better
                <span className={clsx(style.thumbsDown, style.inlineIcon)}>
                  <ThumbsDownIcon />
                </span>
              </button>
            </div>
          </>
        )
      }
    </>
  );
}
