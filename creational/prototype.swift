// Prototype Design Pattern
// https://medium.com/dev-genius/creational-pattern-series-prototype-aae9c50d553d
// ------------------------------------------------------

// The Prototype pattern is a creational design pattern that
// allows you to create new objects by cloning an existing
// object. This is useful when you want to create a new
// object that is similar to an existing object, but you
// don't want to go through the trouble of creating a new
// object from scratch.


// The Prototype pattern delegates the cloning process
// to the actual objects that are being cloned. 

// Problem:
// Suppose you are creating a game that involves
// creating different types of monsters with different
// abilities. Instead of creating each monster from scratch
// every time, you can use the Prototype pattern to clone
// an existing monster and modify its attributes to create
// a new one.



// The prototype protocol defines the clone method that will return a copy of the prototype
protocol Monster {
    func clone() -> Monster
}

// The concrete prototype class that implements the clone method
class Orc: Monster {
    var name: String
    var health: Int
    var strength: Int
    
    init(name: String, health: Int, strength: Int) {
        self.name = name
        self.health = health
        self.strength = strength
    }
    
    // The clone method creates a copy of the current object
    func clone() -> Monster {
        return Orc(name: self.name, health: self.health, strength: self.strength)
    }
}

// The client code that uses the prototype to create new monsters
class MonsterSpawner {
    private var prototypes: [String: Monster] = [:]
    
    init() {
        // Store the prototypes in a dictionary for easy access
        prototypes["orc"] = Orc(name: "Orc", health: 50, strength: 10)
    }
    
    func spawnMonster(type: String, name: String) -> Monster? {
        // Look up the prototype and clone it to create a new object
        guard let prototype = prototypes[type] else {
            return nil
        }
        let monster = prototype.clone()
        monster.name = name
        return monster
    }
}


let spawner = MonsterSpawner()
let orc1 = spawner.spawnMonster(type: "orc", name: "Gronk")
let orc2 = spawner.spawnMonster(type: "orc", name: "Krogg")

print(orc1?.name)
print(orc2?.name) 

// Another Implementation: 



// NSCopying is a protocol that defines the copy method.
// The copy method returns a copy of the object.
// The copy method is used to create a new object that is
// a copy of the current object.
class NPC: NSCopying {
    var name: String
    var type: String
    var level: Int
    
    init(name: String, type: String, level: Int) {
        self.name = name
        self.type = type
        self.level = level
    }
    
    // NSZone is a class that represents a memory zone. It is
    // used to allocate memory for objects. The default zone
    // is the default zone for the current thread.
    func copy(with zone: NSZone? = nil) -> Any {
        let copy = type(of: self).init(name: name, type: type, level: level)
        return copy
    }
}

class Human: NPC {
    var race: String
    
    init(name: String, type: String, level: Int, race: String) {
        self.race = race
        super.init(name: name, type: type, level: level)
    }
    
    override func copy(with zone: NSZone? = nil) -> Any {
        let copy = super.copy(with: zone) as! Human
        copy.race = race
        return copy
    }
}

class Elf: NPC {
    var magicType: String
    
    init(name: String, type: String, level: Int, magicType: String) {
        self.magicType = magicType
        super.init(name: name, type: type, level: level)
    }
    
    override func copy(with zone: NSZone? = nil) -> Any {
        let copy = super.copy(with: zone) as! Elf
        copy.magicType = magicType
        return copy
    }
}

class NPCSpawner {
    var npc: NPC
    
    init(npc: NPC) {
        self.npc = npc
    }
    
    func spawnNPC() -> NPC {
        return npc.copy() as! NPC
    }
}

let human = Human(name: "Bilal", type: "Warrior", level: 10, race: "Human")
let elf = Elf(name: "Osama", type: "Mage", level: 5, magicType: "Fire")

let humanSpawner = NPCSpawner(npc: human)
let elfSpawner = NPCSpawner(npc: elf)

let newHuman = humanSpawner.spawnNPC() as! Human
let newElf = elfSpawner.spawnNPC() as! Elf
