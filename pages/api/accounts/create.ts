import type { NextApiRequest, NextApiResponse } from "next";
import { exec, spawn } from "node:child_process";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = req.body.accountName;
  console.log(username);

  // exec(`useradd -m -d /opt/${username} ${username}`, (err, output) => {
  //   if (err) {
  //     console.error("could not execute command: ", err);
  //     return;
  //   }
  //   console.log("Output: \n", output);
  // });

  const command = spawn("useradd", ["-m", "-d", `/opt/${username}`, `${username}`]);
  command.stdout.on("data", (output) => {
    console.log("Output: ", output.toString());
  });

  res.status(200).json({ name: "John Doe" });
}
