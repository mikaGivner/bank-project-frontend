import { useEffect, useState, useContext, useCallback } from "react";
import Box from "./components/menu";
import ShowAccount from "./components/showAccount";
import "./App.css";
import ShowActions from "./components/ShowActions";
import CreateMenu from "./components/createmenu";
import axios from "axios";
import { UserContext } from "./components/userContext";
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
    updateNow,
    setUpdateNow,
  } = useContext(UserContext);

  const [isCash, setIsCash] = useState(true);
  const [isOk, setIsOk] = useState(false);
  const [objToAdd, setObjToAdd] = useState("");
  const actionsToDo = ["Depositing", "Update credit", "Transferring"];
  const [nameData, setNameData] = useState([]);

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

  const DoAction = (e) => {
    setUpdateNow(`${e.target.innerText}`);
  };

  const DoTransferring = async (e) => {
    e.preventDefault();

    if (!newCashAdded || !newId) {
      setErrDeposition("Please fill all");
    } else if (updateNow === "Transferring" && !newIdReceiver) {
      setErrDeposition("Please fill all");
    } else {
      if (updateNow !== "Update credit") {
        setIsCash(true);
        if (newCashAdded < 1 || newCashAdded > 2000) {
          setErrDeposition(
            "Depositing must be with positive numbers till 2000"
          );
        } else {
          setIsOk(true);
        }
      }
      if (updateNow === "Update credit" || isOk) {
        isCash
          ? setObjToAdd({ cash: Number(`${newCashAdded}`) })
          : setObjToAdd({ credit: Number(`${newCashAdded}`) });

        try {
          await axios.get(
            `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`
          );
          if (updateNow === "Transferring") {
            try {
              await axios.get(
                `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newIdReceiver}`
              );
              try {
                await axios.put(
                  `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}/${newIdReceiver}`,
                  { credit: Number(`${newCashAdded}`) }
                );
                setUpdateNow("");
                setNewCashAdded("");
                setNewId("");
                setNewIdReceiver("");
                setIsOk(false);
              } catch (err) {
                console.log("Something wrong with fetch", err);
              }
            } catch (err) {
              console.log("the receiver is not found", err);
              setErrDeposition("There is no user");
            }
          } else {
            try {
              await axios.put(
                `https://calm-tan-sawfish-boot.cyclic.app/api/v1/newUser/${newId}`,
                objToAdd
              );

              setUpdateNow("");
              setNewCashAdded("");
              setNewId("");
            } catch (err) {
              console.log("Something wrong with fetch", err);
            }
          }
        } catch (err) {
          console.log("the giver is not found", err);
          setErrDeposition("The user is not found");
        }
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
  }, [newUserAdd, createUserNow, BackTo, updateNow]);
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
      () => {},
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
      ) : (
        <Transferring
          key={Math.random()}
          title={updateNow}
          DoTransferring={DoTransferring}
          AddCash={AddCash}
          AddId={AddId}
          AddIdReceiver={
            updateNow === "Transferring" ? AddIdReceiver : () => {}
          }
        />
      ),
      () => {},
    ],
  ];
  return (
    <div className="App">
      <div className="BoxContainer">
        {contents.map((todo, i) => (
          <Box color={i} key={i} actToDo={todo[1]} content={todo[0]} />
        ))}
      </div>
      <div className="accountsMenu">
        {nameData.map((names, index) => {
          return (
            <ShowAccount
              key={index}
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
