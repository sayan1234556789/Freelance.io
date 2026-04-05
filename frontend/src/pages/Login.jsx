import { useState } from "react"
import Navbar from "../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuthContext"
import api from "../api/axios"
import { toast } from "react-toastify";


const Login = () => {

  const { login } = useAuth()
  const navigate = useNavigate()


  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {email, password} = form

    if(!email || !password){
      toast.warning("All fields are required")
      return;
    }
    try {
      const response = await api.post("/auth/login",form)

      if(response?.data){
        login(response.data)
      }

      toast.success("login successfull")

      navigate("/dashboard")
    } catch (error) {
      console.log(error.response?.data || error)
      toast.error("login not successful!")
    }
  }
  return (
    <div className="bg-white/10 min-h-screen text-[#112D4E]">

      <Navbar />

      <div className="flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#DBE2EF]">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to your account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]"
              name = "email"
              value = {form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] outline-none focus:border-[#3F72AF]"
              name = "password"
              value={form.password}
              onChange={handleChange}
            />

            <button
            className="bg-[#112D4E] text-white py-3 rounded-lg font-semibold hover:bg-[#3F72AF] transition"
            type="submit"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-[#3F72AF] cursor-pointer">
                Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login