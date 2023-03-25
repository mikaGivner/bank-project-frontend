import "../App.css";
import { Account, Val } from "../styled";

export default function ShowAccount({
  nameAccount,
  cashAccount,
  creditAccount,
  idAccount,
}) {
  return (
    <Account>
      <Val>Name:{nameAccount} </Val>
      <Val>Cash:{cashAccount}</Val>
      <Val>Credit:{creditAccount}</Val>
      <Val>id:{idAccount}</Val>
    </Account>
  );
}
