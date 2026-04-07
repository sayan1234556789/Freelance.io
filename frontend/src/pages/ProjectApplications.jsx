import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/useAuthContext";
import { toast } from "react-toastify";

const ProjectApplications = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let targetProject;

        if(user?.role === "client"){
          const res = await api.get("/projects/my-projects");
  
          targetProject = res.data.projects.find(
            (p) => p._id.toString() === id,
          );
        }else{
          const res = await api.get(`/projects/${id}`)
          targetProject = res.data
        }

        setProject(targetProject);
        setApplications(targetProject?.applications || []);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTasks = async () => {
      try {
        const taskRes = await api.get(`/tasks/${id}`);
        setTasks(taskRes.data);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchTasks();
  }, [id]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}`, { status });

      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTask = async () => {
    try {
      if (!project.assignedFreelancer?._id) {
        toast.error("Assign a freelancer before creating tasks");
        return;
      }

      const createTaskRes = await api.post("/tasks", {
        projectId: project._id,
        assignedTo: project.assignedFreelancer?._id,
        title: taskTitle,
        description: taskDescription,
      });

      setTasks((prev) => [...prev, createTaskRes.data]);

      toast.success("Task created");

      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Error in creating Task");
    }
  };

  const updateTaskStatus = async (taskid, status) => {
    try {
      await api.put(`/tasks/${taskid}`, { status });

      setTasks(tasks.map((t) => (t._id === taskid ? { ...t, status } : t)));
      toast.success("Task updated successfully");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Task not updated");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const deleteRes = await api.delete(`/tasks/${id}`);

      setTasks(tasks.filter((t) => t._id != id));

      toast.success("Task deleted");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Error deleting task");
    }
  };

  return (
  <div className="bg-[#F4F7FB] min-h-screen text-[#0f172a]">
    <Navbar />

    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

      <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-xl p-8">
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F72AF]/5 to-[#112D4E]/5" />

        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">
            {project?.title || "Project"}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-[#64748b]">
            <span className="bg-[#F1F5F9] px-3 py-1 rounded-full">
              👥 {applications.length} Applicants
            </span>
            <span className="bg-[#F1F5F9] px-3 py-1 rounded-full">
              📌 {tasks.length} Tasks
            </span>
          </div>
        </div>
      </div>

      {user?.role === "client" && (
        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Applicants</h2>
          </div>

          {loading ? (
            <p className="text-center text-[#64748b] animate-pulse">
              Loading applicants...
            </p>
          ) : applications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
              <p className="text-[#64748b]">No applicants yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {applications.map((app) => (
                <div
                  key={app._id}
                  className="group relative bg-white border border-[#E2E8F0]
                  rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="flex items-center gap-4 mb-5">

                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3F72AF] to-[#112D4E]
                    flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {app.freelancerId?.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-[15px]">
                        {app.freelancerId?.name}
                      </p>
                      <p className="text-xs text-[#64748b]">
                        {app.freelancerId?.email}
                      </p>
                    </div>

                  </div>

                  <div className="mb-5">
                    <p className="text-[11px] uppercase tracking-wider text-[#94A3B8] mb-2">
                      Proposal
                    </p>
                    <p className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl text-sm leading-relaxed">
                      {app.proposal}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">

                    {project?.status === "in-progress" ? (
                      <span className="text-sm px-3 py-1.5 rounded-full bg-green-100 text-green-600 font-medium">
                        ✓ Freelancer Hired
                      </span>
                    ) : (
                      <div className="flex gap-2">

                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(app._id, "accepted")}
                              className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white
                              hover:bg-green-600 active:scale-95 transition shadow"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() => updateStatus(app._id, "rejected")}
                              className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white
                              hover:bg-red-600 active:scale-95 transition shadow"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {app.status === "accepted" && (
                          <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600">
                            ✓ Accepted
                          </span>
                        )}

                        {app.status === "rejected" && (
                          <span className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-500">
                            ✕ Rejected
                          </span>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      )}

      {user?.role === "client" && project?.assignedFreelancer && (
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0]
        shadow-xl space-y-5">

          <h2 className="text-xl font-semibold">Create Task</h2>

          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task title"
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0]
            bg-[#F8FAFC] focus:ring-2 focus:ring-[#3F72AF]/20"
          />

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description"
            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0]
            bg-[#F8FAFC] focus:ring-2 focus:ring-[#3F72AF]/20"
          />

          <button
            onClick={handleCreateTask}
            className="w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#3F72AF] to-[#112D4E]
            hover:opacity-90 active:scale-[0.98] transition shadow-lg"
          >
            + Add Task
          </button>
        </div>
      )}

      {/* TASKS */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Tasks</h2>

        {tasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E8F0]">
            <p className="text-[#64748b]">No tasks yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-2xl border border-[#E2E8F0]
                hover:shadow-xl hover:-translate-y-1 transition-all"
              >

                <h2 className="font-semibold text-lg mb-1">
                  {task.title}
                </h2>

                <p className="text-sm text-[#64748b] mb-4">
                  {task.description}
                </p>

                <div className="flex justify-between items-center">

                  <span className={`text-sm px-3 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {task.status}
                  </span>

                  {user?.role === "client" && (
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}

                  {user?.role === "freelancer" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateTaskStatus(task._id, "in-progress")}
                        className="text-sm px-3 py-1 bg-yellow-400 rounded-lg"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => updateTaskStatus(task._id, "completed")}
                        className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg"
                      >
                        Complete
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  </div>
);
};

export default ProjectApplications;
