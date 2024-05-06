import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";

const CommentApi = () => {
  return (
    <div>
          <button
                                    className="flex space-x-2 text-sm p-1 pl-2 pr-3 hover:bg-blue-100 w-[10rem]"
                                    onClick={() => deleteComment(item._id)}
                                  >
                                    <DeleteIcon />
                                    <h1>Delete Comment</h1>
                                  </button>
    </div>
  )
}

export default CommentApi
