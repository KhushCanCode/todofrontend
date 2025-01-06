# To-Do App

## Deployed Link
https://todofrontend-dun.vercel.app/

This is a To-Do Application built as a minor MERN stack project to understand the basics of web development using MongoDB, Express.js, React.js, and Node.js. The application allows users to manage their tasks effectively.

## Features

Create Tasks: Add new tasks to your to-do list.
Update Tasks: Modify task details as needed.
Delete Tasks: Remove tasks when they are no longer required.
Account-Based Storage: Create an account to save your tasks in a database and access them anytime.
Sign up and log in to save your tasks in the database.
Tasks are linked to your account for persistent storage.

## Tech Stack
Frontend: React.js
Backend: Node.js with Express.js
Database: MongoDB
Deployment: Vercel (Frontend), Render/Heroku (Backend)

## Learnings

1. I learned how to connect frontend to backend.
for example: In the signup component when signup bitton is clicked we are using axios to post this request to backend.

    //When Sign Up is clicked.
    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/v1/signup", inputs);
            if(res.data.message === "User already exists!"){
            toast.error(res.data.message);
            }
            else{
            alert(res.data.message); //Successful Signup
            setInputs({
                username: "",
                email: "",
                password: ""
            });

            history('/login'); //Send to login page
            }
        
        } catch (error) {
        toast.error("Error occurred. Please try again later!");
        console.error("Error:", error);
        }
    };

2. I can send props from child to parent too. And props are cool.

3. UseEffect is actually useful, when the user goes from one page to another
and returns back the tasks disappeared with useEffect we can fetch the tasks again.

    const fetchTasks = async () => {
        if (id) {
        try {
            await axios
            .get(`http://localhost:4000/api/v2/getTask/${id}`)
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

4. We should use && to prevent crashes. Like when i wanted to filter tasks from array i ddn't use && 
, i was almost done so i tried to sign up with new account for final testing when i signed up, logged in, everything dissappeared
on todo page. I was so dissappointed. Then like after undoing things i got to know that problem was caused by filteredTasks function.
The problem was for a new user there are no tasks so what will be mapped if there is nothing lol.
Then i used &&.

    const filteredTasks = (array && array.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.body.toLowerCase().includes(searchQuery.toLowerCase())
        ));

5. Always use try catch to avoid crashes.

6. Always use async await for necessary saves.
