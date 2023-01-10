import React from "react";
import styles from "../../styles/bucketModule.module.css";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const BucketMode = ({
  type = "edit",
  setOpenNewBucket,
  setLoading
}: {
  type: "edit" | "new";
  setOpenNewBucket: React.Dispatch<React.SetStateAction<{
    type: "edit" | "new";
    isOpen: boolean;
  }>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {


  const BucketForm = ({
    heading,
    label,
    btnTxt,
  }: {
    heading: string;
    label: string;
    btnTxt: string;
  }) => {


  const [bucketTitle, setBucketTitle] = React.useState<string>('');

  const router = useRouter()


  const onSubmitHandler = async () => {

    if(!bucketTitle.length) return

    setLoading(true)

    const res = await fetch(`/api/addbucket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketTitle
      }),
    });
    let response = await res.json();


    if (response.message == "success") {

      router.replace(router.asPath);

      setBucketTitle("")
      
      setOpenNewBucket((prv) => ({
        type:'new',
        isOpen:!prv.isOpen
      }))

      setLoading(false)

    } else {
      setLoading(false)

      toast.error("something went to wrong");
    }
  };


    return <div>
      <h1>{heading}</h1>
      <form>
        <label htmlFor={label}>{label}</label>
        <input
          value={bucketTitle}
          onChange={(e) => setBucketTitle(e.target.value)}
          id={label}
          type="text"
        />
      </form>
      <button onClick={onSubmitHandler}>{btnTxt}</button>
    </div>
  };

  return (
    <div className={styles.modelContainer}>
      <div className={styles.model}>
        <MdCancel
          color="red"
          size={24}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
          onClick={() => setOpenNewBucket((prv) => ({
            type:'new',
            isOpen:!prv.isOpen
          }))}
        />

        {type === "new" ? (
          <BucketForm heading="New Bucket" label="Name" btnTxt="Create" />
        ) : (
          <BucketForm heading="Edit Bucket" label="Name" btnTxt="Update" />
        )}
      </div>
    </div>
  );
};

export default BucketMode;
