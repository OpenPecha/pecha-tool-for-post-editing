import React from "react";
import Button from "../Button";

function ActionButtons() {
  return (
    <div className="btn-container">
      <Button
        // disabled={isButtonDisabled}
        // handleClick={saveText}
        value="CONFIRM"
        title="CONFIRM (a)"
        shortCut="a"
      />
      <Button
        // disabled={isButtonDisabled}
        // handleClick={rejectTask}
        value="REJECT"
        title="REJECT (x)"
        shortCut="x"
      />
      <Button
        // disabled={isButtonDisabled}
        // handleClick={ignoreTask}
        value="IGNORE"
        title="IGNORE (i)"
        shortCut="i"
      />
      <Button
        // disabled={isButtonDisabled}
        // handleClick={undoTask}
        value="UNDO"
        title="UNDO (backspace)"
        shortCut="Backspace"
      />
    </div>
  );
}

export default ActionButtons;
