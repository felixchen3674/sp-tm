import type { NextApiRequest, NextApiResponse } from "next";

import createClient from "@/lib/supabase/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabase = createClient(req, res);
  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  if (req.method === "PUT") {
    const { priority_name } = req.body;

    if (!priority_name || !priority_name.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Priority name is required" });
    }

    const { data, error } = await supabase
      .from("task_priority")
      .update({ priority_name: priority_name.trim() })
      .eq("id", id);

    if (error)
      return res.status(500).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data });
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("task_priority")
      .delete()
      .eq("id", id);

    if (error)
      return res.status(500).json({ success: false, message: error.message });

    return res.status(204).end();
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
