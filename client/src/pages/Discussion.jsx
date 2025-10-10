import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DiscussionPage = () => {
  const navigate = useNavigate();
  const currentUser = "karteav"; // replace with logged-in user

  // Load comments from localStorage
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  const [comments, setComments] = useState(savedComments);

  const [movie, setMovie] = useState("");
  const [text, setText] = useState("");

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie || !text.trim()) {
      toast.error("Please fill all fields!");
      return;
    }

    const newComment = {
      id: Date.now(),
      movie,
      user: currentUser,
      text,
      date: new Date().toLocaleString(),
      replies: [],
    };

    setComments([newComment, ...comments]);
    setMovie("");
    setText("");
    toast.success("Comment added!");
  };

  // Recursive function to add reply
  const addReply = (commentsList, parentId, reply) => {
    return commentsList.map((c) => {
      if (c.id === parentId) {
        return { ...c, replies: [...c.replies, reply] };
      }
      if (c.replies.length > 0) {
        return { ...c, replies: addReply(c.replies, parentId, reply) };
      }
      return c;
    });
  };

  // Recursive Comment Component
  const Comment = ({ comment, level = 0 }) => {
    const [localReply, setLocalReply] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);

    const handleLocalReply = () => {
      if (!localReply.trim()) {
        toast.error("Reply cannot be empty!");
        return;
      }

      const newReply = {
        id: Date.now(),
        user: currentUser,
        text: localReply,
        date: new Date().toLocaleString(),
        replies: [],
      };

      const updatedComments = addReply(comments, comment.id, newReply);
      setComments(updatedComments);
      setLocalReply("");
      setShowReplyBox(false);
      toast.success("Reply added!");
    };

    return (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-gray-900/70 border border-gray-700 rounded-xl p-6 shadow-lg ${
          level > 0 ? "ml-6" : ""
        }`}
      >
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-yellow-400 text-lg">
            🎬 {comment.movie}
          </h3>
          <span className="text-gray-400 text-sm">{comment.date}</span>
        </div>
        <p className="text-gray-300 italic mb-2">“{comment.text.trim()}”</p>
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>👤 {comment.user}</span>
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="text-yellow-400 hover:underline text-sm"
          >
            Reply
          </button>
        </div>

        {showReplyBox && (
          <div className="mb-4">
            <textarea
              rows="2"
              value={localReply}
              onChange={(e) => setLocalReply(e.target.value)}
              placeholder="Write your reply..."
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2 resize-none"
            />
            <button
              onClick={handleLocalReply}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-1 rounded-lg text-sm font-semibold transition"
            >
              Submit Reply
            </button>
          </div>
        )}

        {comment.replies.map((r) => (
          <Comment key={r.id} comment={r} level={level + 1} />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-6 flex flex-col items-center">
      <Toaster position="top-right" />
      <button
        onClick={() => navigate("/home")}
        className="absolute top-5 left-5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        ← Back
      </button>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-10 text-yellow-400 text-center"
      >
        💬 Movie Discussion Forum
      </motion.h1>

      {/* Comment Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/80 p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-700 space-y-6 mb-10"
      >
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Movie Name
          </label>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Enter movie name..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Your Comment (max 150 words)
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              const words = e.target.value.split(" ").filter(Boolean);
              if (words.length <= 150) setText(e.target.value);
            }}
            placeholder="Share your thoughts about the movie..."
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <p className="text-sm text-gray-400 mt-1">
            {text.split(" ").filter(Boolean).length}/150 words
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition"
        >
          Submit Comment
        </button>
      </motion.form>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 max-w-4xl w-full space-y-6"
      >
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center">
            No comments yet. Be the first to start a discussion!
          </p>
        ) : (
          comments.map((c) => <Comment key={c.id} comment={c} />)
        )}
      </motion.div>
    </div>
  );
};

export default DiscussionPage;
