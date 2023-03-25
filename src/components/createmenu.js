import { useContext, useRef, useEffect } from "react";
import "../App.css";
import { CreateForm } from "../styled";
import { UserContext } from "./userContext";

export default function CreateMenu({ onSubmit, onChange, BackTo }) {
  const inputRef = useRef(null);
  const { newUserAdd, validMessage, setCreateUserNow } =
    useContext(UserContext);
  useEffect(() => {
    inputRef.current.focus();
  }, [setCreateUserNow]);

  return (
    <CreateForm onSubmit={onSubmit}>
      <label>Choose account"s name</label>
      <input
        type="text"
        onChange={onChange}
        value={newUserAdd}
        ref={inputRef}
      />
      <button type="submit">Create</button>
      {validMessage && validMessage}
      <button type="button" onClick={BackTo}>
        back
      </button>
    </CreateForm>
  );
}
