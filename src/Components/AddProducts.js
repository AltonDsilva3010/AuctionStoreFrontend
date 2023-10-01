import React, { useState } from "react";
import "./AddProducts.css";

const AddProducts = ({ state }) => {
  const [formData, setFormData] = useState({
    prodname: "",
    proddescription: "",
    durationMin: 0,
  });

  const addProduct = async () => {
    console.log("inseid function 2");
    const { contract } = state;
    if (contract) {
      const result = await contract.createProduct(
        formData.prodname,
        formData.proddescription,
        formData.durationMin
      );
      console.log(result);
    }
  };

  const onChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the 'formData' state and perform further actions, e.g., sending it to a server
    try {
      addProduct();
    } catch (error) {
      console.log(error);
    }

    console.log("Hello WOrld");
    setFormData({
      prodname: "",
      proddescription: "",
      durationMin: 0,
    });
  };

  return (
    <div className="add-product">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="prodname">Name:</label>
          <input
            type="text"
            id="prodname"
            name="prodname"
            value={formData.prodname}
            onChange={(e) => onChange(e)}
          />
          <br />
          <label htmlFor="proddescription">Description:</label>
          <input
            type="text"
            id="proddescription"
            name="proddescription"
            value={formData.proddescription}
            onChange={(e) => onChange(e)}
          />
          <br />
          <label htmlFor="firstName">Duration:</label>
          <input
            type="number"
            placeholder="in Minutes"
            id="durationMin"
            name="durationMin"
            value={formData.durationMin}
            onChange={(e) => onChange(e)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
