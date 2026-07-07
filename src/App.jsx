import {useState} from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])
  
  function buttonHandler(e) {
    e.preventDefault()
    const copyTask = [...task];
    copyTask.push({ title, details })
    // agar obvject  ke form main store karna hain toh ye likhenge json.stringify
    localStorage.setItem('copy' , JSON.stringify(copyTask))
    // agar array ke form main store karna hain toh ye use karoge json.parse
    console.log(JSON.parse(localStorage.getItem('copy')))
    
    setTask(copyTask)
    setTitle('')
    setDetails('')
  }
  // yaha per cheezein delete ho rahi hain 
  function cancel(idx) {
    const copyTask = [...task]
    copyTask.splice(idx , 1)
    setTask(copyTask)
    alert("Delete task")
  }
  // yaha per cheezein edit kar skate hon 
  function edit(idx) {
  setTitle(task[idx].title);
  setDetails(task[idx].details);
  setEditIndex(idx);
}
  return (
    <div className='bg-black min-h-screen w-full mb-50 '>
    <form className='bg-black  w-full '
    onSubmit = {function(e) {
      buttonHandler(e)
    }}
    >
    <div className='text-white flex flex-wrap flex-col justify-center '>
      <h1 className='tracking-widest text-center text-6xl font-bold'>Notes App</h1>
      <input 
      className = ' border-sky-500 border-2 px-2 py-4 outline-none m-10 rounded-2xl font-bold' 
      type = "text" 
      placeholder='Title'
      value = {title}
      onChange={function(e) {
        setTitle(e.target.value)
      }}
      />
      <textarea 
      className = ' border-b-cyan-500 border-amber-300 border-2 px-2 py-3 h-50 outline-none my-5 mx-10 rounded-2xl font-light' 
      type = "text" 
      placeholder='Details'
      value = {details}
      onChange={function(e) {
        setDetails(e.target.value)
      }}
      />
      <div className='flex flex-wrap justify-center'>
        <button className='bg-amber-50 text-black rounded-4xl w-50 mx-10 py-4 active:scale-95 font-bold'>Add Notes</button>
      </div>
    </div>
    <div className='flex flex-wrap justify-items-start px-10'>
      <h3 className='text-white font-bold'>Recent notes : </h3>
    </div>
    <div className='flex  flex-wrap flex-row justify-evenly items-center border-2 border-white h-100 my-5 overflow-auto rounded-2xl bg-gray-500 mx-10 border-t-8 border-t-emerald-300 scrollbar-none'>
        {task.map(function(elem , idx) {
          return (
        <div key = {idx} className='bg-blue-500 flex flex-wrap flex-col mx-10 my-5 mt-4 border-2 border-white px-2 py-3 w-70 text-white rounded-2xl text-center font-light border-l-8 border-l-indigo-700 border-r-8 border-r-indigo-700'>
          <h1 className='font-bold flex justify-items-start text-3xl text-green-500 tracking-widest font-serif '>{elem.title}</h1>
          <hr className='font-light my-4' />
          <p>{elem.details}</p>
          <div className='flex flex-wrap flex-row justify-between m-2'>
          <button  onClick = {() => {
            cancel(idx)
          }} type = 'button' className='border-none bg-red-700 text-black font-bold rounded-2xl px-3 mx-3 my-1 py-2  active:scale-95 hover:bg-red-300 flex flex-wrap  justify-center'> <MdDelete className='mt-1 mr-1'/> Delete</button>
          <button onClick = {function(elem) {
            edit(idx , elem)
          }} type = 'button' className='border-none bg-green-700 text-black font-bold rounded-2xl px-4 mx-3 my-1 py-2 active:scale-95 hover:bg-green-300 flex flex-wrap justify-center' > <FaEdit className='mt-1 mr-1'/>
 Edit </button>
          </div>
        </div>
          )
        })
      }
    </div>
    </form>
    </div>
  )
}
export default App ;