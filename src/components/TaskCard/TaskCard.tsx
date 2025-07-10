import styles from "./taskcard.module.css";

import React from "react";

import { TaskType } from "@/lib/entities/tasks";
import Link from "next/link";
import CardMenu from "./CardMenu";

const TaskCard = ({ task }: { task: TaskType }) => {
  const { title, description, priority, status, created_at} = task;
  const description_length_limit = 100;
  const link = `/tasks/${task.id}`; // Change this to the actual link

  const priority_color = {
    "Low": styles.green,
    "Moderate": styles.cyan,
    "Extreme": styles.red,
  };

  const status_color = {
    "Not Started": styles.red,
    "In Progress": styles.blue,
    "Completed": styles.green,
  };

  return (
    <Link href={link} className={styles.link}>
    <div className={styles.card}>
      <div
        className={`${styles.indicator} ${status && (status in status_color ? status_color[status] : styles.cyan)}`}>
        ᮰
      </div>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>
          {description
            ? description.length > description_length_limit
              ? description.slice(0, description_length_limit) + "..."
              : description
            : "No description"}
        </div>
        <div className={styles.footnote}>
          <span className={styles.footnote_element}>{priority && (
            <span>
              Priority:{" "}
              <span
                className={
                  priority in priority_color
                    ? priority_color[priority]
                    : styles.cyan
                }>
                {priority}
              </span>
            </span>
          )}</span>
          <span className={styles.footnote_element}>{status && (
            <span>
              Status:{" "}
              <span
                className={
                  status in status_color ? status_color[status] : styles.cyan
                }>
                {status}
              </span>
            </span>
          )}</span>
          
          <span className={styles.grey}>
            Created on: {created_at.split("T")[0]}
          </span>
        </div>
      </div>
      <div className={styles.menu_block}>
        <CardMenu task={task}/>
      </div>
    </div>
    </Link>
  );
};

export default TaskCard;
