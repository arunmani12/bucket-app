import React from "react";
import styles from "../styles/Home.module.css";
import NavBar from "../components/navbar/NavBar";
import Bucket from "../components/budget/Bucket";
import BucketMode from "../components/model/BucketMode";
import BucketCard from "../components/bucketcard/BucketCard";
import CreateCardModel from "../components/model/CreateCardmodel";
import CardPreviewModel from "../components/model/CardPreviewModel";
import HistoryModel from "./model/HistoryModal";
import MoveToModel from "./model/MoveToModel";
import Loading from "../components/Loading";

const DashBoard = ({ user }: { user: any }) => {
  const [openNewBucket, setOpenNewBucket] = React.useState<{
    type: "edit" | "new";
    isOpen: boolean;
  }>({
    type: "edit",
    isOpen: false,
  });

  const [isHistoryModelOpen, setIsHistoryModelOpen] =
    React.useState<boolean>(false);

  const [openNewCardModel, setOpenNewCardModel] = React.useState<{
    type: "edit" | "new";
    isOpen: boolean;
  }>({
    type: "new",
    isOpen: false,
  });

  const [openBucketCard, setOpenBucketCard] = React.useState<boolean>(false);

  const [isCardModelOpen, setIsCardModelOpen] = React.useState<boolean>(false);

  const [currentBugetData, setCurrentBugetData] =
    React.useState<any>(undefined);

  const [currentPrvData, setCurrentPrvData] = React.useState<
    { label: string; url: string } | undefined
  >(undefined);

  const [currentEditData, setCurrentEditData] = React.useState<any>(undefined);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [isMoveToModelOpen, setIsMoveToModelOpen] = React.useState({
    isOpen: false,
    currentCard: "",
    currentBucket: "",
  });

  const bugetClickHandler = (id: string) => {
    const buget = user.bucket.find((d: any) => d._id === id);

    setCurrentBugetData(buget);

    setOpenBucketCard((prv) => !prv);
  };

  const togglePrevieCard = async (
    label: string,
    url: string,
    cardId: string,
    bucketId: string
  ) => {
    const res = await fetch(`/api/addhistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId,
        bucketId,
      }),
    });
    let response = await res.json();

    if (response.message == "success") {
    } else {
      alert("error");
    }

    setCurrentPrvData({
      label,
      url,
    });
    setIsCardModelOpen((prv) => !prv);
  };

  const togglePrevieCardWithoutHistory = (label: string, url: string) => {
    setCurrentPrvData({
      label,
      url,
    });
    setIsCardModelOpen((prv) => !prv);
  };

  return (
    <main className={styles.main}>
      {loading && <Loading />}

      {isMoveToModelOpen.isOpen && (
        <MoveToModel
          setCurrentBugetData={setCurrentBugetData}
          isMoveToModelOpen={isMoveToModelOpen}
          setIsMoveToModelOpen={setIsMoveToModelOpen}
          setLoading={setLoading}
        />
      )}

      {openNewBucket.isOpen && (
        <BucketMode
          setOpenNewBucket={setOpenNewBucket}
          type={openNewBucket.type}
          setLoading={setLoading}
        />
      )}

      {isHistoryModelOpen && (
        <HistoryModel
          setIsHistoryModelOpen={setIsHistoryModelOpen}
          togglePrevieCardWithoutHistory={togglePrevieCardWithoutHistory}
        />
      )}

      <NavBar
        name={user.username}
        setIsHistoryModelOpen={setIsHistoryModelOpen}
      />

      {isCardModelOpen && (
        <CardPreviewModel
          currentPrvData={currentPrvData}
          setIsCardModelOpen={setIsCardModelOpen}
        />
      )}

      {openNewCardModel.isOpen && (
        <CreateCardModel
          editData={currentEditData}
          bucketId={currentBugetData?._id}
          currentBugetData={currentBugetData}
          type={openNewCardModel.type}
          setOpenNewCardModel={setOpenNewCardModel}
          setCurrentBugetData={setCurrentBugetData}
          setLoading={setLoading}
        />
      )}

      {!openBucketCard && (
        <Bucket
          setOpenBucketCard={setOpenBucketCard}
          setOpenNewBucket={setOpenNewBucket}
          buckets={user.bucket}
          bugetClickHandler={bugetClickHandler}
        />
      )}

      {openBucketCard && (
        <BucketCard
          setIsCardModelOpen={setIsCardModelOpen}
          setOpenBucketCard={setOpenBucketCard}
          setOpenNewCardModel={setOpenNewCardModel}
          currentBugetData={currentBugetData}
          togglePrevieCard={togglePrevieCard}
          setCurrentEditData={setCurrentEditData}
          setCurrentBugetData={setCurrentBugetData}
          setIsMoveToModelOpen={setIsMoveToModelOpen}
          setLoading={setLoading}
        />
      )}
    </main>
  );
};

export default DashBoard;
