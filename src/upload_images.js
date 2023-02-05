import { useState } from "react";
import { app } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import InputControl from "./components/InputControl/InputControl";
import * as firebaseDB from "firebase/database";
import { child, get, set, update } from "firebase/database";

function writeNameCount(personName, train) {
  const db = firebaseDB.getDatabase(app);
  const dbref = firebaseDB.ref(db);
  const address = "facialRecoginition/";

  get(child(dbref, address)).then((snapshot) => {
    if (snapshot.exists()) {
      update(firebaseDB.ref(db, address), {
        person: personName,
        trainFlag: train,
      });
    } else {
      set(firebaseDB.ref(db, address), {
        person: personName,
        trainFlag: train,
      });
    }
  });
}

function ReactFirebaseFileUpload() {
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [train, setTrain] = useState(false);
  const [values, setValues] = useState({
    personName: "",
  });

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    console.log(values);
    console.log(train);
    writeNameCount(values.personName, train);
  };

  const uploadFiles = (file) => {
    //

    if (!file) return;
    console.log(train);
    const storageRef = ref(
      storage,
      `${values.personName}/${values.personName}${count}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );

    setTrain(function (prev) {
      return count === 2 ? true : false;
    });

    setCount(function (prev) {
      console.log(prev);
      if (prev === 3) return 0;
      return prev + 1;
    });
  };

  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <br />
        <br />
        <InputControl
          label="Name of the Person"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, personName: event.target.value }))
          }
          placeholder="Enter the Name of the Person (e.g. John)"
        />
        <br />
        <button type="submit">Upload</button>
      </form>
      <br />
      <h6>Upload Status {progress}%</h6>
    </div>
  );
}

export { ReactFirebaseFileUpload };
