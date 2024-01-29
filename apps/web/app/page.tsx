"use client";
import React, { useState } from "react";
import { getServerAuthSession } from "auth";

export default async function DefaultPage() {
  const session = await getServerAuthSession();

  const register = () => {};

  if (session) {

    return (
      <div>
        Sessioned
        <br />
        {JSON.stringify(session.user)}
      </div>
    );
  }
  return (
    <div>
      <button onClick={register}> Fetch</button>
      <br />
      Hello
    </div>
  );
}
