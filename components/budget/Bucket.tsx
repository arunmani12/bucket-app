import React from "react";
import styles from "../../styles/bucket.module.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Bucket = ({setOpenNewBucket,setOpenBucketCard,buckets,bugetClickHandler}:{
  setOpenNewBucket: React.Dispatch<React.SetStateAction<{
    type: "edit" | "new";
    isOpen: boolean;
}>>,
  setOpenBucketCard:React.Dispatch<React.SetStateAction<boolean>>,
  bugetClickHandler:(id:string)=>void
  buckets:any[]
}
  ): JSX.Element => {
  return (
    <div className={"wrapper " + styles.bucket}>
      <h1>Buckets</h1>

      <div className={styles.bucketHolder}>

        <div style={{justifyContent:'center'}} className={`${styles.addbucket} ${styles.card}`} onClick={()=>setOpenNewBucket(prv=>(
          {
            type:'new',
            isOpen:!prv.isOpen
          }
        ))}>
          <h1>
            <AiOutlinePlusCircle size={32} color="grey" />
          </h1>
        </div>

        {buckets.map((d) => (
          <div style={{justifyContent:'center',border:'1px solid green',background:'#f65a41'}} className={styles.card} key={d._id} onClick={()=>bugetClickHandler(d._id)}>
            <h1>{d.name}</h1>
          </div>
        ))}
      </div>

      {/* <div className={styles.btnHolder}>
        <BsFillArrowLeftCircleFill
          size={26}
          style={{ marginRight: "0.5rem" }}
        />
        <BsFillArrowRightCircleFill size={26} />
      </div> */}
    </div>
  );
};

export default Bucket;
