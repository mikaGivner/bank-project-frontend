import { createContext, useState } from "react";
// import ReactDOM from "react-dom/client";
export const UserContext = createContext();

export function UserProvider(props) {
  const [newUserAdd, setNewUserAdd] = useState("");
  const [validMessage, setValidMessage] = useState("");
  const [newCashAdded, setNewCashAdded] = useState("");
  const [newId, setNewId] = useState("");
  const [newIdReceiver, setNewIdReceiver] = useState("");
  const [createUserNow, setCreateUserNow] = useState(false);
  const [errDeposition, setErrDeposition] = useState("");
  const [updateNow, setUpdateNow] = useState("");
  const contextValue = {
    updateNow,
    setUpdateNow,
    newIdReceiver,
    setNewIdReceiver,
    errDeposition,
    setErrDeposition,
    newId,
    setNewId,
    newCashAdded,
    setNewCashAdded,
    createUserNow,
    setCreateUserNow,
    newUserAdd,
    setNewUserAdd,
    validMessage,
    setValidMessage,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
