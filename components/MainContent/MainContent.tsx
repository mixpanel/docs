import { FeedbackCollector } from "../FeedbackCollector/FeedbackCollector";

interface Props {
  children: React.ReactNode;
}

const MainContent: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      {children}
      <FeedbackCollector />
    </>
  );
};

export default MainContent;
