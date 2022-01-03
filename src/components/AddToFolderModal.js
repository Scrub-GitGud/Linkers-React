import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { LinkContext } from './Context/LinkContext'
import FolderCard from './FolderCard'

//import toastify
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const AddToFolderModal = ({link_id, modal_open, setModalOpen}) => {

    const {AddFolder} = useContext(LinkContext)
    
    const [name, setName] = useState("")
    const [folders, setFolders] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name);
        AddFolder(name)
    }


    const LoadFolders = async () => {
        try {
            const res = await axios.get('/folder/link-folders', {params: {id: link_id}})
            console.log(res)
            if(res.data.success){
                setFolders(res.data.data)
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    const FolderClick = async (folder_id) => {
        try {
            const res = await axios.post('/folder/links/add', {link_id: link_id, folder_id: folder_id})
            console.log(res)
            if(res.data.success){
                LoadFolders()
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }
    const FolderDoubleClick = (folder_id) => {
        
    }
    
    useEffect(() => {
        console.log(link_id);
        if(link_id) LoadFolders()
    }, [link_id])

    useEffect(() => {
        console.log(folders);
    }, [folders])
    
    return (
        <div className='folder-modal'>

            <div onClick={() => setModalOpen(false)} className='dropshadow'></div>
            
            <div className="modal mx-w-md">
                
                <div className="list grid m-1">
                    {folders && folders.map(folder => <FolderCard folder={folder} FolderClick={FolderClick} FolderDoubleClick={FolderDoubleClick}/>)}
                </div>
                
            </div>
            
        </div>
    )
}

export default AddToFolderModal
