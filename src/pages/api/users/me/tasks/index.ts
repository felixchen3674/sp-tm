import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/lib/supabase/supabase";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const userId = 1; //hard code for now

  // Check if the request method is GET
  if (req.method === "GET") {
    const {
      data: tasks,
      error,
      status,
    } = await supabase.from("tasks").select("*").eq("user_id", userId);
    if (error) {
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
    res.status(status).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  }
}
