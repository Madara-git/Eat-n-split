import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onSubmitBill }) {
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

  function handleBill(e) {
    if (!isFinite(e.target.value)) return;
    setTotalBill(Number(e.target.value));
  }

  function handleExpense(e) {
    if (!isFinite(e.target.value)) return;
    setExpense(
      Number(e.target.value) > totalBill ? expense : Number(e.target.value)
    );
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label> 💰Bill value</label>
      <input value={totalBill || ""} onChange={handleBill} type="text" />
      <label>🕴️ Your expense</label>
      <input value={expense || ""} onChange={handleExpense} type="text" />
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
