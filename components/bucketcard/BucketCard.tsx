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
import { useRouter } from "next/router";
import { HiFolderRemove } from "react-icons/hi";

interface BucketCard {
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
  setIsMoveToModelOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currentCard: string;
      currentBucket: string;
    }>
  >;
  setCurrentBugetData: React.Dispatch<any>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const BucketCard = ({
  setOpenNewCardModel,
  setOpenBucketCard,
  setIsCardModelOpen,
  currentBugetData,
  togglePrevieCard,
  setCurrentEditData,
  setIsMoveToModelOpen,
  setCurrentBugetData,
  setLoading
}: BucketCard): JSX.Element => {
  const router = useRouter();

  const onEditHandler = (d: any) => {
    setOpenNewCardModel((prv) => ({
      type: "edit",
      isOpen: !prv.isOpen,
    }));
    setCurrentEditData(d);
  };


  const onDeleteHandler = async (id: string) => {

    setLoading(true)

    var bucketCopy = {...currentBugetData}

    var newCards = bucketCopy.card.filter((d:any)=>d._id !==id)

    bucketCopy.card = newCards

    setCurrentBugetData(bucketCopy)

    const res = await fetch(`/api/deletecard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    let response = await res.json();

    if (response.message == "success") {
  
      router.replace(router.asPath);

      setLoading(false)

    } else {
      alert("something went to wrong");

      setLoading(false)

    }
  };

  const moveHandler = (currentCard: string, currentBucket: string) => {
    setIsMoveToModelOpen((prv) => ({
      isOpen: !prv.isOpen,
      currentCard,
      currentBucket,
    }));
  };

  return (
    <div className={"wrapper " + styles.bucket}>
      <div className={styles.backBtn} >
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
          style={{
            justifyContent:'center'
          }}
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
              <AiTwotoneDelete
                onClick={() => onDeleteHandler(d._id)}
                color="red"
                size={32}
              />
              <HiFolderRemove
                color="red"
                size={32}
                onClick={() => moveHandler(d._id, currentBugetData._id)}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BucketCard;
