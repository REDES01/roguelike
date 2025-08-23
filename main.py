import os
import json
from openai import OpenAI
from models import Maps




def main():
    OPENAI_API_KEY=os.environ["OPENAI_API_KEY"]
    
    client=OpenAI(api_key=OPENAI_API_KEY)
    completion=client.chat.completions.parse(
        model="gpt-5",
        reasoning_effort="low",
        messages=[
            {"role":"developer", "content":"Create a 2d 3x3 adventure map with the user's theme."
            "The maps should have 3 levels, start at 0"
            "Position x and y both start at 0."
            "Every spot has a unique name."
            "Player can only move either horizontally or vertically. "
            "Player can't go to a visited spot."
            "A event described in content will happen when player go to a spot."
            "User is ask to make a choice in 3 differnt interesting options."
            "User can only choose once among the three choices."
            "With every option comes with a monster and/or a reward."
            "Player and Monster has three stats, health, attack and defense."
            "The way the battle works is player and the monster will attack eath other in turns."
            "Player will attack first."
            "Defender lose the amount of damage equals attacker's attack minus defender's defense."
            "When the monster's health reduces down to zero, the player wins the battle."
            "Otherwise when player's health drops to zero, the player lose the game."
            "Each reward should increase player's stats."
            "Player start with 10 health and 1 attack and 0 defense."
            "Try to make the game both not too challenging but not way too easy."
            "There should be a final boss at (2,2) at each level."
            "At first two levels, the consequence at (2,2) is next."
            "At the final level, the consequence at (2,2) is win."
            "Other places' consequences should be null"
            "Try to describe everything as simple as possible"
            },
            {"role":"user", "content":"pirate"}
        ],
        response_format=Maps
    )

    maps=completion.choices[0].message.parsed.maps
    
    # for n in nodes:
    #     print(f"({n.positionx},{n.positiony}) -> {n.content[:60]}... | options={len(n.choices)}")


    data=[n.model_dump() for n in maps]
    with open("template.json","w") as file:
        json.dump(data,file,ensure_ascii=False,indent=4)


if __name__ == "__main__":
    main()
