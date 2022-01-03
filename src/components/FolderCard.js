import React from 'react'
import { AiFillFolder } from 'react-icons/ai'

const FolderCard = ({folder, FolderClick, FolderDoubleClick}) => {
    return (
        <div onDoubleClick={() => FolderDoubleClick(folder.id)} onClick={() => FolderClick(folder.id)} className={`grid-item folder ${folder.is_added && 'red-folder'}`}>
            <AiFillFolder className="icon"/>

            <div className="details">
                <div className='folder-title'>
                    <div className="name">{folder.name}</div>
                </div>
                <div className="sub">{folder.date}</div>
            </div>
        </div>
    )
}

export default FolderCard
