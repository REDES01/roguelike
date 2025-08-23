import os
import json
from openai import OpenAI
from pydantic import BaseModel


class MapNode(BaseModel):
    positionx:int
    positiony:int
    content:str
    choices:list[str]

class Map(BaseModel):
    Nodes:list[MapNode]

def main():
    OPENAI_API_KEY=os.environ["OPENAI_API_KEY"]
    
    client=OpenAI(api_key=OPENAI_API_KEY)
    completion=client.chat.completions.parse(
        model="gpt-5",
        reasoning_effort="low",
        messages=[
            {"role":"developer", "content":"create a 2d 3x3 adventure map with the user's theme."
            "These spots are first hidden and when they reaveal a event will happen described in content"
            "including the event description and info of current spot's adjacent spot."
            "User is ask to make a choice in 3 differnt interesting options."
            "Try to as simple as possible"
            },
            {"role":"user", "content":"pirate"}
        ],
        response_format=Map
    )

    nodes=completion.choices[0].message.parsed.Nodes
    
    for n in nodes:
        print(f"({n.positionx},{n.positiony}) -> {n.content[:60]}... | options={len(n.choices)}")


    data=[n.model_dump() for n in nodes]
    with open("template.json","w") as file:
        json.dump(data,file,ensure_ascii=False,indent=4)


if __name__ == "__main__":
    main()
