import "../App.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./userContext";
import { DepositingStyle } from "../styled";

export default function Transferring({
  DoTransferring,
  AddCash,
  AddId,
  AddIdReceiver,
}) {
  const {
    newCashAdded,
    setNewCashAdded,
    newId,
    setNewId,
    errDeposition,
    newIdReceiver,
  } = useContext(UserContext);
  const inputIdRef = useRef(null);
  const inputCashRef = useRef(null);
  const inputReceiverRef = useRef(null);
  useEffect(() => {
    inputIdRef.current.focus();
    inputCashRef.current.focus();
    inputReceiverRef.current.focus();
  }, [setNewId, setNewCashAdded]);
  return (
    <DepositingStyle onSubmit={DoTransferring}>
      <label>How many add to your</label>
      <input
        type="number"
        onChange={AddCash}
        value={newCashAdded}
        ref={inputCashRef}
      />

      <label>Who is the giver? (ID)</label>
      <input type="text" onChange={AddId} value={newId} ref={inputIdRef} />

      <label>Who is the receiver? (ID)</label>
      <input
        type="text"
        onChange={AddIdReceiver}
        value={newIdReceiver}
        ref={inputReceiverRef}
      />

      <button type="submit">Add Cash</button>
      {errDeposition && errDeposition}
    </DepositingStyle>
  );
}
