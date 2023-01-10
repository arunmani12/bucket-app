import React from "react";
import styles from "../../styles/bucketModule.module.css";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreateCardModel = ({
  setOpenNewCardModel,
  bucketId,
  type = "edit",
  editData,
}: {
  setOpenNewCardModel: React.Dispatch<
    React.SetStateAction<{
      type: "edit" | "new";
      isOpen: boolean;
    }>
  >;
  bucketId: string;
  type?: "edit" | "new";
  editData?: any;
}) => {
  const [link, setLink] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sourceRef = React.useRef<HTMLSourceElement>(null);

  const router = useRouter();

  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);

    videoRef.current?.pause();
    sourceRef.current?.setAttribute("src", link);
    videoRef.current?.load();
    videoRef.current?.play();
  };

  console.log(type,editData)
  //   const src = "https://youtu.be/j_MuZmJNirw";

  const addCardHandler = async () => {
    if (!link.length) return;

    const res = await fetch(`/api/addcard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: bucketId,
        link,
        title,
      }),
    });
    let response = await res.json();

    if (response.message == "success") {
      router.reload();
    } else {
      toast.error("something went to wrong");
    }
  };

  return (
    <div className={styles.modelContainer}>
      <div className={styles.model} style={{ height: "550px" }}>
        <MdCancel
          color="red"
          size={24}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
          onClick={() =>
            setOpenNewCardModel((prv) => ({ type: "new", isOpen: !prv.isOpen }))
          }
        />

        <div>
          <h1>New Video Card</h1>
          <form>
            <label htmlFor="Name">Name</label>
            <input
              id="Name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="video">Video link</label>
            <input
              id="video"
              type="text"
              value={link}
              onChange={(e) => urlChangeHandler(e)}
            />

            {link.length ? (
              <video
                ref={videoRef}
                controls
                width="100%"
                className={styles.videoCard}
              >
                <source ref={sourceRef} src={link} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            ) : (
              <div className={styles.prvVideo}>
                <p>Preview</p>
              </div>
            )}
          </form>
          <button onClick={addCardHandler}>Create</button>
        </div>

        {/* <BucketForm heading="New Video Card" label="Name" btnTxt="Create" /> */}
      </div>
    </div>
  );
};

export default CreateCardModel;
