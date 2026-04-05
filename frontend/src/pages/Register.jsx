import { useState } from "react"
import Navbar from "../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import { toast } from "react-toastify";


const Register = () => {
  const [form , setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "freelancer"
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!form.email || !form.password || !form.name || !form.confirmPassword || !form.role){
      toast.warning("All fields are required!")
      return
    }

    if(form.password !== form.confirmPassword){
      toast.warning("passwords donot match")
      return
    }
    try {
      const response = await api.post("/auth/register", form)
      console.log(response.data)

      toast.info("Verify your email...")

    } catch (error) {
      console.log(error.response?.data || error)
      toast.error("Registration failed")
    }
  }

  return (
    <div className="bg-white/10 min-h-screen text-[#112D4E]">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#DBE2EF]">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create your account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <input type="text" placeholder="Full Name"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" 
              name = "name"
              onChange={handleChange}
              value={form.name}
              />

            <input type="email" placeholder="Email"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" 
              name = "email"
              onChange={handleChange}
              value={form.email}
              />

            <input type="password" placeholder="Password"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]" 
              name = "password"
              onChange={handleChange}
              value={form.password}
              />

            <input type="password" placeholder="Confirm Password"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]"
              name = "confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword}
              />

            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio"
                  name = "role"
                  checked = {form.role === "freelancer"}
                  value="freelancer"
                  onChange={handleChange}
                />
                Freelancer
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name = "role"
                  checked = {form.role === "client"}
                  value="client"
                  onChange={handleChange} 

                />
                Client
              </label>
            </div>

            <button 
              className="bg-[#112D4E] text-white py-3 rounded-lg font-semibold hover:bg-[#3F72AF] transition"
              type="submit"
            >
              Register
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#3F72AF] cursor-pointer">
                Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register