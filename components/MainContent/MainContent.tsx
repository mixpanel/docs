import { FeedbackCollector } from "../FeedbackCollector/FeedbackCollector";

interface Props {
  children: React.ReactNode;
}

const MainContent: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      {children}
      <FeedbackCollector />
      <div id="consent-banner"></div>
    </>
  );
};

export default MainContent;
