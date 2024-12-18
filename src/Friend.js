import { Button } from "./Button";

export function Friend({
  friend,
  onAddSelection,
  selectedFriend,
  deleteFirend,
}) {
  const isSelected = friend.id === selectedFriend?.id;
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
