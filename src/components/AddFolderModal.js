import React, { useContext, useState } from 'react'
import { LinkContext } from './Context/LinkContext'

const AddFolderModal = ({modal_open, setModalOpen}) => {

    const {AddFolder} = useContext(LinkContext)
    
    const [name, setName] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(name);
        AddFolder(name)
    }
    
    return (
        <div className='folder-modal'>

            <div onClick={() => setModalOpen(false)} className='dropshadow'></div>
            
            <div className="modal mx-w-xs">
                <form onSubmit={onSubmit} className='auth-form'>
                    <div className="">
                        <label className=''>Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='' type="text" name='name'/>
                    </div>
                    <button className=''>Add Folder</button>
                </form>
            </div>
            
        </div>
    )
}

export default AddFolderModal
