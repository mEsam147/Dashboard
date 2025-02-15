import { Skeleton } from "@mui/material";

const QuizSkeleton = () => {
  return (
    <div>
      <Skeleton height={300} variant="rounded" data-testid="quiz-skeleton" />
    </div>
  );
};

export default QuizSkeleton;
