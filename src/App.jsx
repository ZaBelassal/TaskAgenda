import HomePage from "./components/HomePage";
import SideBar from "./components/SideBar";
import { useState, useEffect } from "react";

function App() {
  const [createModal, setCreateModal] = useState(true);
  const [listForm, setListForm] = useState([]);
  const [projectsNames, setProjectsNames] = useState([]);
  const [chosenForm, setChosenForm] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    console.log("Chosen Form updated:", chosenForm);
  }, [chosenForm]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duedate: "",
    tasks: [],
  });

  function handleChangeForm(e, id) {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  }

  function handleCreateClick() {
    setCreateModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setListForm((prevListForm) => [...prevListForm, form]);
    setForm((prevState) => ({
      ...prevState,
      title: "",
      description: "",
      duedate: "",
      tasks: [],
    }));
    setProjectsNames((prevState) => [...prevState, form.title]);
    setTimeout(() => {
      setCreateModal(true);
    }, 500);
  }

  function handleFilter(description, id) {
    console.log(listForm);
    let filteredList = listForm.filter((item, index) => id == index);
    setChosenForm(filteredList);
    setCreateModal(false);
    setIsClicked(true);
  }

  return (
    <>
      <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
      <div className="flex h-screen">
        <div className="flex-none w-64 h-full">
          <SideBar
            projectsNames={projectsNames}
            listForm={listForm}
            handleFilter={handleFilter}
            chosenForm={chosenForm}
            setChosenForm={setChosenForm}
            setCreateModal={setCreateModal}
            createModal={createModal}
          />
        </div>
        <div className="flex-1 w-96">
          <HomePage
            setProjectsNames={setProjectsNames}
            setCreateModal={setCreateModal}
            createModal={createModal}
            listForm={listForm}
            form={form}
            setForm={setForm}
            handleChangeForm={handleChangeForm}
            handleCreateClick={handleCreateClick}
            handleSubmit={handleSubmit}
            isClicked={isClicked}
            chosenForm={chosenForm}
            setChosenForm={setChosenForm}
            setListForm={setListForm}
          />
        </div>
      </div>
    </>
  );
}

export default App;
