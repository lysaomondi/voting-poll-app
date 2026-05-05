import React, { useState, useEffect, use } from "react";
import PollForm from "./components/PollForm";
import PollList from "./components/PollList";
import Navbar from "./components/Navbar";
import "./index.css";
import Loading from "./components/Loading";

import { db } from "./firebase";
import {
  increment,
  onSnapshot,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";



function App() {
  useEffect(() => {
  const seedData = async () => {
    const snapshot = await getDocs(collection(db, "options"));

    if (!snapshot.empty) return;

    const defaultOptions = [
      { id: "react", text: "React", votes: 0 },
      { id: "vue", text: "Vue", votes: 0 },
      { id: "angular", text: "Angular", votes: 0 }
    ];

    await Promise.all(
      defaultOptions.map((opt) =>
        setDoc(doc(db, "options", opt.id), {
          text: opt.text,
          votes: 0
        })
      )
    );
  };

  seedData();
}, []);
 

const [options, setOptions] = useState([]);
const [loading, setLoading] = useState(true);
const [voterId] = useState(() => {
  return localStorage.getItem("voterId") || crypto.randomUUID();
});
useEffect(() => {
  localStorage.setItem("voterId", voterId);
}, []);

  useEffect(()=> {
    const unsub = onSnapshot(collection(db, "options"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
      setOptions(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  
  const addOption = async (text) => {
  const id = text.toLowerCase().replace(/\s+/g, "-");
  const optionRef = doc(db, "options", id);

  const existing = await getDoc(optionRef);

  if (existing.exists()) {
    alert("Option already exists!");
    return;
  }

  await setDoc(optionRef, {
    text,
    votes: 0,
  });
};
const handleVote = async (id) => {
  try {
    console.log("Voting for:", id);

    const voteId = `${voterId}_${id}`;
    const voteRef = doc(db, "votes", voteId);

    const voteSnap = await getDoc(voteRef);

    if (voteSnap.exists()) {
      alert("You already voted for this option");
      return;
    }

    const optionRef = doc(db, "options", id);

    await updateDoc(optionRef, {
      votes: increment(1),
    });

    await setDoc(voteRef, {
      optionId: id,
      voterId,
    });

    console.log("Vote successful");
  } catch (error) {
    console.error("VOTE ERROR:", error);
  }
};
 
  
 

  const resetVotes =async () => {
    await Promise.all(options.map((opt) =>{
      const optionRef = doc(db, "options", opt.id);
      return updateDoc(optionRef, { votes: 0 });
    }));
     };
 
if (loading)
  { return <Loading />;}
  return (
    <>
    <Navbar />
     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        
        
        <h1 className="text-10xl font-bold text-center text-blue-600 mb-6">
          Poll App
        </h1>

        <PollForm addOption={addOption} />

        <PollList
          options={options}
          handleVote={handleVote}
        />

        <button
          onClick={resetVotes}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Reset Votes
        </button>
      </div>
    </div>
  

   </>);
}
export default App;
