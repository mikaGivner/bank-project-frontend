import "../App.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./userContext";
import { DepositingStyle } from "../styled";

export default function Transferring({
  DoTransferring,
  AddCash,
  AddId,
  AddIdReceiver,
  title,
}) {
  const {
    newCashAdded,
    setNewCashAdded,
    newId,
    setNewId,
    errDeposition,
    newIdReceiver,
    updateNow,
  } = useContext(UserContext);

  const inputIdRef = useRef(null);
  const inputCashRef = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    inputIdRef.current.focus();
    inputCashRef.current.focus();
    updateNow === "Transferring" && ref3.current.focus();
  }, [setNewId, setNewCashAdded, updateNow]);

  const dataArr = [
    ["How many add to your", "number", AddCash, newCashAdded, inputCashRef],
    ["Who is the giver? (ID)", "text", AddId, newId, inputIdRef],
  ];
  return (
    <DepositingStyle onSubmit={DoTransferring}>
      {title}
      {dataArr.map((obj, i) => (
        <>
          <label>{obj[0]}</label>
          <input type={obj[1]} onChange={obj[2]} value={obj[3]} ref={obj[4]} />
        </>
      ))}
      {updateNow === "Transferring" && (
        <>
          <label>Who is the receiver? (ID)</label>
          <input
            type="text"
            onChange={AddIdReceiver}
            value={newIdReceiver}
            ref={ref3}
          />
        </>
      )}
      <button type="submit">Add Cash</button>
      {errDeposition && errDeposition}
    </DepositingStyle>
  );
}
