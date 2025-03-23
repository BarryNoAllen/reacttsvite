import React, { useState } from "react";
import { Popover } from "antd";

const items = ["Item 1", "Item 2", "Item 3"];

const MyList = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={handleClick}
          style={{ height: 40, marginBottom: 10 }}
        >
          {item}
        </div>
      ))}
      <Popover
        content={<div>这里是Popover内容</div>}
        open={open}
        getPopupContainer={() => anchorEl || document.body}
        onOpenChange={handleClose}
      >
        <span style={{ display: "none" }}></span>
      </Popover>
    </div>
  );
};

export default MyList;
