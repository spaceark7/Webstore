import React from "react";

const AddToCart = ({ match }) => {
  return (
    <div>
      {match.params.id ? `this page come from ${match.params.id}` : "Cart Page"}
      {console.log("props match:", match)}
    </div>
  );
};

export default AddToCart;
