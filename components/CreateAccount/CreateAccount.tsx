import { useState } from "react";
import { requestAccount } from "./methods";

export default function CreateAccount() {
  const [accountName, setAccountName] = useState("");
  
  return (
    <div>
      <div className="font-semibold">Create New Account</div>
      <input type="text" placeholder="Name" value={accountName} onChange={(e)=>setAccountName(e.target.value)} className="border p-3" /> 
      <button onClick={(e)=>requestAccount(e, accountName)} className="border p-3">Create</button>
    </div>
  );
}
