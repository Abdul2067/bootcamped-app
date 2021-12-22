import React from 'react'
import { Link } from 'react-router-dom'
// import '../../styles/Card.css'

const ListingActions = (props) => {
  console.log(props)
  const listing=props.listing
  return (
    <div className="interactions">
      <Link 
        to={`/listings/${listing?._id}/edit`}
        state={{listing}}
      >
      <button
      >Edit</button>
      </Link>
      <button
        onClick={() => props.handleDeletePost(props.listing._id)}
      >Delete</button>
    </div>
  )
}

export default ListingActions