import React,{useState,useEffect,useReducer} from 'react';
import Select from "react-dropdown-select";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Maps from '../Map/Maps';
import axios from 'axios';

let initialState={
    Title:"",
    Description:""
}
const Form = () => {
    const [value,setValue]=useState([]);
    const [Data,setData]=useState([]);
    const [options,setOptions]=useState([]);
    const [userInput, setUserinput] = useState(initialState);
    const [CanPost,setCanPost]=useState('hidden');  
    const [isSuccess,setisSuccess]=useState("hidden");
    const getData=async()=>{
        await axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    };
    const TextInput=({type,payload})=>{
        if(type==="Title")
        {
            setUserinput({...userInput, Title: payload})
        }
        else if(type==="Description")
        {
            setUserinput({...userInput,Description:payload})
        }
    }
    useEffect(()=> {
        const processedOptions = Data?.map(({id,name, address})=>({
            label: name,
            value: id,
            geo: address?.geo
        })
        );
        setOptions(processedOptions || [])
    },[Data]);

    useEffect(() => {
      getData();
    }, []);


    let PostNow=(e)=>{
        e.preventDefault();
        if(CanPost==="hidden")
        {
            value.map(async({value})=>{
               await axios.post("https://jsonplaceholder.typicode.com/posts",{
                   "title":userInput.Title,
                   "body":userInput.Description,
                   "userId":value
               }).then((res)=>console.log(res)).then((err)=>console.log(err));
           })
        }
    }
    let checkPost=()=>{
        if(value.length===0 || userInput.Title==="" || userInput.Description==="")
        {
            setCanPost("block");
            setisSuccess("hidden")
        }
        else{
            setCanPost("hidden");
            setisSuccess("block")
        }
    }

    return (
        <>
        <div className="flex justify-center items-center">
            <div className='h-screen bg-cover flex justify-center items-center w-1/2'>
            <form className="flex flex-col gap-6 items-center backdrop-blur-md m-auto h-fit w-full pl-11" onSubmit={PostNow} method="post">
                <h1 className='font-serif text-5xl font-extrabold text-black relative 2xl:right-1/4'>Create Post</h1>
                <FormControl className='w-1/2'>
                    <Select options={options} onChange={(items) =>setValue(items)} values={value} />
                    <span className={`text-red-600 ${value.length===0?"block":"hidden"}`}>*Atleast one Items should be selected</span>
                </FormControl>
                <FormControl className="w-1/2">
                    <TextField
                    id="outlined-multiline-static"
                    label="Title"
                    multiline
                    rows={4}
                    value={userInput.Title}
                    onChange={(e)=>TextInput({type:"Title",payload:e.target.value})}
                   />
                    <span className={`text-red-600 ${userInput.Title===""?"block":"hidden"}`}>*Title should not be empty</span>
                </FormControl>
                <FormControl className='w-1/2'>
                    <TextField id="outlined-multiline-static" className="text-white" label="Description" rows={6} multiline  value={userInput.Description} onChange={(e)=>TextInput({type:"Description",payload:e.target.value})}/>
                    <span className={`text-red-600 ${userInput.Description===""?"block":"hidden"}`}>*Description should not be empty</span>
                </FormControl>  
                <span className={`${CanPost} text-red-600`}>can't Create this Post as one/more required fields are empty</span>
                <button className="bg-green-700 rounded-lg text-white font-bold text-2xl px-10 py-" type="submit" onClick={checkPost}>Post</button>
                <span className={`text-green-500 ${isSuccess}`}>Post created Successfully</span>
                </form>
            </div>
            <Maps location={value[0]}/>
        </div>
        </>
    );
}

export default Form;
