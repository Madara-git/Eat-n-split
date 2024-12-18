import { Friend } from "./Friend";

export function FriendsList({
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
