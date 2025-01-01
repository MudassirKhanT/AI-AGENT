import { useState, useContext, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { initializeSocket, receiveMessagae, sendMessage } from "../config/socket";
const Project = () => {
  const location = useLocation();
  //console.log(location.state);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  //const [message, setMessage] = useState();
  const [message, setMessage] = useState("");
  const messageBox = React.createRef();

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function send() {
    sendMessage("project-message", {
      message,
      sender: user,
    });
    appendOutgoingMessage(message);
    setMessage("");
  }
  useEffect(() => {
    initializeSocket(project._id);
    receiveMessagae("project-message", (data) => {
      console.log("data:", data);
      appendIncomingMessage(data);
    });
    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function appendIncomingMessage(messageObject) {
    const messageBox = document.querySelector(".message-box");

    const message = document.createElement("div");
    message.classList.add("message", "max-w-56", "flex", "flex-col", "p-2", "bg-slate-200");
    message.innerHTML = `<small class='opacity-65 text-xs'> ${messageObject.sender.email}</small>
    <p class='text-sm'>${messageObject.message}</p>`;
    messageBox.appendChild(message);
    scrollToBottom();
  }

  function appendOutgoingMessage(message) {
    const messageBox = document.querySelector(".message-box");

    const newMessage = document.createElement("div");
    newMessage.classList.add("ml-auto", "message", "max-w-56", "flex", "flex-col", "p-2", "bg-slate-200");
    newMessage.innerHTML = `<small class='opacity-65 text-xs'> ${user.email}</small>
    <p class='text-sm'>${message}</p>`;
    messageBox.appendChild(newMessage);
    scrollToBottom();
  }
  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-full min-w-96 bg-slate-300">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
          <button onClick={() => setIsModalOpen(true)} className="flex gap-2 ">
            <i className="ri-add-fill mr-1"></i>
            <p>Add collaborator</p>
          </button>
          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="p-2 ">
            <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div ref={messageBox} className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full "></div>
          <div className="inputField w-full flex absolute bottom-0">
            <input value={message} onChange={(e) => setMessage(e.target.value)} className="p-2 px-4 border-none outline-none flex-grow" type="text" placeholder="Enter message" />
            <button onClick={send} className="px-5 bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
        <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"} top-0`}>
          <header className="flex justify-between items-center p-2 px-3 bg-slate-200">
            <h1 className="font-semibold text-lg">Collaborators</h1>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            {project.users &&
              project.users.map((user) => {
                return (
                  <>
                    <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                      <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                        <i className="ri-user-fill absolute"></i>
                      </div>
                      <h1 className="font-semibold text-lg">{user.email}</h1>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user) => (
                <div key={user.id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? "bg-slate-200" : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button onClick={addCollaborators} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md">
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
