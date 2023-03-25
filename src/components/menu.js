import "../App.css";
import { Box } from "../styled";

export default function menu({ content, actToDo, color }) {
  return (
    <Box onClick={actToDo} color={color}>
      {content}
    </Box>
  );
}
