// // change 1
// import React, { useState } from 'react';

// const Comment = ({ comment, onDelete, onReply }) => {
//   const [replyContent, setReplyContent] = useState('');
//   const [showReplyForm, setShowReplyForm] = useState(false);

//   const handleReplyClick = () => {
//     setShowReplyForm(true);
//   };
// console.log(comment);
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onReply(replyContent, comment._id,comment.level+1);
//     // console.log(comment);
//     // Clear reply content and hide form after submitting
//     setReplyContent('');
//     setShowReplyForm(false);
//   };

//   return (
//     <div>
//       <p>{comment.content}</p>
//       <button onClick={() => onDelete(comment._id)}>Delete</button>
//       <button onClick={handleReplyClick}>Reply</button>
//       {showReplyForm && (
//         <form onSubmit={handleFormSubmit}>
//           <textarea
//             value={replyContent}
//             onChange={(e) => setReplyContent(e.target.value)}
//             placeholder="Enter your reply..."
//           ></textarea>
//           <button type="submit">Submit</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Comment;

import React, { useState } from 'react';

const Comment = ({ comment, onDelete, onReply }) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onReply(replyContent, comment._id, comment.level + 1);
    setReplyContent('');
    setShowReplyForm(false);
  };

  const indentStyle = {
    marginLeft: comment.level * 20,
    borderLeft: '1px solid gray',
    padding: '5px 10px',
  };

  return (
    <div style={indentStyle}>
      <p>{comment.content}</p>
      <button onClick={() => onDelete(comment._id)}>Delete</button>
      <button onClick={handleReplyClick}>Reply</button>
      {showReplyForm && (
        <form onSubmit={handleFormSubmit}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Enter your reply..."
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
      {/* Recursively render nested comments */}
      {comment.replies && comment.replies.map(reply => (
        <div key={reply._id} style={{ ...indentStyle, borderLeft: 'none' }}>
          <Comment comment={reply} onDelete={onDelete} onReply={onReply} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
