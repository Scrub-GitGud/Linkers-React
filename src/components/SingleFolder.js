import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LinkCard } from './LinkCard';
import AddToFolderModal from './AddToFolderModal';

//import toastify
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const SingleFolder = (props) => {

    const id = props.match.params.id;

    const [links, setLinks] = useState(false)
    const [modal_open, setModalOpen] = useState(false)
    const [link_id, setLinkID] = useState(null)

    const LoadFolderLinks = async () => {
        try {
            const res = await axios.get('/folder/folder-links', {params: {id: id}})
            console.log(res)
            if(res.data.success){
                setLinks(res.data.data)
            } else {
                console.log(res.data.message)
                toast.error(res.data.message, { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
            }
        } catch(err) {
            console.log(err)
            toast.error("Something went wrong.", { autoClose: 2000, position: toast.POSITION.TOP_CENTER});
        }
    }

    useEffect(() => {
        LoadFolderLinks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className='container'>

            <div className="grid">
                {links && links.map(link => <LinkCard key={link.id} link={link} setLinkID={setLinkID} setModalOpen={setModalOpen}/>)}
            </div>

            {modal_open && <AddToFolderModal link_id={link_id} modal_open={modal_open} setModalOpen={setModalOpen}/>}
            
        </div>
    )
}

export default SingleFolder
