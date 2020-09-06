import { exec } from "child_process";

export const getHeadCommit = () => {

  return new Promise((resolve, reject) => {

    const command = "git rev-parse --verify HEAD --short";

    exec(command, (err, stdout) => {

      if (err)
      {
        return reject(err);
      }
      resolve(stdout.replace(/\n/g, ""));
    });
  });
};

export default {
  getHeadCommit
};
