import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  console.log("middlware");
  return NextResponse.next();
}
