import { track } from "../../utils/tracking";

export function FeedbackCollector() {
  const handleFeedback = function (value: boolean) {
    const props = {
      title: document.querySelector(`h1`).textContent,
    }
    track(value ? `Docs Promoter` : `Docs Detractor`, props);
  };

  return (
    <>
    Was this page useful?
      <button onClick={() => handleFeedback(true)}>Yes 👍</button>
      <button onClick={() => handleFeedback(false)}>Could be better 👎</button>
    </>
  );
}
