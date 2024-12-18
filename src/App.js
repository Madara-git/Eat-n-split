import { fireEvent } from "@testing-library/react";
import { useEffect, useState } from "react";

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

  console.log(2);
  function handleAddFriend(friend) {
    setFriendList((f) => [...f, friend]);
    setShowForm((s) => !s);
  }

  function handleNewFriend() {
    setShowForm((s) => !s);
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

function FriendsList({
  friendList,
  onAddSelection,
  selectedFriend,
  deleteFirend,
}) {
  console.log(friendList);

  return (
    <>
      {friendList.length ? (
        <ul>
          {friendList.map((friend) => (
            <Friend
              friend={friend}
              key={friend.id}
              selectedFriend={selectedFriend}
              onAddSelection={onAddSelection}
              deleteFirend={deleteFirend}
            />
          ))}
        </ul>
      ) : (
        <p className="add-Firend-message">Add friends to split bill with</p>
      )}
    </>
  );
}

function Friend({ friend, onAddSelection, selectedFriend, deleteFirend }) {
  const isSelected = friend.id === selectedFriend?.id;
  console.log(friend);
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <div>
        <Button onClick={() => onAddSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
        <Button
          className="delete-from-list"
          onClick={() => deleteFirend(friend.id)}
        >
          x
        </Button>
      </div>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [isEmptyText, setisEmptyText] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) {
      setisEmptyText(true);
      return;
    }
    setisEmptyText(!isEmptyText);
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <div>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />
        {isEmptyText && <span>Please Enter Friend Name</span>}
      </div>

      <label>Image URL</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend, onSubmitBill }) {
  const [totalBill, setTotalBill] = useState("");
  const [expense, setExpense] = useState("");
  const [whoPays, setWhoPays] = useState("User");
  const friendSum = totalBill ? totalBill - expense : "";
  const [EmptyForm, setEmptyForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!totalBill || !expense) {
      setEmptyForm(true);
      return;
    }
    setEmptyForm(!EmptyForm);
    onSubmitBill(whoPays === "User" ? friendSum : -expense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label> 💰Bill value</label>
      <input
        value={totalBill || ""}
        onChange={(e) => {
          if (!isFinite(e.target.value)) return;
          setTotalBill(Number(e.target.value));
        }}
        type="text"
      />

      <label>🕴️ Your expense</label>
      <input
        value={expense || ""}
        onChange={(e) => {
          if (!isFinite(e.target.value)) return;
          setExpense(
            Number(e.target.value) > totalBill
              ? expense
              : Number(e.target.value)
          );
        }}
        type="text"
      />

      <label>👯 {selectedFriend.name}'s expense</label>
      <input disabled type="text" value={friendSum} />

      <label>🤑 Who will pay the bill</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="User">You</option>
        <option value="Friend">{selectedFriend.name}</option>
      </select>
      {EmptyForm && (
        <p className="input-value-empty">fill out Bill value or Your expense</p>
      )}
      <Button>Split Bill</Button>
    </form>
  );
}
