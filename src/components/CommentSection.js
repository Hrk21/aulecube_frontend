import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get('http://localhost:5000/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  const handleCommentSubmit = (content, parentId,level = 0) => {
    console.log(parentId,content,level);
    axios.post('http://localhost:5000/comments', { content, parentId ,level})
      .then(response => {
        fetchComments();
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  const handleDeleteComment = (commentId) => {
    console.log("deleting things")
    axios.delete(`http://localhost:5000/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment._id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  const handleReply = (content, parentId,level) => {
    console.log(content, parentId,level);
    handleCommentSubmit(content, parentId,level);
  };

  return (
    <div>
      <h2>Comments</h2>
      <CommentForm onSubmit={handleCommentSubmit} />
      {comments.map(comment => (
        <Comment
          key={comment._id}
          comment={comment}
          onDelete={handleDeleteComment}
          onReply={handleReply}
        />
      ))}
    </div>
  );
};

export default CommentSection;
