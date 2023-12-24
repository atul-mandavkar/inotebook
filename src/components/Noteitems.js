import React from "react";

function Noteitems(props) {
  const { note } = props; // destructure note from props send by Note component
  return (
    <div className="col-md-3 my-3"> {/* code of card is copied from bootstrap and removed unneccessarty part also set outer of card in column class */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitems;
