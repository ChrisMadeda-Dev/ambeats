import "../styles/homesec.css";
import app from "./Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  addDoc,
  setDoc,
  serverTimestamp,
  collection,
  doc,
} from "firebase/firestore";
import { useState } from "react";

const UploadSec = ({ toggleUpldSec }) => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const [uploadProgress, setUploadProgress] = useState("");

  //Firestore
  const db = getFirestore(app);
  //storage
  const storage = getStorage(app);
  const userRef = ref(storage, `users/${userId}/songs`);

  function uploadFile(file) {
    if (file && file.type === "audio/mpeg") {
      const dbSongRef = doc(db, `users/${userId}/songs/${file.name}`);
      const songRef = ref(userRef, `${file.name}`);
      const uploadTask = uploadBytesResumable(songRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0) + " % Done");

          //check upload state
          switch (snapshot.state) {
            case "paused":
              alert("Your song upload is paused");
              break;
            case "running":
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              alert("error");
              break;
            case "storage/canceled":
              alert("error");
              break;
            case "storage/unknown":
              alert("error");
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const song = {
              userId: userId,
              name: file.name,
              size: file.size,
              src: url,
              time: serverTimestamp(),
            };

            setDoc(dbSongRef, song);
            alert("Nice.. you song is uploaded");
          });
        }
      );
    } else {
      alert("Please select an mp3 file type");
    }
  }

  return (
    <div className="upload-sec flex-col">
      <section>
        <button>
          {" "}
          <label htmlFor="uploadInput">Upload Song</label>
        </button>
        <input
          id="uploadInput"
          type="file"
          placeholder="Choose Song"
          onChange={(e) => {
            uploadFile(e.target.files[0]);
          }}
        />
      </section>
      <div>
        <span>{uploadProgress}</span>
      </div>
      <span onClick={toggleUpldSec}>close</span>
    </div>
  );
};

export default UploadSec;
