"use client";
import handleAddingData from "~/actions/handleAddingData";

const AddDataButton = () => {
  return (
    <button onClick={async () => await handleAddingData()}>Add Data</button>
  );
};

export default AddDataButton;
