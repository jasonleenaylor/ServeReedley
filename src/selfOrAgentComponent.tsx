import { Card } from "@mui/material";

interface SelfOrAgentProps {
  selfOrOther: "" | "yes" | "no";
  style: any;
}

export const SelfOrAgent: React.FC<SelfOrAgentProps> = ({
  selfOrOther,
  style,
}: SelfOrAgentProps) => {
  if (selfOrOther === "yes") {
    return <Card style={style}>Self!</Card>;
  }
  if (selfOrOther === "no") {
    return <Card style={style}>Other!</Card>;
  }
  return <div></div>;
};
