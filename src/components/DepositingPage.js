import "../App.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./userContext";
import { DepositingStyle } from "../styled";

export default function DepositingPage({ DoDeposition, AddCash, AddId }) {
  const { newCashAdded, setNewCashAdded, newId, setNewId, errDeposition } =
    useContext(UserContext);
  const inputIdRef = useRef(null);
  const inputCashRef = useRef(null);
  useEffect(() => {
    inputIdRef.current.focus();
    inputCashRef.current.focus();
  }, [setNewId, setNewCashAdded]);
  return (
    <DepositingStyle onSubmit={DoDeposition}>
      <label>How many add to your</label>
      <input
        type="number"
        onChange={AddCash}
        value={newCashAdded}
        ref={inputCashRef}
      />

      <label>Enter ID</label>
      <input type="text" onChange={AddId} value={newId} ref={inputIdRef} />
      <button type="submit">Add Cash</button>
      {errDeposition && errDeposition}
    </DepositingStyle>
  );
}
