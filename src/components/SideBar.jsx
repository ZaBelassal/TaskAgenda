import React from 'react'
import SideBarThumbnail from './SideBarThumbnail'

function SideBar({projectsNames,handleFilter,listForm,chosenForm,setChosenForm,setCreateModal,createModal}) {

    function handleClick(){
      setCreateModal(false)
    }
  return (
    <div className='bg-black h-full rounded-lg mt-3 p-4'>
      <h3 className='text-white pt-3 mb-4'>Your projects</h3>
      <button className='text-white rounded bg-slate-900 flex justify-center items-center h-12 w-full' onClick={handleClick}>+ Add Project</button>
      <ul className='text-white'>
      {projectsNames.map((item,index)=>{
        return (
          <SideBarThumbnail 
                listForm={listForm} 
                item={item} 
                index={index} 
                handleFilter={handleFilter}
                chosenForm={chosenForm} 
                setChosenForm={setChosenForm}/>
          )
          })}
      </ul> 
    </div>
  )
}

export default SideBar
