import { useState } from "react";
import Button from "./components/customButton/Button";
import FriendsList from "./components/friendsList/FriendsList";
import FormAddFriend from "./components/formAddFriend/FormAddFriend";
import FormSplitBill from "./components/formSplitBill/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((prevState) => !prevState);
  }

  function handleAddFriend(friend) {
    setFriends((prevState) => [...prevState, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((prevState) =>
      prevState?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((prevState) =>
      prevState.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div>
        <div
          className={`sidebar form-border ${
            !showAddFriend && "padding-bottom"
          }`}
        >
          <FriendsList
            friends={friends}
            selectedFriend={selectedFriend}
            onSelection={handleSelection}
          />
          {!showAddFriend && (
            <Button onClick={handleShowAddFriend}>
              {showAddFriend ? "Close" : "Add friend"}
            </Button>
          )}
        </div>

        {showAddFriend && (
          <div className="form-border">
            <FormAddFriend onAddFriend={handleAddFriend} />
            <Button onClick={handleShowAddFriend}>
              {showAddFriend ? "Close" : "Add friend"}
            </Button>
          </div>
        )}
      </div>

      {selectedFriend && (
        <div className="form-border">
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        </div>
      )}
    </div>
  );
}

export default App;
