import React, { useState, useEffect } from "react";
import TodoCards from "./TodoCards";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  let id = sessionStorage.getItem("id");

  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //Adding Task -----------------------------------------------------------------

  const addTask = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title and Body can't be Empty.");
    } else {
      if (id) {
        try {
          await axios.post(`https://todobackend-nu.vercel.app/api/v2/addTask`, {
            title: inputs.title,
            body: inputs.body,
            id: id,
          });
          fetchTasks();
          setInputs({ title: "", body: "" });
          toast.success("Task added successfully!");
        } catch (error) {
          console.error("Error adding task:", error);
        }
      } else {
        setArray([...array, inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Task added successfully!");
        toast.error("To save your tasks, Please Signup!");
      }
    }
  };

  //Updating Task ---------------------------------------------------------------------

  const updateTask = async (taskId, updatedTask) => {
    if (id) {
      try {
        await axios.put(
          `https://todobackend-nu.vercel.app/api/v2/updateTask/${taskId}`,
          updatedTask
        );
        fetchTasks();
        toast.success("Task Updated Successfully!");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      toast.error("To update your tasks, Please Signup!");
    }
  };

  //Updating Status of a Task --------------------------------------------------------

  const updateStatus = async (taskId, updatedStatus) => {
    if (id) {
      try {
        await axios.put(
          `https://todobackend-nu.vercel.app/api/v2/updateStatus/${taskId}`,
          updatedStatus
        );
        fetchTasks();
        toast.success("Task Status Updated.");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      toast.error("Please Signup to save your tasks!");
    }
  };

  //Deleting Task-------------------------------------------------------------------------

  const delTask = async (taskId) => {
    if (id) {
      try {
        await axios.delete(
          `https://todobackend-nu.vercel.app/api/v2/deleteTask/${taskId}`,
          { data: { id: id } }
        );
        fetchTasks();
        toast.success("Task Deleted Successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      toast.success("Task Deleted Successfully!");
      array.splice(id, "1");
      setArray([...array]);
    }
  };

  //Getting all Tasks of a User -------------------------------------------------------------

  const fetchTasks = async () => {
    if (id) {
      try {
        await axios
          .get(`https://todobackend-nu.vercel.app/api/v2/getTask/${id}`)
          .then((res) => {
            setArray(res.data.list);
          });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  //when user navigate to another page and returns back then fetching should be done.
  useEffect(() => {
    fetchTasks();
  }, [id]);

    //Searcching Tasks on the basis of title or body
    const filteredTasks = (array && array.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.body.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  
  

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="h-[calc(100vh-5rem)] bg-gray-100 w-full flex ">

        <div className="w-2/5  h-full flex justify-center py-9 flex-col items-center gap-10">

          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm h-fit ">

            <div className="space-y-4">

              <h1 className="text-center text-2xl font-semibold text-sky-500">
                Task
              </h1>

              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block mb-1 text-gray-600 font-semibold">Title</label>
                <input
                  type="text"
                  className="bg-gray-100 px-4 py-2 outline-none rounded-md w-full"
                  name="title"
                  placeholder="Enter Title"
                  value={inputs.title}
                  onChange={change}
                />
              </div>

              {/* Body Input */}
              <div>
                <label htmlFor="Body" className="block mb-1 text-gray-600 font-semibold">Body</label>
                <textarea
                  id="body"
                  rows="5"
                  className="block p-2.5 w-full text-sm bg-gray-100 rounded-md outline-none"
                  placeholder="Enter Details of Your Task"
                  name="body"
                  value={inputs.body}
                  onChange={change}
                ></textarea>
              </div>

            </div>

            <button
              className="mt-4 w-full bg-gradient-to-tr from-sky-600 to-sky-500 text-white py-2 rounded-md text-lg tracking-wide"
              onClick={addTask}>Add Task
            </button>

          </div>

         {/* Search Bar */}
          <div className="flex items-center gap-3">
            <input
              type="search"
              name="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Your Tasks"
              className="shadow-md p-3  rounded-lg w-72 outline-none "
            />
            <i className="fa-solid fa-search bg-white p-4 rounded-lg shadow-md text-gray-500"></i>
          </div>

        </div>

        {/* Grid of Tasks */}
        <div className="w-3/5 h-full grid grid-cols-3 grid-rows-4 gap-5 p-5 ">
          {filteredTasks && 
            filteredTasks.map((item, index) => (
              <TodoCards
                key={item._id}
                title={item.title}
                body={item.body}
                id={item._id}
                del={delTask}
                updateTask={updateTask}
                updateStatus={updateStatus}
                completed={item.completed}
              />
            ))}
        </div>
        
      </div>
    </>
  );
}

export default Todo;
