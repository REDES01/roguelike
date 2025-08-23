from pydantic import BaseModel
from enum import Enum

class Consequence(str, Enum):
    NextLevel = "next"
    WinTheGame = "win"

class Monster(BaseModel):
    name:str
    health:int
    attack:int
    defense:int

class Reward(BaseModel):
    name:str
    health:int
    attack:int
    defense:int

class Choice(BaseModel):
    content:str
    monster:Monster|None
    reward:Reward
    consequence:Consequence|None

class MapNode(BaseModel):
    name:str
    positionx:int
    positiony:int
    content:str
    choices:list[Choice]

class Map(BaseModel):
    level:int
    nodes:list[MapNode]

class Maps(BaseModel):
    maps:list[Map]