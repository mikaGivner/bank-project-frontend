import "../App.css";
import { Box } from "../styled";

export default function menu({ content, actToDo, n }) {
  return (
    <Box onClick={actToDo} n={n}>
      {content}
    </Box>
  );
}
