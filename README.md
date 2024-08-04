# TODO App

This is a todo website where we can create tasks, update them, delete them, mark them as completed and search for a specific task.
I have made signup and login functionality so that users can only edit their tasks not others'.

Checkout on vercel:
https://todofrontend-dun.vercel.app/

Checkout backend code:
https://github.com/KhushCanCode/todobackend

Checkout frontend code:
https://github.com/KhushCanCode/todofrontend

## Backend

First of all i completed the setup for backend.
-Installed Express, MongoDb. Then started the server and connected the database. Created user and list models. That's the basic stuff.


### Signup and Login API

    //SIGN UP------------------------------------------------------------------------------
    router.post("/signup", async(req,res)=>{
        try {
            const { username, email, password} = req.body;

            const hashpassword = bcrypt.hashSync(password);
            const user = new User({username, email, password: hashpassword});
            await user.save()
            .then(()=>res.status(200).json({message:"Sign Up Successful!"}));

        } catch (error) {
            res.status(200).json({message: "User already exists!"});
        }
    });

    //LOG IN----------------------------------------------------------------------------------
    router.post("/login", async (req, res) => {
        try {

            //If Email is Wrong
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(200).json({ message: "No Such Account Found!" });
            }

            //If Password is Wrong
            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return res.status(200).json({ message: "Password is incorrect!" });
            }

            //storing every detail of user except the password in 'others' array
            const { password, ...others } = user._doc;
            return res.status(200).json({ others, message:"Login Successful!" }); 

        } catch (error) {
            res.status(200).json({ message: "An error occurred!" });
        }
    });

### Task APIs

    //CREATE TASK---------------------------------------------------------------------------------
    router.post("/addTask", async (req, res) => {
        try {
            const { title, body, id } = req.body;
            const existingUser = await User.findById( id );

            if (existingUser) {
                const list = new List({ title, body, user: existingUser });
                await list.save().then(()=>res.status(200).json({ list })); 
                existingUser.list.push(list);
                await existingUser.save()
            } else {
                return res.status(404).json({ error: "User not found." });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    });

    //UPDATE TASK ---------------------------------------------------------------------------------
    router.put("/updateTask/:id", async (req, res) => {
        try {
            const { title, body, id } = req.body;
            const existingUser = await User.findOne(id);

            if (existingUser) {
                const list = await List.findByIdAndUpdate(req.params.id, {title, body});
                list.save().then(()=> res.status(200).json({message: "Task Updated."}));
            } else {
                return res.status(404).json({ error: "User not found." });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    });

    // UPDATE STATUS OF A TASK-----------------------------------------------------------------------------
    router.put("/updateStatus/:id", async (req, res) => {
        try {
            const { id, completed } = req.body;
            const existingUser = await User.findOne(id);

            if (existingUser) {
                const list = await List.findByIdAndUpdate(req.params.id, {completed});
                list.save().then(()=> res.status(200).json({message: "Task Status Updated."}));
            } else {
                return res.status(404).json({ error: "User not found." });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    });


    //DELETE TASK ----------------------------------------------------------------------------------------
    router.delete("/deleteTask/:id", async (req, res) => {
        try {
            const { id } = req.body;
            const existingUser = await User.findByIdAndUpdate( id ,{$pull: {list:req.params.id}});

            if (existingUser) {
                await List.findByIdAndDelete(req.params.id)
                .then(()=>res.status(200).json({message:"Task Deleted."}));
            } else {
                return res.status(404).json({ error: "User not found." });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    });



    //GET ALL TASKS OF A USER ---------------------------------------------------------------------------
    router.get("/getTask/:id", async (req, res) => {
        try {

            const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

            if (list.length > 0) {
                res.status(200).json({ list: list });
            } else {
                res.status(200).json({ message: "No tasks created." });
            }
            
        } catch (error) {
            console.error("Error fetching tasks:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    });

## Frontend

I created these components: Header, About Us, Home, Signup, Login, Todo, TodoCards
I have made a store for storing user id. This is used for login and logout state.

store > index.js

    import {createSlice, configureStore} from "@reduxjs/toolkit";

    const authSlice = createSlice({
        name: "auth",
        initialState: {user: "", isLoggedIn:false},
        reducers: {
            login(state){
                state.isLoggedIn =true;
            },
            logout(state){
                state.isLoggedIn =false;
            },
        }
    });

    export const authActions = authSlice.actions;

    export const store = configureStore({
        reducer: authSlice.reducer,

    })

    // In the header we have used this.
    const isLoggedIn = useSelector((state)=> state.isLoggedIn);
    const dispatch = useDispatch();

    const logout = ()=>{
        sessionStorage.clear("id");
        dispatch(authActions.logout());
    }

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