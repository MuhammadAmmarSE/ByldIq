export interface QuestionnaireTasteProps {
  selectedGoalId: string | null;
  onSelectGoal: (goalId: string) => void;
  className?: string;
}
