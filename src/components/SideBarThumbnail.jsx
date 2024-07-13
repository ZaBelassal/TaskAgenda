import React from "react";

function SidBarThumbnail({
  item,
  handleFilter,
  chosenForm,
  setChosenForm,
  index,
}) {
  function handleClick() {
    handleFilter(item, index);
  }

  return (
    <div>
      <li className="text-white px-5 my-2">
        <button onClick={handleClick}>{item}</button>
      </li>
      <div>
        {/*
        // <ul>
        //   {chosenForm.map((item, index) => (
        //     <li key={index}>
        //       {item.title}: {item.description} (Due: {item.duedate})
        //     </li>
        //   ))}
        // </ul>
      */}
      </div>
    </div>
  );
}

export default SidBarThumbnail;
