import { useState, useEffect } from 'react'
import { User } from '../Interface/users'
import { Reminder } from '../Interface/reminders'
import { Profile } from '../Interface/profiles'
import { Booking } from '../Interface/bookings'
import supabase from './supabase'
import { Event } from '../Interface/events'

function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data: users, error: userError } = await supabase.from('users').select()
      const { data: reminders, error: reminderError } = await supabase.from('reminders').select()
      const { data: profiles, error: profileError } = await supabase.from('profiles').select()
      const { data: bookings, error: bookingError } = await supabase.from('bookings').select()
      const { data: events, error: eventError } = await supabase.from('events').select()

      if (userError) console.error('Error fetching users:', userError)
      if (reminderError) console.error('Error fetching reminders:', reminderError)
      if (profileError) console.error('Error fetching profiles:', profileError)
      if (bookingError) console.error('Error fetching bookings:', bookingError)
      if (eventError) console.error('Error fetching events:', eventError)

      if (users) setUsers(users)
      if (reminders) setReminders(reminders)
      if (profiles) setProfiles(profiles)
      if (bookings) setBookings(bookings)
      if (events) setEvents(events)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            Send Time: {reminder.send_time} - Status: {reminder.status || 'Unknown'}
          </li>
        ))}
      </ul>

      <h2>Profiles</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            Full Name: {profile.full_name || 'N/A'} - Updated At: {profile.updated_at || 'N/A'}
          </li>
        ))}
      </ul>

      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Booking Time: {booking.booking_time || 'N/A'} - Status: {booking.status}
            {booking.deleted_at ? ` (Deleted at: ${booking.deleted_at})` : ''}
          </li>
        ))}
      </ul>

      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - Location: {event.location || 'N/A'} <br />
            Start: {event.start_time} - End: {event.end_time} <br />
            {event.is_recurring ? `Recurring (${event.recurrence_rule || 'N/A'})` : 'Not Recurring'} <br />
            {event.deleted_at ? `Deleted at: ${event.deleted_at}` : ''}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Page
