import { useState } from "react";
import data from "../../../template.json";

interface Node {
  content: string;
}

function Adventure() {
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [health, setHealth] = useState<number>(10);
  const [canMove, setCanMove] = useState<boolean>(true);
  const [inventory, setInventory] = useState<string[]>([]);

  const onChangePos = (nextPosX: number, nextPosY: number) => {
    if (!canMove) return;
    if (Math.abs(nextPosX - posX) <= 1 && Math.abs(nextPosY - posY) <= 1) {
      if (!(Math.abs(nextPosX - posX) == 1 && Math.abs(nextPosY - posY) == 1)) {
        setPosX(nextPosX);
        setPosY(nextPosY);
        setCanMove(false);
        return;
      }
    }

    console.log("you can only move to adjacent pos");
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "10%" }}>
        <div className="button-container">
          {data.map((node) => (
            <button
              style={{
                outline:
                  posX == node.positionx && posY == node.positiony
                    ? "4px auto -webkit-focus-ring-color"
                    : "none",
              }}
              onClick={() => onChangePos(node.positionx, node.positiony)}
            >
              {node.content}
            </button>
          ))}
        </div>
        <div
          style={{
            textAlign: "left",
            overflowWrap: "break-word",
            maxWidth: "400px",
          }}
        >
          position: x: {posX} y: {posY} <br />
          health: {health} <br />
          canMove: {canMove ? "Ture" : "False"} <br />
          inventory: {inventory.map((item) => item)} <br />
        </div>
      </div>

      <div>
        <p>{data[posX + posY * 3].content}</p>
      </div>
      <div>
        {data[posX + posY * 3].choices.map((choice) => (
          <p>{choice}</p>
        ))}
      </div>
    </>
  );
}

export default Adventure;
