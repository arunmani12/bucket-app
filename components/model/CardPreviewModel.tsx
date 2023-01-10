import React from "react";
import styles from "../../styles/bucketModule.module.css";
import { MdCancel } from "react-icons/md";

const CardPreviewModel = ({
  setIsCardModelOpen,
  currentPrvData
}: {
  setIsCardModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPrvData: {
    label: string;
    url: string;
  } | undefined
}) => {
  

  return (
    <div className={styles.modelContainer}>
      <div
        className={styles.model}
        style={{
          width: "800px",
          height: "auto",
          background: "transparent",
          border: "none",
          padding: "none",
        }}
      >
        <div style={{ background: "#fff" }}>
          <MdCancel
            color="red"
            size={24}
            style={{
              position: "absolute",
              top: "22px",
              right: "22px",
            }}
            onClick={() => setIsCardModelOpen((prv) => !prv)}
          />

          <h1 style={{ fontSize: "1.2rem", padding: "1rem" }}>
            {currentPrvData?.label}
          </h1>

          <video controls width="100%">
            <source src={currentPrvData?.url} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      </div>
    </div>
  );
};

export default CardPreviewModel;
