import React from "react";
import PollForm from "./PollForm";
import PollList from "./PollList";

function Home({ options, addOption, handleVote, hasVoted, resetVotes }) {    


return (


    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        
        
        <h1 className="text-10xl font-bold text-center text-blue-600 mb-6">
          Poll App
        </h1>

        <PollForm addOption={addOption} />

        <PollList
          options={options}
          handleVote={handleVote}
          hasVoted={hasVoted}
        />

        <button
          onClick={resetVotes}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Reset Votes
        </button>
      </div>
    </div>
  );
};

export default Home;