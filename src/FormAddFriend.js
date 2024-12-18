import { useState } from "react";
import { Button } from "./Button";

export function FormAddFriend({ onAddFriend }) {
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
