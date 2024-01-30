import React from "react";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession();
  return (
    <div>
      Hello
      <br />
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
export default page;
