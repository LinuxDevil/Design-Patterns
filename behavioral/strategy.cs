// Startegy Design Pattern
// -----------------------

// The Strategy Design Pattern defines a family of algorithms,
// encapsulates each one, and makes them interchangeable. Strategy
// lets the algorithm vary independently from clients that use it.


// Problem:
// -----------------------

// Imagine that you are creating a game where the player can
// choose one of the three characters: a knight, a troll, or a
// wizard. Each character has a different set of skills and
// abilities. For example, the knight can use a sword and a
// shield, the troll can use a club, and the wizard can use a
// staff. The knight can also use a bow and arrow, but the troll
// and the wizard can't. The knight can also use magic, but the
// troll and the wizard can't. The troll can also use a sword,
// but the knight and the wizard can't. The wizard can also use
// a sword and a shield, but the knight and the troll can't.

using System;

// Define the weapon interface
interface IWeapon
{
    string GetName();
}

// Implement the sword weapon
class Sword : IWeapon
{
    public string GetName()
    {
        return "sword";
    }
}

// Implement the club weapon
class Club : IWeapon
{
    public string GetName()
    {
        return "club";
    }
}

// Implement the spell weapon
class Spell : IWeapon
{
    public string GetName()
    {
        return "spell";
    }
}

// Define the player class
class Player
{
    private readonly IWeapon _weapon;
    private readonly IPlayerStrategy _strategy;

    public Player(IPlayerStrategy strategy, IWeapon weapon)
    {
        _strategy = strategy;
        _weapon = weapon;
    }

    public void Attack()
    {
        _strategy.Attack(_weapon);
    }
}

// Define the strategy interface
interface IPlayerStrategy
{
    void Attack(IWeapon weapon);
}

// Implement the knight strategy
class KnightStrategy : IPlayerStrategy
{
    public void Attack(IWeapon weapon)
    {
        if (weapon.GetName() != "sword")
        {
            throw new ArgumentException($"Invalid weapon for knight: {weapon.GetName()}");
        }

        Console.WriteLine("Knight attacks with sword.");
    }
}

// Implement the troll strategy
class TrollStrategy : IPlayerStrategy
{
    public void Attack(IWeapon weapon)
    {
        if (weapon.GetName() != "club")
        {
            throw new ArgumentException($"Invalid weapon for troll: {weapon.GetName()}");
        }

        Console.WriteLine("Troll attacks with club.");
    }
}

// Implement the wizard strategy
class WizardStrategy : IPlayerStrategy
{
    public void Attack(IWeapon weapon)
    {
        if (weapon.GetName() != "spell")
        {
            throw new ArgumentException($"Invalid weapon for wizard: {weapon.GetName()}");
        }

        Console.WriteLine("Wizard attacks with spell.");
    }
}

// Usage
class Program
{
    static void Main(string[] args)
    {
        Player player = new Player(new KnightStrategy(), new Sword());
        player.Attack();  // Output: Knight attacks with sword.

        player = new Player(new TrollStrategy(), new Club());
        player.Attack();  // Output: Troll attacks with club.

        player = new Player(new WizardStrategy(), new Spell());
        player.Attack();  // Output: Wizard attacks with spell.
    }
}
