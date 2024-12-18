import { useEffect, useState } from "react";
import { FormSplitBill } from "./FormSplitBill";
import { Button } from "./Button";
import { FormAddFriend } from "./FormAddFriend";
import { FriendsList } from "./FriendsList";

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

export default function App() {
  const [friendList, setFriendList] = useState(function () {
    if (localStorage.getItem("list")) {
      const listOfFriends = JSON.parse(localStorage.getItem("list"));
      return listOfFriends;
    }
    return initialFriends;
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(friendList));
  }, [friendList]);

  function handleAddFriend(friend) {
    setFriendList((f) => [...f, friend]);
    setShowForm((s) => !s);
  }

  function handleNewFriend() {
    setShowForm((showForm) => !showForm);
  }

  function handleSelection(friend) {
    setSelectedFriend((select) => (select?.id !== friend.id ? friend : null));
    setShowForm(false);
  }

  function handleSplitBill(value) {
    setFriendList((f) =>
      f.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  function deleteFirend(id) {
    setFriendList((friends) => friends.filter((friend) => friend.id !== id));
    if (selectedFriend?.id === id) setSelectedFriend(null);
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friendList={friendList}
            onAddSelection={handleSelection}
            selectedFriend={selectedFriend}
            deleteFirend={deleteFirend}
          />
          {showForm && <FormAddFriend onAddFriend={handleAddFriend} />}
          <Button onClick={handleNewFriend}>
            {showForm ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSubmitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        )}
      </div>
    </>
  );
}
