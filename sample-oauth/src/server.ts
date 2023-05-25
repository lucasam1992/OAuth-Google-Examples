import dotenv from 'dotenv';

dotenv.config();

import app from "./app";

async function main() {
  await app.listen(app.get("port"));
  console.log("Listening from port:", app.get("port"));
}

main();