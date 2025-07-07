import { NextRequest, NextResponse } from "next/server";

export const avoidStaticFiles = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  if (
    ["/api, /_next/static", "/_next/image"].some(prefix =>
      pathname.startsWith(prefix),
    )
  ) {
    return NextResponse.next();
  }
};
