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
  setCurrentBugetData,
  currentBugetData,
  setLoading
}: {
  setOpenNewCardModel: React.Dispatch<
    React.SetStateAction<{
      type: "edit" | "new";
      isOpen: boolean;
    }>
  >;
  bucketId: string;
  setCurrentBugetData: React.Dispatch<any>
  type?: "edit" | "new";
  editData?: any;
  currentBugetData:any
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [link, setLink] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sourceRef = React.useRef<HTMLSourceElement>(null);

  const router = useRouter();

  React.useEffect(()=>{

    if(type==='edit'){
      setLink(editData.url)
      setTitle(editData.name)
    }

  },[])

  const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);

    videoRef.current?.pause();
    sourceRef.current?.setAttribute("src", link);
    videoRef.current?.load();
    videoRef.current?.play();
  };



  const addCardHandler = async () => {
    if (!link.length) return;

    setLoading(true)

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
      router.replace(router.asPath);

      let copyData = {...currentBugetData,card:[...currentBugetData.card,response.card]}


      setCurrentBugetData(copyData)
      

      setOpenNewCardModel(prv=>(
        {
          type:'new',
          isOpen:!prv.isOpen
        }
      ))

      setLoading(false)

    } else {
      setLoading(false)

      toast.error("something went to wrong");
    }
  };


  const editCardHandler = async () => {
    if (!link.length) return;

    setLoading(true)

    const res = await fetch(`/api/editcard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:editData._id,
        link,
        title,
      }),
    });
    let response = await res.json();

    if (response.message == "success") {

      router.replace(router.asPath);

      var card = currentBugetData.card.find((d:any) => d._id === editData._id)

      var index = currentBugetData.card.indexOf(card)

      var copyData = {...currentBugetData}

      copyData.card[index] = {...copyData.card[index],name:title,url:link}

      setCurrentBugetData(copyData)
      
      setOpenNewCardModel(prv=>(
        {
          type:'new',
          isOpen:!prv.isOpen
        }
      ))

      setLoading(false)
      
    } else {
      setLoading(false)

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
          <h1>{type === 'new' ? 'New Video Card' : 'Update Card' }</h1>
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
          <button onClick={type ==='new'? addCardHandler : editCardHandler}>
            {
              type === 'new' ?
              'Submit' :
              'Update'
            }
          </button>
        </div>

   
      </div>
    </div>
  );
};

export default CreateCardModel;
