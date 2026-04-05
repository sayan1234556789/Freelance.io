import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

const ProjectApplications = () => {
    const {id} = useParams()

    const [project, setProject] = useState(null)
    const [applications, setApplications] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/projects/my-projects")

                const targetProject = res.data.projects.find((p) => p._id === id) 

                setProject(targetProject)
                setApplications(targetProject?.applications || [])
            } catch (error) {
                console.log(error.response?.data || error)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[id])

    const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-[#F9F7F7] min-h-screen text-[#112D4E]'>
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    {project?.title}
                </h1>
                <p className='text-sm text-[#112D4E]/50'>
                    {applications.length} Applicants
                </p>
            </div>

            {loading ? (
                <p className="text-center text-[#112D4E]/60 animate-pulse">Loading...</p>
            ):applications.length === 0 ? (
                <p className="text-center text-[#112D4E]/60">
                    No applicants yet
                </p>
            ): (
                <div>
                    {applications.map((app) => (
                        <div 
                            key={app._id}
                            className="bg-white border border-[#DBE2EF] rounded-xl p-5
                            hover:shadow-md transition"
                        >
                        <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#DBE2EF] flex items-center justify-center font-semibold text-[#3F72AF]">
                        {app.freelancerId?.name?.charAt(0)}
                    </div>

                  <div>
                    <p className="font-semibold">
                      {app.freelancerId?.name}
                    </p>
                    <p className="text-xs text-[#112D4E]/50">
                      {app.freelancerId?.email}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase text-[#112D4E]/40 mb-1">
                    Proposal
                  </p>
                  <p className="bg-[#F9F7F7] border border-[#DBE2EF] p-3 rounded-lg text-sm">
                    {app.proposal}
                  </p>
                </div>

                    <div className="flex justify-end gap-2">
                        {app.status === "pending" && (
                            <>
                                <button
                                    onClick={() => updateStatus(app._id, "accepted")}
                                    className="text-xs px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Accept
                                </button>
                                <button 
                                    onClick={() => updateStatus(app._id, "rejected")}
                                    className="text-xs px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </>
                        )}

                        {app.status === "accepted" && (
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                                ✓ Accepted
                            </span>
                        )}

                        {app.status === "rejected" && (
                            <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-500">
                                ✕ Rejected
                            </span>
                        )}
                    </div>
                 </div>
                ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default ProjectApplications