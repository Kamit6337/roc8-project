"use client";
import handleAddingData from "~/handleAddingData";

const NewButton = () => {
  return (
    <button onClick={async () => await handleAddingData()}>Add Data</button>
  );
};

export default NewButton;
