import "../App.css";
import { Account } from "../styled";

export default function ShowActions({ onClickAction, action }) {
  return <Account onClick={onClickAction}>{action}</Account>;
}
