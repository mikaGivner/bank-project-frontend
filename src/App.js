import { useEffect, useState, useContext, useCallback } from "react";

import Box from "./components/menu";
import ShowAccount from "./components/showAccount";
import "./App.css";
import ShowActions from "./components/ShowActions";
import CreateMenu from "./components/createmenu";
import axios from "axios";
import { UserContext } from "./components/userContext";
import DepositingPage from "./components/DepositingPage";
import { InnerBox } from "./styled/InnerBox";
import Transferring from "./components/TransferringPage";
function App() {
  const {
    newUserAdd,
    setNewUserAdd,
    createUserNow,
    setCreateUserNow,
    setValidMessage,
    newCashAdded,
    setNewCashAdded,
    newId,
    setNewId,
    setErrDeposition,
    setNewIdReceiver,
    newIdReceiver,
  } = useContext(UserContext);

  const [nameData, setNameData] = useState([]);
  const [doAction, setDoAction] = useState(false);
  const [anAction, setAnAction] = useState(false);
  const [updateNow, setUpdateNow] = useState("");

  const Actions = () => {
    if (!doAction && !anAction) setDoAction(true);
  };
  const Create = () => {
    if (!createUserNow) setCreateUserNow(true);
  };
  const CreateNewUser = async (e) => {
    e.preventDefault();
    if (!newUserAdd) {
      setValidMessage("First choose a name");
    } else if (newUserAdd.length < 5 || newUserAdd.length >= 10) {
      setValidMessage("Name length between 5-10 character");
    } else {
      const newUserCreated = {
        name: newUserAdd,
        cash: 0,
        credit: 0,
      };
      try {
        await axios.post(
          `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser`,
          newUserCreated
        );
        setCreateUserNow(false);
        setNewUserAdd("");
      } catch (err) {
        console.log("there is an error", err);
      }
    }
  };
  const NewUser = (e) => {
    setValidMessage("");
    setNewUserAdd(e.target.value);
  };

  const BackTo = useCallback(async () => {
    await setCreateUserNow(false);
    setValidMessage("");
    setNewUserAdd("");
  }, [setCreateUserNow, setNewUserAdd, setValidMessage]);
  const actionsToDo = ["Depositing", "Update credit", "Transferring"];

  const DoAction = (e) => {
    if (e.target.innerText === "Depositing") {
      setDoAction(false);
      setAnAction(true);
      setUpdateNow("depositing");
    }
    if (e.target.innerText === "Update credit") {
      setDoAction(false);
      setUpdateNow("update");
    }
    if (e.target.innerText === "Transferring") {
      setDoAction(false);
      setAnAction(false);
      setUpdateNow("transferring");
    }
  };

  const DoTransferring = async (e) => {
    e.preventDefault();

    if (!newCashAdded || !newId || !newIdReceiver) {
      setErrDeposition("Please fill all");
    } else {
      try {
        await axios.get(
          `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`
        );
        try {
          await axios.get(
            `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newIdReceiver}`
          );
          try {
            await axios.put(
              `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`,
              { credit: Number(`${newCashAdded}`) }
            );
            setUpdateNow("");
            setNewCashAdded("");
            setNewId("");
            setNewIdReceiver("");
          } catch (err) {
            console.log("Something wrong with fetch", err);
          }
        } catch (err) {
          console.log("the receiver is not found", err);
          setErrDeposition("There is no user");
        }
      } catch (err) {
        console.log("the giver is not found", err);
        setErrDeposition("There is no user");
      }
    }
  };
  const DoUpdate = async (e) => {
    e.preventDefault();

    if (!newCashAdded || !newId) {
      setErrDeposition("Please fill all");
    } else {
      try {
        await axios.get(
          `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`
        );

        try {
          await axios.put(
            `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`,
            { credit: Number(`${newCashAdded}`) }
          );
          setUpdateNow("");
          setNewCashAdded("");
          setNewId("");
        } catch (err) {
          console.log("Something wrong with fetch", err);
        }
      } catch (err) {
        console.log("There is no user exist", err);
        setErrDeposition("There is no user");
      }
    }
  };
  const DoDeposition = async (e) => {
    e.preventDefault();
    if (!newCashAdded || !newId) {
      setErrDeposition("Please fill all");
    } else if (newCashAdded < 1 || newCashAdded > 2000) {
      setErrDeposition("Depositing must be with positive numbers till 2000");
    }
    //ToDo- add a check to verify if the id is valid
    else {
      try {
        await axios.get(
          `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`
        );
        try {
          await axios.put(
            `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`,
            { cash: Number(`${newCashAdded}`) }
          );
          setAnAction(false);
          setNewCashAdded("");
          setNewId("");
        } catch (err) {
          console.log("Something wrong with fetch", err);
        }
      } catch (err) {
        console.log("There is no user exist", err);
        setErrDeposition("There is no user");
      }
    }
  };
  const AddCash = (e) => {
    setNewCashAdded(e.target.value);
    setErrDeposition("");
  };
  const AddIdReceiver = (e) => {
    setErrDeposition("");
    setNewIdReceiver(e.target.value);
  };
  const AddId = (e) => {
    setErrDeposition("");
    setNewId(e.target.value);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allAccounts = await axios.get(
          `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser`
        );

        setNameData(allAccounts.data.data);
      } catch (err) {
        console.log("not found", err);
      }
    };
    fetchUsers();
  }, [newUserAdd, createUserNow, BackTo, anAction, updateNow]);
  const contents = [
    [
      <InnerBox>
        Choose action:
        {actionsToDo.map((act, i) => {
          return (
            <ShowActions
              key={Math.random()}
              action={act}
              onClickAction={DoAction}
            />
          );
        })}
      </InnerBox>,
      Actions,
    ],
    [
      !createUserNow ? (
        "Create account"
      ) : (
        <CreateMenu
          onSubmit={CreateNewUser}
          onChange={NewUser}
          BackTo={BackTo}
        />
      ),
      Create,
    ],
    [
      updateNow === "" ? (
        "the act"
      ) : updateNow === "update" ? (
        <DepositingPage
          DoDeposition={DoUpdate}
          AddCash={AddCash}
          AddId={AddId}
        />
      ) : updateNow === "depositing" ? (
        <DepositingPage
          DoDeposition={DoDeposition}
          AddCash={AddCash}
          AddId={AddId}
        />
      ) : (
        <Transferring
          DoTransferring={DoTransferring}
          AddCash={AddCash}
          AddId={AddId}
          AddIdReceiver={AddIdReceiver}
        />
      ),
      () => {},
    ],
  ];
  return (
    <div className="App">
      <div className="BoxContainer">
        {contents.map((todo, i) => (
          <Box n={i} key={Math.random()} actToDo={todo[1]} content={todo[0]} />
        ))}
      </div>
      <div className="accountsMenu">
        {/* {nameData && nameData} */}
        {nameData.map((names) => {
          return (
            <ShowAccount
              key={Math.random()}
              nameAccount={names.name}
              cashAccount={names.cash}
              creditAccount={names.credit}
              idAccount={names._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
