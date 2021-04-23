import React from 'react'



export const CommentList = props => {
  const {comments, expanded} = props

  if(expanded){
    return (
      <div className="commentBlock">
        {comments.map(comment => {
          return(
            <div key={comment.id}>
              <span>{comment.user.userName}: </span>
              {comment.commentText}
            </div>
          )
        })}
      </div>
    )
  }
  else{
    return (
      <div className="commentBlock">
        {comments.map((comment, index) => {
          if(index < 3){
            return(
              <div key={comment.id}>
                <span>{comment.user.userName}: </span>
                {comment.commentText}
              </div>
            )
          }
        })}
      </div>
    )
  }
}


export default CommentList
