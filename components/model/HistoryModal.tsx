import React from "react";
import styles from "../../styles/bucketModule.module.css";
import { MdCancel } from "react-icons/md";

const HistoryModel = ({
  setIsHistoryModelOpen,
  togglePrevieCardWithoutHistory
}: {
  setIsHistoryModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  togglePrevieCardWithoutHistory:(label: string, url: string) => void
}) => {
  const [histroy, setHistory] = React.useState([]);

  React.useEffect(() => {
    (async function fetchHistory() {
      const res = await fetch(`/api/gethistory`);
      let response = await res.json();

      setHistory(response.history);
    })();
  }, []);

  const calCulateTime = (time:Date) =>{

    var date = new Date(time)

    return date.getDay() + '-' +date.getMonth()+1 + '-' + date.getFullYear() + ' ' + date.toLocaleTimeString("en-US", { hour12: true })
  }

  return (
    <div className={styles.modelContainer}>
      <div className={styles.model} style={{ width: "800px", height: "70vh" }}>
        <MdCancel
          color="red"
          size={24}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
          onClick={() => setIsHistoryModelOpen((prv) => !prv)}
        />

        <h1>History</h1>

        <div style={{ overflowY: "scroll", height: "90%" }}>
          {histroy.map((d: any, i: any) => (
            <div className={styles.historCard} key={i} onClick={()=>togglePrevieCardWithoutHistory(d.card.name,d.card.url)}>
              <div>
                <h2>{d.card.name}</h2>

                <p>{calCulateTime(d.time)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryModel;
