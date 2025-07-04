import React from 'react'
import { Link } from 'react-router-dom'

export default function UsersManagement() {
  return (
    <div>
    <h3>UsersManagement</h3>
    <Link to="allusers">All Users</Link>
    <Link to="deleteusers">Delete Users</Link>
    </div>
  )
}
