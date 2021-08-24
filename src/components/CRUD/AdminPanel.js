import React from "react";
import Add from "./Add";
import CustomTable from "./CustomTable";

const AdminPanel = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Добавить товар</h1>
      </div>
      <Add />
      <CustomTable />
    </div>
  );
};

export default AdminPanel;
