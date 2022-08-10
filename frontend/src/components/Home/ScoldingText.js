import React from "react";

const ScoldingText = ({ searched, items, searchstring }) => {
  if (searched == true && items.length == 0) {
    return (
      <div id="empty">
        No Items found for <b>boring {searchstring} </b>{" "}
      </div>
    );
  } else {
    return "";
  }
};

export default ScoldingText;
