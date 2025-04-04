import React, { useRef, useState } from "react";
import { data } from "../constants/constant";

const Sidebar = () => {
  const [itemList, setItemList] = useState(data);
  const dragItem = useRef(null);
  const dragContainer = useRef(null);

  const handleDragStart = (e, child, containerId) => {
    dragItem.current = child;
    dragContainer.current = containerId;
    e.target.style.opacity = "0.5";
    console.log(containerId)
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetContainerId) => {
    e.preventDefault();
    const item = dragItem.current;
    const sourceContainerId = dragContainer.current;

    if (!item || sourceContainerId === targetContainerId) return;

    // we have spread the prev(data) 
    setItemList((prev) => {
      const newData = prev.map((container) => ({
        ...container,
        child: [...container.child],
      }));

      // Here we are just checking is sourceContainer and targetContainer
      const sourceContainer = newData.find((c) => c.id === sourceContainerId);
      const targetContainer = newData.find((c) => c.id === targetContainerId);
      console.log(sourceContainer, targetContainer)

      if (!sourceContainer || !targetContainer) return prev;

      sourceContainer.child = sourceContainer.child.filter((i) => i.id !== item.id);
      targetContainer.child.push(item);

      return newData;
    });

    dragItem.current = null;
    dragContainer.current = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ width: "300px", padding: "15px", background: "#f8f9fa", borderRadius: "10px" }}>
      <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
        Sidebar Menu
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {itemList.map((container) => (
          <div
            key={container.id}
            style={{
              background: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              minHeight: "100px",
              transition: "background 0.3s ease",
            }}
            onDrop={(e) => handleDrop(e, container.id)}
            onDragOver={handleDragOver}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px", color: "#444" }}>
              {container.name}
            </h3>
            {container.child.map((child) => (
              <div
                key={child.id}
                style={{
                  background: "#4a90e2",
                  color: "white",
                  padding: "8px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  cursor: "grab",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, child, container.id)}
                onDragEnd={handleDragEnd}
              >
                {child.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
