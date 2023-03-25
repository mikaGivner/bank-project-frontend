import "../App.css";
import { Account, Val } from "../styled";

export default function ShowAccount({
  nameAccount,
  cashAccount,
  creditAccount,
  idAccount,
}) {
  const arr = [
    ["Name:", nameAccount],
    ["Cash:", cashAccount],
    ["Credit:", creditAccount],
    ["id:", idAccount],
  ];
  return (
    <Account>
      {arr.map((thisAccount) => {
        return (
          <Val key={Math.random()}>
            {thisAccount[0]}
            {thisAccount[1]}
          </Val>
        );
      })}
    </Account>
  );
}
