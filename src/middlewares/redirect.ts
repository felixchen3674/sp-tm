import { avoidStaticFiles } from "./helper/helper";
import { MiddlewareFactory } from "./helper/stackHandler";

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { paths } from "@/lib/utils/paths";

export const redirectMiddleware: MiddlewareFactory =
  next => async (req: NextRequest, _next: NextFetchEvent) => {
    avoidStaticFiles(req);
    const pathname = req.nextUrl.pathname;
    if (pathname === "/") {
      return NextResponse.redirect(new URL(paths.dashboard, req.nextUrl));
    }

    return next(req, _next);
  };
