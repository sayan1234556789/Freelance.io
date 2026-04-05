import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      const res = await api.get(`/projects/${id}`);
      setForm(res.data);
    };
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await api.put(`/projects/${id}`, form);
      toast.success("Project Updated");
      navigate("/clientdashboard");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Project not updated");
    }
  };

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Edit Project
          </h1>
          <p className="text-sm text-[#112D4E]/50 mt-1">
            Update your project details to attract better freelancers
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#DBE2EF]
        shadow-[0_8px_30px_rgba(17,45,78,0.08)]">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className="text-xs font-semibold text-[#112D4E]/60 mb-1 block">
                Project Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Enter project title"
                className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF]
                bg-[#F9F7F7] text-sm font-medium
                focus:outline-none focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20
                transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#112D4E]/60 mb-1 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe your project..."
                className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF]
                bg-[#F9F7F7] text-sm resize-none h-32
                focus:outline-none focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20
                transition"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-semibold text-[#112D4E]/60 mb-1 block">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                  placeholder="Enter budget"
                  className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF]
                  bg-[#F9F7F7] text-sm
                  focus:outline-none focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20
                  transition"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#112D4E]/60 mb-1 block">
                  Deadline
                </label>
                <input
                  type="date"
                  value={form.deadline?.split("T")[0]}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF]
                  bg-[#F9F7F7] text-sm
                  focus:outline-none focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20
                  transition"
                />
              </div>

            </div>

            <div>
              <label className="text-xs font-semibold text-[#112D4E]/60 mb-1 block">
                Skills Required
              </label>
              <input
                type="text"
                value={form.skillsRequired}
                onChange={(e) =>
                  setForm({ ...form, skillsRequired: e.target.value })
                }
                placeholder="e.g. React, Node, MongoDB"
                className="w-full px-4 py-3 rounded-xl border border-[#DBE2EF]
                bg-[#F9F7F7] text-sm
                focus:outline-none focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20
                transition"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">

              <button
                type="button"
                onClick={() => navigate("/clientdashboard")}
                className="px-5 py-2.5 rounded-lg border border-[#DBE2EF]
                text-sm font-medium hover:bg-[#F1F5F9] transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#3F72AF] text-white
                text-sm font-semibold
                hover:bg-[#112D4E]
                active:scale-95
                transition-all duration-200
                shadow-[0_4px_14px_rgba(63,114,175,0.35)]"
              >
                Save Changes
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;