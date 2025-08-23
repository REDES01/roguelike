import { useEffect, useState } from "react";
import data from "../../../template.json";

interface Node {
  content: string;
}
interface Entity {
  name: string;
  health: number;
  attack: number;
  defense: number;
}
type Vec2 = { x: number; y: number };

function Adventure() {
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);

  const [canMove, setCanMove] = useState<boolean>(false);
  const [disableChoices, setDisableChoices] = useState<boolean>(false);
  const [visited, setVisited] = useState<Vec2[]>([{ x: 0, y: 0 }]);

  const [story, setStory] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);

  const [level, setLevel] = useState<number>(0);

  const [player] = useState<Entity>({
    name: "player",
    health: 10,
    attack: 1,
    defense: 0,
  });

  useEffect(() => {
    setStory(data[level].nodes[posX + posY * 3].content);
  }, [posX, posY]);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const addLogs = async (message: string) => {
    setLogs((prev) => [...prev, message]);
    await sleep(400);
  };

  // change current position, set x, y, canMove
  const onChangePos = (nextPosX: number, nextPosY: number) => {
    if (!canMove) {
      addLogs("you can't move until you make a choice");
      return;
    }
    if (
      visited.filter((pos) => pos.x === nextPosX && pos.y === nextPosY)
        .length != 0
    ) {
      console.log(
        visited.filter((pos) => pos.x === nextPosX && pos.y === nextPosY)
      );
      addLogs("you can't visit the spot you have visited");
      return;
    }
    if (Math.abs(nextPosX - posX) <= 1 && Math.abs(nextPosY - posY) <= 1) {
      if (!(Math.abs(nextPosX - posX) == 1 && Math.abs(nextPosY - posY) == 1)) {
        setPosX(nextPosX);
        setPosY(nextPosY);
        setCanMove(false);
        setDisableChoices(false);
        setVisited([...visited, { x: nextPosX, y: nextPosY }]);
        return;
      }
    }

    console.log("you can only move to adjacent pos");
  };

  const battle = async (monster: Entity) => {
    // you can take item if draw
    if (monster.attack == player.defense && player.attack == monster.defense) {
      return;
    }
    // battle until one side is dead
    while (monster.health > 0 && player.health > 0) {
      let damage = player.attack - monster.defense;
      if (damage > 0) monster.health -= damage;

      await addLogs(
        `player attacks ${monster.name}, dealing ${
          damage > 0 ? `${damage}` : "0"
        } damage`
      );

      if (monster.health <= 0) {
        await addLogs(`${monster.name} is dead`);
        break;
      }
      damage=monster.attack - player.defense
      if (damage > 0) player.health -= damage;
      await addLogs(
        `${monster.name} attacks player, dealing ${
          damage > 0 ? `${damage}` : "0"
        } damage`
      );
    }
  };
  const handleChoice = async (
    monster: Entity | null,
    reward: Entity,
    consequence: string | null
  ) => {
    setDisableChoices(true);
    // battle here
    if (monster != null) {
      await battle(monster);
    }

    if (player.health <= 0) {
      await addLogs(`you are dead killed by ${monster?.name}`);
    } else {
      // give reward here
      player.attack += reward.attack;
      player.defense += reward.defense;
      player.health += reward.health;
      addLogs(`you get ${reward.name}.`);
      await addLogs(`
  ${reward.health !== 0 ? `health + ${reward.health}. ` : ""}
  ${reward.attack !== 0 ? `attack + ${reward.attack}. ` : ""}
  ${reward.defense !== 0 ? `defense + ${reward.defense}. ` : ""}
`);

      setCanMove(true);
      console.log(consequence);
      if (consequence === "win") {
        addLogs(`you win.`);
        setCanMove(false);
      }
      if (consequence === "next") {
        addLogs(`you go to the next level`);
        setCanMove(false);
        setDisableChoices(false);
        setLevel(level + 1);
        setPosX(0);
        setPosY(0);
        setVisited([]);
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5%",
          margin: "0",
          width: "100%",
        }}
      >
        <div className="button-container">
          {data[level].nodes.map((node: any) => (
            <button
              className="adventure-button"
              style={{
                outline:
                  posX == node.positionx && posY == node.positiony
                    ? "4px auto -webkit-focus-ring-color"
                    : "none",
              }}
              onClick={() => onChangePos(node.positionx, node.positiony)}
            >
              {node.name}
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
          <p>
            position: x: {posX} y: {posY} <br />
            health: {player.health} <br />
            attack: {player.attack} <br />
            defence: {player.defense} <br />
            canMove: {canMove ? "Ture" : "False"} <br />
          </p>
        </div>
        <div style={{ textAlign: "left", width: "auto" }}>
          <p>
            logs:
            <br />
            {logs.map((log, index) => (
              <>
                {index >= logs.length - 5 && (
                  <>
                    {log}
                    <br />
                  </>
                )}
              </>
            ))}
          </p>
        </div>
      </div>

      <div>
        {/* the context content */}
        <p style={{ marginTop: "20px" }}>{story}</p>
      </div>

      <div className="choice-container">
        {data[level].nodes
          .filter(
            (pos: any) => pos.positionx == posX && pos.positiony == posY
          )[0]
          .choices.map((choice: any) => (
            <button
              className="choice-button"
              onClick={() =>
                handleChoice(choice.monster, choice.reward, choice.consequence)
              }
              disabled={disableChoices}
            >
              {choice.content}
            </button>
          ))}
      </div>
    </>
  );
}

export default Adventure;
