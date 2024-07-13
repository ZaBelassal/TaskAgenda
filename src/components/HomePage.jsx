import React, { useState, useEffect } from "react";

function HomePage({
  setProjectsNames,
  setCreateModal,
  createModal,
  form,
  listForm,
  setListForm,
  handleChangeForm,
  handleCreateClick,
  handleSubmit,
  isClicked,
  chosenForm,
  setChosenForm,
}) {
  const [task, setTask] = useState("");

  function handleSubmitTask(e) {
    e.preventDefault();

    setListForm((prevListForm) => {
      // Find the index of the chosen form in the listForm
      const formIndex = prevListForm.findIndex(
        (item) =>
          item.title === chosenForm[0].title &&
          item.description === chosenForm[0].description &&
          item.duedate === chosenForm[0].duedate
      );

      console.log(formIndex);

      if (formIndex === -1) {
        console.log("nothing to update");
        return prevListForm; // Return the original array if the form is not found
      }

      // Create the updated form with the new task
      const updatedForm = {
        ...prevListForm[formIndex],
        tasks: [...(prevListForm[formIndex].tasks || []), task], // Ensure tasks is an array and add the new task
      };

      // Return the updated listForm array with the modified form
      return prevListForm.map(
        (item, index) => (index === formIndex ? updatedForm : item) // si index === le nouveau index on doit retourner formIndex
        //sinon on retourne l'item
      );
    });

    // Optionally update chosenForm as well
    setChosenForm((prevChosenForm) => {
      const updatedChosenForm = {
        ...prevChosenForm[0],
        tasks: [...(prevChosenForm[0].tasks || []), task],
      };
      return [updatedChosenForm];
    });

    setTask("");
  }

  function handleClearTask(taskIndex) {
    setListForm((prevListForm) => {
      // Find the index of the chosen form in the listForm
      const formIndex = prevListForm.findIndex(
        (item) =>
          item.title === chosenForm[0].title &&
          item.description === chosenForm[0].description &&
          item.duedate === chosenForm[0].duedate
      );

      if (formIndex === -1) {
        console.log("nothing to clear");
        return prevListForm; // Return the original array if the form is not found
      }

      // Create the updated tasks array without the task at taskIndex
      const updatedTasks = prevListForm[formIndex].tasks.filter(
        (_, index) => index !== taskIndex
      );

      // Create the updated form with the updated tasks
      const updatedForm = {
        ...prevListForm[formIndex],
        tasks: updatedTasks,
      };

      // Return the updated listForm array with the modified form
      return prevListForm.map((item, index) =>
        index === formIndex ? updatedForm : item
      );
    });

    // Update ChosenFOrm as well its a necessary

    setChosenForm((prevChosenForm) => {
      const updatedChosenForm = {
        ...prevChosenForm[0],
        tasks: prevChosenForm[0].tasks.filter(
          (_, index) => index !== taskIndex
        ),
      };
      return [updatedChosenForm];
    });
  }

  function handleClearForm() {
    const formIndex = [...listForm].findIndex(
      (item) =>
        item.title === chosenForm[0].title &&
        item.description === chosenForm[0].description &&
        item.duedate === chosenForm[0].duedate
    );
    const updatedForm = [...listForm].filter((_, index) => index !== formIndex);

    console.log(updatedForm);

    console.log(formIndex);

    setListForm((prevListForm) => {
      // Find the index of the chosen form in the listForm

      if (formIndex === -1) {
        console.log("nothing to clear");
        return prevListForm; // Return the original array if the form is not found
      }
      return updatedForm;
    });

    setChosenForm([]);

    setProjectsNames(() => {
      const Updated = updatedForm.map((item) => item.title);
      return Updated;
    });
    setCreateModal(false);
  }
  // function handleClearTask(id) {
  //   console.log("clicked");
  //   const tasksUpdated = [...listForm[id].tasks];
  //   tasksUpdated.splice(id, 1);
  //   console.log(tasksUpdated);
  //   console.log(id);
  //   console.log(listForm);
  //   const temp = [...listForm[id].tasks];
  //   temp.slice(id, 1);
  //   const updatedForm = {
  //     ...listForm[id],
  //     tasks: tasksUpdated,
  //   };
  //   setListForm((prevListForm) => (prevListForm = updatedForm));

  //   // setListForm((prevListForm) => {
  //   //   // const tasksUpdated = [...prevListForm[id].tasks].splice(id, 1);
  //   //   const tasksUpdated = [...prevListForm[id].tasks];
  //   //   tasksUpdated.splice(id, 1);
  //   //   console.log(tasksUpdated);
  //   //   // console.log(id);
  //   //   // console.log(prevListForm);
  //   //   // const temp = [...prevListForm[id].tasks];
  //   //   // temp.slice(id, 1);
  //   //   const updatedForm = {
  //   //     ...prevListForm[id],
  //   //     tasks: tasksUpdated,
  //   //   };
  //   //   console.log(updatedForm);
  //   //   return [updatedForm];
  //   // });
  // }

  /*

  
  // using item but I didnt complete it
  function handleClearTask(){
    setChosenForm(prevState=>{
      const updatedForm = prevState.filter((item,index)=>index!=0 )
    })
  }
  
// using index

  function handleClearTask(idx) {
    setChosenForm(prevState => {
      const updatedTasks = prevState[0].tasks.filter((_, index) => index !== idx);
      const updatedForm = { ...prevState[0], tasks: updatedTasks };
      return [updatedForm];
    });
  }
*/

  return (
    <>
      {!isClicked ? (
        createModal ? (
          <div className="flex flex-col justify-center items-center">
            <h3>No Project Selected</h3>
            <p>Select a project or get started with a new one</p>
            <button
              className="bg-slate-400 rounded p-3 my-2"
              onClick={handleCreateClick}
            >
              Create a new project
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex justify-between p-5 bg-gray-100">
              <button className="p-2 bg-red-500 text-white rounded">
                Cancel
              </button>
            </div>
            <form className="flex-grow p-5" onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                className="bg-slate-200 p-2 mb-4 w-full"
                value={form.title}
                onChange={handleChangeForm}
                required
              />{" "}
              <br />
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="bg-slate-200 p-2 mb-4 w-full"
                value={form.description}
                onChange={handleChangeForm}
                required
              />{" "}
              <br />
              <label htmlFor="duedate">Due Date</label>
              <input
                id="duedate"
                className="bg-slate-200 p-2 mb-4 w-full"
                type="date"
                value={form.duedate}
                onChange={handleChangeForm}
                required
              />
              <button
                className="p-2 bg-blue-500 text-white rounded"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        )
      ) : (
        <>
          {chosenForm.length > 0 && chosenForm[0] ? ( // Add a check for chosenForm
            <>
              <header className="px-5">
                <div className="flex justify-between">
                  <span className="inline-block text-5xl">
                    {chosenForm[0].title}
                  </span>
                  <button className="inline-block" onClick={handleClearForm}>
                    Clear
                  </button>
                </div>
                <div className="py-3 text-slate-500">
                  {chosenForm[0].duedate}
                </div>
                <div className="py-1">{chosenForm[0].description}</div>
              </header>
              <hr className="width:90% size:2" />
              <main className="px-5">
                <div className="inline-block text-5xl py-5">Tasks</div>
                <form onSubmit={handleSubmitTask}>
                  <div className="flex justify-between">
                    <label htmlFor="task">Task: </label>
                    <input
                      className="bg-slate-300"
                      type="text"
                      id="task"
                      name="task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
                <aside className="py-5">
                  {chosenForm[0].tasks.length !== 0 && (
                    <ul>
                      {chosenForm[0].tasks.map((item, index) => (
                        <div className="flex justify-between my-3">
                          <li className="" key={index}>
                            {item}
                          </li>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleClearTask(index)}
                          >
                            Clear
                          </button>
                        </div>
                      ))}
                    </ul>
                  )}
                </aside>
              </main>
              <footer></footer>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h3>No Chosen Form catched</h3>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
