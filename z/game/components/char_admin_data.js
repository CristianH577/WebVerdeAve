const constantin = {
    "id": 1,
    "name": "constantin admin",
    "clase": "warrior",
    "stats": {
        "damage": 99,
        "defence": 3,
        "hp": 4,
        "hp_max": 4
    },
    "xp": 0,
    "level": 1,
    "inventory": {
        1: {
            "id": 1,
            "name": "life potion",
            "kind": "consumable",
            "effect": [
                "hp",
                1
            ],
            "desc": "hp potion",
            "quantity": 2
        },
        3: {
            "id": 3,
            "name": "long sword",
            "kind": "weapon",
            "effect": [
                "damage",
                1
            ],
            "desc": "biggest sword",
            "quantity": 1
        },
        5: {
            "id": 5,
            "name": "leather armor",
            "kind": "armor",
            "effect": [],
            "desc": "common armor",
            "quantity": 1
        }
    },
    "map": {
        "a": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "wall"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "wall"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "wall"
            },
            "9": {
                "kind": "wall"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "wall"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "wall"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "wall"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "wall"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "wall"
            },
            "21": {
                "kind": "wall"
            }
        },
        "b": {
            1: {
                "kind": "empty"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "empty"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "lever"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "empty"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "empty"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "empty"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "chest"
            },
            "21": {
                "kind": "wall"
            }
        },
        "c": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "unlock",
                    "side": "s"
                }
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "wall"
            },
            "9": {
                "kind": "wall"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "wall"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "wall"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "d": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "mob",
                "mob": {
                    "kind": "goblin"
                }
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "chest"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "empty"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "chest"
            },
            "21": {
                "kind": "wall"
            }
        },
        "e": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "wall"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "wall"
            },
            "21": {
                "kind": "wall"
            }
        },
        "f": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "empty"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "mob",
                "mob": {
                    "kind": "orc"
                }
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "empty"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "g": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "wall"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "unlock",
                    "side": "e"
                }
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "wall"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "wall"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "h": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "empty"
            },
            6: {
                "kind": "chest"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "lock",
                    "side": "b"
                }
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "empty"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "empty"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "i": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "wall"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "wall"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "empty"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "j": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "empty"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "empty"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "mob",
                "mob": {
                    "kind": "orc"
                }
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "k": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "unlock",
                    "side": "s"
                }
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "wall"
            },
            "9": {
                "kind": "wall"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "empty"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "l": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "mob",
                "mob": {
                    "kind": "goblin"
                }
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "chest"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "chest"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "m": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "wall"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "wall"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "n": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "chest"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "mob",
                "mob": {
                    "kind": "orc"
                }
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "empty"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "empty"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "empty"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "o": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "wall"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "wall"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "wall"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "unlock",
                    "side": "s"
                }
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "wall"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "p": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "empty"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "empty"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "lock",
                    "side": "b"
                }
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "empty"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "mob",
                "mob": {
                    "kind": "goblin"
                }
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "q": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "wall"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "wall"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "unlock",
                    "side": "s"
                }
            },
            "9": {
                "kind": "wall"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "wall"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "empty"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "wall"
            },
            "21": {
                "kind": "wall"
            }
        },
        "r": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "empty"
            },
            6: {
                "kind": "empty"
            },
            7: {
                "kind": "empty"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "empty"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "chest"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "s": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "empty"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "wall"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "wall"
            },
            "9": {
                "kind": "wall"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "wall"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "chest"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "t": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "mob",
                "mob": {
                    "kind": "orc"
                }
            },
            3: {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "lock",
                    "side": "t"
                }
            },
            4: {
                "kind": "empty"
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "chest"
            },
            7: {
                "kind": "empty"
            },
            8: {
                "kind": "empty"
            },
            "9": {
                "kind": "empty"
            },
            "10": {
                "kind": "empty"
            },
            "11": {
                "kind": "empty"
            },
            "12": {
                "kind": "empty"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "empty"
            },
            "15": {
                "kind": "empty"
            },
            "16": {
                "kind": "mob",
                "mob": {
                    "kind": "goblin"
                }
            },
            "17": {
                "kind": "empty"
            },
            "18": {
                "kind": "empty"
            },
            "19": {
                "kind": "empty"
            },
            "20": {
                "kind": "empty"
            },
            "21": {
                "kind": "wall"
            }
        },
        "u": {
            1: {
                "kind": "wall"
            },
            2: {
                "kind": "wall"
            },
            3: {
                "kind": "wall"
            },
            4: {
                "kind": "door",
                "door": {
                    "status": 0,
                    "kind": "end",
                    "side": "s"
                }
            },
            5: {
                "kind": "wall"
            },
            6: {
                "kind": "wall"
            },
            7: {
                "kind": "wall"
            },
            8: {
                "kind": "wall"
            },
            "9": {
                "kind": "wall"
            },
            "10": {
                "kind": "wall"
            },
            "11": {
                "kind": "wall"
            },
            "12": {
                "kind": "wall"
            },
            "13": {
                "kind": "wall"
            },
            "14": {
                "kind": "wall"
            },
            "15": {
                "kind": "wall"
            },
            "16": {
                "kind": "wall"
            },
            "17": {
                "kind": "wall"
            },
            "18": {
                "kind": "wall"
            },
            "19": {
                "kind": "wall"
            },
            "20": {
                "kind": "wall"
            },
            "21": {
                "kind": "wall"
            }
        }
    },
    "effects": {
        "iluminate": 1
    },
    "currentLoc": [
        "b",
        1
    ],
    "mob": false
}

export default constantin;