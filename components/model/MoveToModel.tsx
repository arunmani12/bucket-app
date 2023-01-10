import React, { useEffect } from "react";
import styles from "../../styles/bucketModule.module.css";
import { MdCancel } from "react-icons/md";
import router from "next/router";

const MoveToModel = ({
  setIsMoveToModelOpen,
  isMoveToModelOpen,
  setCurrentBugetData,
  setLoading
}: {
  setIsMoveToModelOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currentCard: string;
      currentBucket: string;
    }>
  >;
  isMoveToModelOpen: {
    isOpen: boolean;
    currentCard: string;
    currentBucket: string;
  };
  setCurrentBugetData: React.Dispatch<any>;
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [dropDownContent, setDropDownContent] = React.useState<any>([]);

  const [bucketName, setBucketName] = React.useState("");

  React.useEffect(() => {
    (async function fetchApi() {
      const res = await fetch(`/api/getdropdown`);

      let response = await res.json();

      if (response.message === "success") {
        let categoryWithoutBacket = response.category.filter(
          (d: any) => d.id !== isMoveToModelOpen.currentBucket
        );

        setDropDownContent(categoryWithoutBacket);
      }
    })();
  }, []);

  const moveToHandler = async () => {
    setLoading(true)
    const res = await fetch(`/api/movebucket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId: isMoveToModelOpen.currentCard,
        oldBucket: isMoveToModelOpen.currentBucket,
        newBucket: bucketName,
      }),
    });
    let response = await res.json();

    if (response.message == "success") {
      router.replace(router.asPath);

      var currentBucket = response.user.bucket.find(
        (d: any) => d._id === isMoveToModelOpen.currentBucket
      );

      setCurrentBugetData(currentBucket);

      setIsMoveToModelOpen((prv) => ({
        isOpen: !prv.isOpen,
        currentBucket: "",
        currentCard: "",
      }));

      setLoading(false)
      
    } else {
      setLoading(false)
      alert("error");
      // toast.error("something went to wrong");
    }
  };

  return (
    <div className={styles.modelContainer}>
      <div
        className={styles.model}
        style={{
          width: "400px",
          //   height: "20rem",
          background: "transparent",
          border: "none",
          padding: "none",
        }}
      >
        <div
          style={{
            background: "#fff",
            // height: "100%",
            padding: "1rem",
          }}
        >
          <MdCancel
            color="red"
            size={24}
            style={{
              position: "absolute",
              top: "22px",
              right: "22px",
            }}
            onClick={() =>
              setIsMoveToModelOpen((prv) => ({
                isOpen: !prv.isOpen,
                currentBucket: "",
                currentCard: "",
              }))
            }
          />
          <h1>Move To</h1>

          <form>
            <label htmlFor="bucket">Buckets</label>
            <select id="bucket" onChange={(e) => setBucketName(e.target.value)}>
              <option value="">--Please choose an bucket--</option>
              {dropDownContent.map((d: any) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </form>

          <button onClick={moveToHandler}>Move</button>
        </div>
      </div>
    </div>
  );
};

export default MoveToModel;
