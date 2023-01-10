import React from "react";
import styles from "../../styles/bucket.module.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import {
  AiOutlinePlusCircle,
  AiFillPlayCircle,
  AiTwotoneDelete,
} from "react-icons/ai";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";

const BucketCard = ({
  setOpenNewCardModel,
  setOpenBucketCard,
  setIsCardModelOpen,
  currentBugetData,
  togglePrevieCard,
  setCurrentEditData,
}: {
  setOpenNewCardModel: React.Dispatch<
    React.SetStateAction<{
      type: "edit" | "new";
      isOpen: boolean;
    }>
  >;
  setOpenBucketCard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCardModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  togglePrevieCard: (
    label: string,
    url: string,
    cardId: string,
    bucketId: string
  ) => void;
  currentBugetData: any;
  setCurrentEditData: any;
}): JSX.Element => {
  // console.log(currentBugetData);

  const onEditHandler = (d: any) => {
    setOpenNewCardModel((prv) => ({
      type: "edit",
      isOpen: !prv.isOpen,
    }))
    setCurrentEditData(d);
  };

  return (
    <div className={"wrapper " + styles.bucket}>
      <div className={styles.backBtn}>
        <IoArrowBackCircleSharp
          onClick={() => setOpenBucketCard((prv) => !prv)}
          fontSize={32}
          style={{ marginRight: "0.6rem" }}
        />
        <h1>{currentBugetData.name}</h1>
      </div>

      <div className={styles.bucketHolder}>
        <div
          className={`${styles.card} ${styles.addbucket}`}
          onClick={() =>
            setOpenNewCardModel((prv) => ({
              type: "new",
              isOpen: !prv.isOpen,
            }))
          }
        >
          <h1>
            <AiOutlinePlusCircle size={32} color="grey" />
          </h1>
        </div>

        {currentBugetData.card.map((d: any) => (
          <div
            style={{ background: "#fff", borderColor: "#fff" }}
            key={d._id}
            className={styles.card}
          >
            <div
              className={styles.nameHolder}
              onClick={() =>
                togglePrevieCard(d.name, d.url, d._id, currentBugetData._id)
              }
            >
              <h1 style={{ color: "#000" }}>{d.name}</h1>
              <AiFillPlayCircle color="red" size={28} />
            </div>

            <div className={styles.footer}>
              <MdModeEditOutline
                onClick={() => onEditHandler(d)}
                color="blue"
                size={32}
                style={{ marginRight: "2%" }}
              />
              <AiTwotoneDelete color="red" size={32} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.btnHolder}>
        <BsFillArrowLeftCircleFill
          size={26}
          style={{ marginRight: "0.5rem" }}
        />
        <BsFillArrowRightCircleFill size={26} />
      </div>
    </div>
  );
};

export default BucketCard;
