import React, {useState, useEffect} from "react";

function TodoCards({title, body, id, del, updateTask, completed,  updateStatus}){//prop passing
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedBody, setEditedBody] = useState(body);
    const [status, setStatus] = useState(completed);
    const [penVisible, setPenVisible] = useState(!completed);


    useEffect(() => {
        setStatus(completed);
        setPenVisible(!completed);
    }, [completed]);

    //When we want to edit it enters in edit mode.
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    
    //when we are marking the task as complete or uncomplete
    const toggleStatus = () => {
        const newStatus = !status;
        const ispenvis = !penVisible;
        setPenVisible(ispenvis);
        setStatus(newStatus);
        updateStatus(id, { completed: newStatus });
    };

    //When we are updating the task
    const update = () => {
        updateTask(id, { title: editedTitle, body: editedBody });
        toggleEdit();
      };

    return(
        
            <div className={`task bg-white rounded-lg  shadow-md p-2 h-fit border-t-4 transition  ${status ? "border-green-400" : "border-gray-400"}` }>
                
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="text-base text-gray-600 outline-none w-full"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="block py-2 w-full text-sm text-gray-400 outline-none"
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-sky-500 text-white py-1 px-2 rounded-md hover:bg-gray-300"
                        onClick={update}>OK
                    </button>
                    
                    <button
                        className="mt-2 bg-red-500 text-white py-1 px-2 rounded-md ml-2 hover:bg-gray-300"
                        onClick={toggleEdit}>Cancel
                    </button>
                </>
            ) : (
                <> 
                <h1 className="text-base text-gray-600 font-medium">{title}</h1>
                <p className="text-sm text-gray-400 py-2">{body.split("", 70)}</p>

                <div className="flex items-center justify-between px-2">
                    <i
                        className={`fa-solid fa-square-check ${status ? "text-green-400" : "text-gray-400"}  text-lg transition cursor-pointer`}
                        onClick={toggleStatus}>

                    </i>
                    <div className="mt-2 flex justify-end items-center gap-3 p-1 ">
                        {penVisible?
                        
                        
                        (<i
                        className="fa-solid fa-pen text-sky-500 transition hover:text-gray-500 hover:scale-110 cursor-pointer"
                        onClick={toggleEdit}>
                        </i>):

                        <i className="fa-solid fa-pen hidden"></i>
                        }
                        
                        {/* Delete Icon */}
                        <i className="fa-solid fa-trash-can text-red-500 hover:text-gray-500 hover:scale-110 cursor-pointer"
                        onClick={()=>{
                            del(id);
                        }}>
                        </i>
                    </div>
                </div>
                </>
            )}
            </div>

        
    );
}

export default TodoCards