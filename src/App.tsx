
import { useState, useEffect } from 'react'
import  supabase  from './utils/supabase'
import { Users } from './Interface/users'

function Page() {
  const [users, setUsers] = useState<Users[]>([])

  useEffect(() => {
    async function getusers() {
      const { data: users } = await supabase.from('users').select()

      if (users && users.length > 1) {
        setUsers(users)
      }
    }

    getusers()
  }, [])

  return (
    <div>
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </div>
    
  )
}
export default Page
