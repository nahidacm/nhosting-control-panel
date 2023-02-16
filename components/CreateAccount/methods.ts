import React from "react";
import axios from "axios";

const requestAccount = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  accountName: String
) => {
  axios
    .post("/api/accounts/create", { accountName: accountName })
    .then( response => {
      console.log(response.data);
    })
    .catch( error => {
      console.log(error);
    });
};

export { requestAccount };
