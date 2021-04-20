import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {Link} from 'react-router-dom'
import {AddComment} from './'


export const CommentList = props => {
  const {comments} = props




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


export default CommentList
