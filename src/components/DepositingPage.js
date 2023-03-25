import "../App.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "./userContext";
import { DepositingStyle } from "../styled";

export default function DepositingPage({
  DoDeposition,
  AddCash,
  AddId,
  title,
}) {
  const { newCashAdded, setNewCashAdded, newId, setNewId, errDeposition } =
    useContext(UserContext);
  const inputIdRef = useRef(null);
  const inputCashRef = useRef(null);

  useEffect(() => {
    inputIdRef.current.focus();
    inputCashRef.current.focus();
  }, [setNewId, setNewCashAdded]);
  const dataArr = [
    ["How many add to your", "number", AddCash, newCashAdded, inputCashRef],
    ["Enter ID", "text", AddId, newId, inputIdRef],
  ];
  return (
    <DepositingStyle onSubmit={DoDeposition}>
      {title}
      {dataArr.map((obj, i) => {
        return (
          <>
            {" "}
            <label>{obj[0]}</label>
            <input
              type={obj[1]}
              onChange={obj[2]}
              value={obj[3]}
              ref={obj[4]}
            />
          </>
        );
      })}
      <button type="submit">Add Cash</button>
      {errDeposition && errDeposition}
    </DepositingStyle>
  );
}
