import React, { useContext, useEffect, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import AddFolderModal from './AddFolderModal'
import { LinkContext } from './Context/LinkContext'
import FolderCard from './FolderCard'

const Folder = (props) => {
    
    const {folders, GetFolders} = useContext(LinkContext)

    const [modal_open, setModalOpen] = useState(false)

    useEffect(() => {
        GetFolders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setModalOpen(false)
    }, [folders])

    const FolderClick = (folder_id) => {

    }
    const FolderDoubleClick = (folder_id) => {
        props.history.push(`/folder/${folder_id}`);
        console.log(folder_id);
    }
    
    return (
        <div className='container'>
            <div className="grid">
                {folders && folders.map(folder => <FolderCard key={folder.id} folder={folder} FolderClick={FolderClick} FolderDoubleClick={FolderDoubleClick}/>)}
            </div>

            <span onClick={() => setModalOpen(true)} className="floating-btn"><BsPlusLg className='icon'/></span>

            {modal_open && <AddFolderModal modal_open={modal_open} setModalOpen={setModalOpen}/>}
            
        </div>
    )
}

export default Folder
