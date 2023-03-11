import type { NextApiRequest, NextApiResponse } from "next";
import { exec, spawn } from "node:child_process";

type Data = {
  message: string;
  data: any
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = req.body.accountName;
  console.log(username);

  exec(`useradd -m -d /opt/${username} ${username}`, (err, output) => {
    if (err) {
      console.error("could not execute command: ", err);
      res.status(406).json({ message: "Couldn't Create User", data: err });
      return;
    }
    res.status(200).json({ message: "User Created", data: output });
  });

  // const command = spawn("useradd", ["-m", "-d", `/opt/${username}`, `${username}`]);
  // command.stdout.on("data", (output) => {
  //   console.log("Output: ", output.toString());
  // });
  
}
