import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const FACULTY_API = "https://event-management-system-4-g7zh.onrender.com";
const EVENT_API   = "https://event-management-system-2-jw3c.onrender.com";
const STUDENT_API = "https://event-management-system-3-j3e8.onrender.com";

interface FacultyForm {
  facId: string
  facName: string
  email: string
  password: string
}

interface EventForm {
  stuRno: string
  stuName: string
  eventName: string
  eventLocation: string
  eventDate: string
}

interface EventData extends EventForm {
  facId: string
}

interface StudentForm {
  stuRno: string
  stuName: string
  email: string
  password: string
}

interface LoginForm {
  email: string
  password: string
}

function Faculty() {
  const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login')
  const [faculty, setFaculty] = useState<FacultyForm | null>(null)
  const [events, setEvents] = useState<EventData[]>([])
  const [msg, setMsg] = useState('')

  const [regForm, setRegForm] = useState<FacultyForm>({ facId: '', facName: '', email: '', password: '' })
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' })
  const [eventForm, setEventForm] = useState<EventForm>({ stuRno: '', stuName: '', eventName: '', eventLocation: '', eventDate: '' })

  async function handleRegister() {
    const res = await fetch(`${FACULTY_API}/faculty/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regForm)
    })
    const data: FacultyForm = await res.json()
    if (data?.facId) {
      setMsg('Registered! Please login.')
      setView('login')
    } else {
      setMsg('Registration failed.')
    }
  }

  async function handleLogin() {
    const res = await fetch(`${FACULTY_API}/faculty/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm)
    })
    const data: FacultyForm = await res.json()
    if (data?.facId) {
      setFaculty(data)
      setView('dashboard')
      fetchEvents()
    } else {
      setMsg('Invalid credentials.')
    }
  }

  async function fetchEvents() {
    const res = await fetch(`${EVENT_API}/events/all`)
    const data: EventData[] = await res.json()
    setEvents(data)
  }

  async function handlePostEvent() {
    const payload: EventData = { ...eventForm, facId: faculty!.facId }
    const res = await fetch(`${FACULTY_API}/faculty/events/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      setMsg('Event posted!')
      setEventForm({ stuRno: '', stuName: '', eventName: '', eventLocation: '', eventDate: '' })
      fetchEvents()
    } else {
      setMsg('Failed to post event.')
    }
  }

  async function handleDelete(stuRno: string) {
    await fetch(`${EVENT_API}/faculty/delete/${stuRno}`, { method: 'DELETE' })
    setMsg('Event deleted.')
    fetchEvents()
  }

  if (view === 'register') {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Faculty Register</h2>
        {msg && <p className="text-sm text-blue-600 mb-3">{msg}</p>}
        <input className="border w-full p-2 mb-3 rounded" placeholder="Faculty ID"
          value={regForm.facId} onChange={e => setRegForm({ ...regForm, facId: e.target.value })} />
        <input className="border w-full p-2 mb-3 rounded" placeholder="Faculty Name"
          value={regForm.facName} onChange={e => setRegForm({ ...regForm, facName: e.target.value })} />
        <input className="border w-full p-2 mb-3 rounded" placeholder="Email"
          value={regForm.email} onChange={e => setRegForm({ ...regForm, email: e.target.value })} />
        <input className="border w-full p-2 mb-3 rounded" type="password" placeholder="Password"
          value={regForm.password} onChange={e => setRegForm({ ...regForm, password: e.target.value })} />
        <button onClick={handleRegister} className="bg-gray-800 text-white px-4 py-2 rounded w-full">Register</button>
        <p className="mt-3 text-sm text-center">
          Already registered?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={() => { setView('login'); setMsg('') }}>Login</span>
        </p>
      </div>
    )
  }

  if (view === 'login') {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Faculty Login</h2>
        {msg && <p className="text-sm text-red-500 mb-3">{msg}</p>}
        <input className="border w-full p-2 mb-3 rounded" placeholder="Email"
          value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
        <input className="border w-full p-2 mb-3 rounded" type="password" placeholder="Password"
          value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
        <button onClick={handleLogin} className="bg-gray-800 text-white px-4 py-2 rounded w-full">Login</button>
        <p className="mt-3 text-sm text-center">
          New faculty?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={() => { setView('register'); setMsg('') }}>Register</span>
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Welcome, {faculty?.facName}</h2>
        <button onClick={() => { setFaculty(null); setView('login'); setEvents([]); setMsg('') }}
          className="text-sm text-gray-500 hover:text-gray-800">Logout</button>
      </div>
      {msg && <p className="text-sm text-blue-600 mb-4">{msg}</p>}
      <div className="border rounded p-4 mb-6">
        <h3 className="font-semibold mb-3">Post New Event</h3>
        <input className="border w-full p-2 mb-2 rounded" placeholder="Student Roll No"
          value={eventForm.stuRno} onChange={e => setEventForm({ ...eventForm, stuRno: e.target.value })} />
        <input className="border w-full p-2 mb-2 rounded" placeholder="Student Name"
          value={eventForm.stuName} onChange={e => setEventForm({ ...eventForm, stuName: e.target.value })} />
        <input className="border w-full p-2 mb-2 rounded" placeholder="Event Name"
          value={eventForm.eventName} onChange={e => setEventForm({ ...eventForm, eventName: e.target.value })} />
        <input className="border w-full p-2 mb-2 rounded" placeholder="Event Location"
          value={eventForm.eventLocation} onChange={e => setEventForm({ ...eventForm, eventLocation: e.target.value })} />
        <input className="border w-full p-2 mb-3 rounded" placeholder="Event Date (e.g. 2025-06-01)"
          value={eventForm.eventDate} onChange={e => setEventForm({ ...eventForm, eventDate: e.target.value })} />
        <button onClick={handlePostEvent} className="bg-gray-800 text-white px-4 py-2 rounded w-full">Post Event</button>
      </div>
      <div>
        <h3 className="font-semibold mb-3">All Events</h3>
        {events.length === 0 && <p className="text-sm text-gray-500">No events yet.</p>}
        {events.map(ev => (
          <div key={ev.stuRno} className="border rounded p-3 mb-2 flex justify-between items-start">
            <div>
              <p className="font-medium">{ev.eventName}</p>
              <p className="text-sm text-gray-600">{ev.stuName} ({ev.stuRno}) — {ev.eventLocation} — {ev.eventDate}</p>
            </div>
            <button onClick={() => handleDelete(ev.stuRno)} className="text-red-500 text-sm hover:text-red-700 ml-4">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Student Register ─────────────────────────────────────────────────────────

function Register() {
  const [form, setForm] = useState<StudentForm>({ stuRno: '', stuName: '', email: '', password: '' })
  const [msg, setMsg] = useState('')

  async function handleRegister() {
    const res = await fetch(`${STUDENT_API}/register/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data: StudentForm = await res.json()
    if (data?.stuRno) {
      setMsg('Registered successfully! You can now login.')
      setForm({ stuRno: '', stuName: '', email: '', password: '' })
    } else {
      setMsg('Registration failed.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Student Register</h2>
      {msg && <p className="text-sm text-blue-600 mb-3">{msg}</p>}
      <input className="border w-full p-2 mb-3 rounded" placeholder="Roll Number"
        value={form.stuRno} onChange={e => setForm({ ...form, stuRno: e.target.value })} />
      <input className="border w-full p-2 mb-3 rounded" placeholder="Name"
        value={form.stuName} onChange={e => setForm({ ...form, stuName: e.target.value })} />
      <input className="border w-full p-2 mb-3 rounded" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border w-full p-2 mb-3 rounded" type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister} className="bg-gray-800 text-white px-4 py-2 rounded w-full">Register</button>
    </div>
  )
}

// ─── Student Login ────────────────────────────────────────────────────────────

function Login() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [event, setEvent] = useState<EventData | null>(null)
  const [msg, setMsg] = useState('')

  async function handleLogin() {
    const res = await fetch(`${STUDENT_API}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data: EventData | null = await res.json()
    if (data && data.eventName) {
      setEvent(data)
      setMsg('')
    } else {
      setMsg('Invalid credentials or no event assigned yet.')
    }
  }

  if (event) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Event</h2>
          <button onClick={() => { setEvent(null); setForm({ email: '', password: '' }) }}
            className="text-sm text-gray-500 hover:text-gray-800">Logout</button>
        </div>
        <div className="border rounded p-4">
          <p className="font-semibold text-lg mb-1">{event.eventName}</p>
          <p className="text-gray-600 text-sm">Location: {event.eventLocation}</p>
          <p className="text-gray-600 text-sm">Date: {event.eventDate}</p>
          <p className="text-gray-600 text-sm">Student: {event.stuName} ({event.stuRno})</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Student Login</h2>
      {msg && <p className="text-sm text-red-500 mb-3">{msg}</p>}
      <input className="border w-full p-2 mb-3 rounded" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border w-full p-2 mb-3 rounded" type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin} className="bg-gray-800 text-white px-4 py-2 rounded w-full">Login</button>
    </div>
  )
}

// ─── App with Routes ──────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white px-6 py-3 flex gap-6">
        <Link className="hover:text-gray-300" to="/">Faculty</Link>
        <Link className="hover:text-gray-300" to="/register">Student Register</Link>
        <Link className="hover:text-gray-300" to="/login">Student Login</Link>
      </nav>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Faculty />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
