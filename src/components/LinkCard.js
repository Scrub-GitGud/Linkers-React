import React, { useState } from 'react'
import { AiOutlineDollarCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BiDownvote, BiUpvote } from 'react-icons/bi'

export const LinkCard = ({link, setModalOpen, setLinkID}) => {

    return (
        <div className='grid-item link-item'>
            <a href={link.url_uuid} target="_blank">
                <div className='img-div'>
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/869a8b31880517.566541a804d55.png" alt="" />
                </div>
                <div className='title'>{link && link.title}</div>
            </a>

            <span onClick={() => {setModalOpen(true); setLinkID(link.id)}} className='add_to_folder'><AiOutlinePlusCircle className='mr-1'/></span>

            <div className='details'>
                <div className='favicon'>
                    <img src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${link.url}`} alt="" />
                </div>
                <div className="counts flex justify-between items-center">
                    <div className="votes flex justify-start items-center">
                        <BiUpvote className='text-md mx-1 curson-pointer'/>
                        <span className='mx-1 bold'>{link.votes}</span>
                        <BiDownvote className='text-md mx-1 curson-pointer'/>
                    </div>
                    <div className="click_count flex justify-start items-center">
                        <AiOutlineDollarCircle className='text-md mx-1'/>
                        <span className='bold'>{link.clicks}</span>
                    </div>
                    <div className='offset'></div>
                </div>
                <div className="tags">
                    {link.tags && link.tags.map(tag => (
                        <div key={tag.id} className="badge active" style={{backgroundColor: tag.color, borderColor: tag.color}}>{tag.name}</div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}
