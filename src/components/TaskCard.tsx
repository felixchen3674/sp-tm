import styles from "./taskcard.module.css";

import React from "react";

const TaskCard = () => {
  return (
    <div className={styles.card}>
        <div className={styles.indicator}>
            ᮰
        </div>
      <div>
        <div className={styles.title}>
          {"Title: Attend Nischal's Birthday Party"}
        </div>
        <div className={styles.description}>
          {
            "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)...."
          }
        </div>
        <div className={styles.footnote}>
          <span>Priority: {" Moderate "}</span>
          <span>Status: {" Not Started "}</span>
          <span>Created on:{" 20/06/2023 "}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
