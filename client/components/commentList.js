import React from 'react'


export const CommentList = props => {
  const {comments, expanded} = props

  if(expanded){
    return (
      <div>
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
      <div>
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
