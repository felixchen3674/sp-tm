import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/lib/supabase/supabase";
import { ApiResponse } from "@/lib/utils/types";

type Data = ApiResponse<string[]>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {
    data: users,
    error,
    status,
  } = await supabase.from("tasks").select("*");
  if (error) {
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }

  res.status(status).json({
    success: true,
    data: users,
    message: "Users fetched successfully",
  });
}
