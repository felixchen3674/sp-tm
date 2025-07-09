import { TaskType } from "@/lib/entities/tasks";
import styles from "./taskcard.module.css";

import React from "react";

const TaskCard = ({task}: {task: TaskType}) => {
  const {title, description, priority, status, created_at, date} = task;
  const description_length_limit = 100;
  return (
    <div className={styles.card}>
        <div className={styles.indicator}>
            ᮰
        </div>
      <div>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description
            ? description.length > description_length_limit
              ? description.slice(0, description_length_limit) + "..."
              : description
            : "No description"}
        </div>
        <div className={styles.footnote}>
          <span>Priority: {priority}</span>
          <span>Status: {status}</span>
          <span>Created on: {created_at.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
