import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const CreateProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    skills: "",
    deadline: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...form,
        skillsRequired: form.skills
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e.length > 0),
      };

      delete formattedData.skills;

      const res = await api.post("/projects", formattedData);

      toast.success("Project Created!");
      console.log(res.data);
      navigate("/clientdashboard");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("error in creating project");
    }
  };

  return (
    <div className="bg-white/10 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-[#DBE2EF]">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-[#3F72AF] text-xs font-semibold tracking-widest uppercase mb-2">
              <span className="w-4 h-px bg-[#3F72AF]" />
              New Listing
            </span>

            <h2 className="text-2xl font-extrabold text-[#112D4E]">
              Create Project
            </h2>

            <p className="text-sm text-[#112D4E]/50 mt-1">
              Fill in the details below to post your project.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
              text-sm text-[#112D4E] font-medium placeholder:text-[#112D4E]/30
              outline-none focus:border-[#3F72AF]"
            />

            <textarea
              placeholder="Description"
              name="description"
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
              text-sm text-[#112D4E] font-medium placeholder:text-[#112D4E]/30
              outline-none focus:border-[#3F72AF] h-28 resize-none"
            />

            <input
              type="text"
              name="budget"
              placeholder="Budget"
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
              text-sm text-[#112D4E] font-medium placeholder:text-[#112D4E]/30
              outline-none focus:border-[#3F72AF]"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (e.g. React, Node)"
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
              text-sm text-[#112D4E] font-medium placeholder:text-[#112D4E]/30
              outline-none focus:border-[#3F72AF]"
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#112D4E]/60">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline?.split("T")[0]}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
                text-sm text-[#112D4E] font-medium
                outline-none focus:border-[#3F72AF]
                transition-all duration-200"
              />
            </div>

            <div className="h-px bg-[#DBE2EF] mt-2" />

            <button
              type="submit"
              className="bg-[#112D4E] text-white py-3 rounded-lg font-semibold
              hover:bg-[#3F72AF] transition active:scale-[0.98] cursor-pointer"
            >
              Create Project
            </button>
          </form>

          <p className="text-xs text-center text-[#112D4E]/40 mt-5">
            Your project will be visible to all freelancers on the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
