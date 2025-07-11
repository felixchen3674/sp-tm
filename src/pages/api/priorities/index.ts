import type { NextApiRequest, NextApiResponse } from "next";

import createClient from "@/lib/supabase/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(req, res); //

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("task_priority")
      .select("*")
      .order("id", { ascending: true });

    if (error)
      return res.status(500).json({ success: false, message: error.message });
    return res.status(200).json({ success: true, data });
  }

  if (req.method === "POST") {
    const { priority_name } = req.body;

    if (!priority_name?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Priority name is required" });
    }

    const { data: existing } = await supabase
      .from("task_priority")
      .select("id")
      .eq("priority_name", priority_name.trim())
      .maybeSingle();

    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Priority already exists" });

    const { data, error } = await supabase
      .from("task_priority")
      .insert({ priority_name: priority_name.trim() });

    if (error)
      return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({ success: true, data });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
