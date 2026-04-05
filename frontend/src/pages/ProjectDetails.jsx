import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState("");
  const navigate = useNavigate()
  const { user } = useAuth();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        console.log(res.data);

        setProject(res.data);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const apply = async (id) => {
    try {
      await api.post("/applications", {
        projectId: id,
        proposal,
      });
      toast.success("Applied successfully");
      setProposal("")
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error("Apply again")
    }finally{
      navigate("/getallprojects")
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!project) {
    return <p className="text-center mt-10">Project not found</p>;
  }

  return (
    <div className="bg-[#F9F7F7] min-h-screen text-[#112D4E]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

        <p className="text-[#112D4E]/70 mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.skillsRequired?.map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-[#DBE2EF] px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="font-semibold text-[#3F72AF] text-lg mb-4">
          Budget: ₹ {project.budget}
        </p>

        {user?.role === "freelancer" && (
          <div className="mt-8 bg-white border border-[#DBE2EF] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-3">Submit Proposal</h3>

            <textarea
              placeholder="Write your proposal..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#DBE2EF] bg-[#F9F7F7]
              text-sm text-[#112D4E] placeholder:text-[#112D4E]/30
              outline-none resize-none h-32
              focus:border-[#3F72AF] focus:ring-2 focus:ring-[#3F72AF]/20
              transition-all duration-200"
            />

            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-[#112D4E]/40">
                Be clear and concise to increase your chances
              </p>

              <button
                onClick={() => apply(project._id)}
                className="inline-flex items-center gap-2
                bg-[#3F72AF] text-white text-md font-normal
                px-5 py-2.5 rounded-lg
                hover:bg-[#112D4E]
                active:scale-95
                transition-all duration-200
                shadow-[0_2px_10px_rgba(63,114,175,0.3)]"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
