import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const CommentSection = ({hotelId}) => {
  const [comment, setComment] = useState('');
  const [commentUsername, setCommentUsername] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    const comentText = event.target.value;
    setComment(comentText);
  };
  const handleCommentUsername = (event)=>{
    const userName = event.target.value.trim('')
      setCommentUsername(userName);
  }

  const handleAddComment = async () => {
    const commentObj = {
      userName: commentUsername,
      text: comment,
    }
   
      try {
        const response = await fetch(`http://localhost:8800/api/review/${hotelId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentObj),
        });
  
        if (response.ok) {
          // Successfully added the comment, now fetch the updated comments
          // fetchComments();
          setComment('');
          setCommentUsername('')
        } else {
          console.error('Failed to add comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding comment:', error.message);
      }
  };

  useEffect(() => {
    // Fetch existing comments for the hotel when the component mounts
    fetchComments();
  }, [hotelId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8800/api/review/${hotelId}`);
      if (response.ok) {
        const comments = await response.json();
        console.log(comments)
        setComments(comments);
      } else {
        console.error('Failed to fetch comments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  return (
    <div>
      <TextField
        label="UserName"
        variant="outlined"
        fullWidth
        value={commentUsername}
        onChange={handleCommentUsername}
        margin="normal"
      />
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={comment}
        onChange={handleCommentChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddComment}>
        Add Comment
      </Button>

      <List>
        {comments.map((commentObj, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={commentObj.userName} />
              <ListItemText secondary={commentObj.text} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default CommentSection;
