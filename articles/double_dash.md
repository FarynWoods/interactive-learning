# Object Oriented Programming with MarioKart Items

In programming, there are many different ways to think about and solve a problem. Some approaches focus on steps and instructions (like a recipe), while others focus on the data being processed.

**Object-oriented programming (OOP)** is a way of organizing your code by thinking in terms of *things* in your program. These things are called **objects**.

An object represents something meaningful in the problem you’re solving. Objects have **attributes**, which describe what they are, and **behaviors**, which describe what they can do.

For example, we could model a candle as an object. A candle can be lit or unlit, and there are specific actions that change that state: you can light an unlit candle, or blow out a lit one.

A candle also has characteristics we might want to store, like its color and its height. The height changes over time, but only while the candle is lit - so knowing whether the candle is lit or unlit matters to how the candle behaves.

In object-oriented programming, we can represent all of this by grouping the candle’s data (its color, height, and whether it’s lit) together with the actions that affect it (lighting and blowing it out) into a single object.

Below, you can choose the color of the candle and press buttons to light it or blow it out. The height decreases while the candle is lit, but ... (TODO decide later about height slider)

- Interactive Example: Candle
    - Attributes: color, height, is_lit/unlit (internal state)
    - Methods: light_candle(), blow_out_candle()
    - you can only change the height while the candle is unlit

Now let's look at a more exciting example - MarioKart! MarioKart has a lot of different objects we could model, for example, the items. Some items you can throw at other cars so that, if you hit them, you can pass them while they spin out.

[luigi gif]

Some items, like Mushrooms, give you a speed boost. A Star gives you invincibility.

Different categories of items behave differently, but they also have some things in common.

Let's sort out things that *all* MarioKart items have in common compared to what might be specific attributes of certain kinds of items. (sort)

All items:
- have a name
- can be used

Specific to item type:
- is thrown
- affects kart speed
- grants invincibility

All items have a name and can be used, but different items behave differently when used. When you’re playing the game, you press the same button to use an item regardless of how that item works. The details of what happens when an item is used are specific to the item itself.

We can capture this idea in our code by defining what a generic `Item` is, and then letting specific items control how they behave when used. This lets the rest of the program treat all items the same: pick up an Item, then use it.

Let’s model a generic `Item` in pseudocode and in the programming language Python. In Python, an object is called a `class`, which defines the attributes and methods that objects of the class all have.

Interactive: The name "class" was chosen intentionally. In object-oriented programming, what might we mean when we say a "class"?
- School Course
- Category
- Stylish / Classy

A class represents a category of objects that share the same attributes and behaviors. Here, we're defining what's called a **base class**: a blueprint for other, more specific class types to follow. We'll see concretely how that works later.

For now, here's what an `Item` class might look like in simplified "pseudocode" and in actual Python code. Don’t worry about the exact syntax yet (things like `__init__` or `self`). For now, focus on how we're capturing *attributes* - what the object is - and *methods* - functions that show what the object can do.

(Buttons to show one, the other, or side-by-side)

```pseudocode
CLASS Item
    ATTRIBUTE name

    METHOD use()
        # Apply the item's effect
        # We'll let specific items implement their own method use()
```

```python
class Item:
    def __init__(self, name: str):
        self.name = name

    def use(self):
        """Apply the item's effect"""
        pass
```

Notice we don't specify any instructions for what a generic item does when we `use()` it. Different item categories in MarioKart work differently, so we'll create more specific types of items, following this base class's blueprint, and define what it means to use each of these specific items.

One of the most iconic items is the banana - roll over a banana and it'll cause your Kart to slip and spin out! When you use a banana, or any other projectile item like a shell, you can choose whether to throw it in front of or behind your kart. So when we `use()` this type of item, we need to know what direction it's being thrown in. `direction` can be a **parameter** that we pass to our method like: `use(direction)`. `direction` will either be "forward" or "backward".

```pseudocode
CLASS ProjectileItem EXTENDS Item

    METHOD use(direction)
        IF direction is "forward"
            # shoot the item in front of the kart
        IF direction is "backward"
            # shoot the item behind the kart
        ELSE
            ERROR
```

```python
class ProjectileItem(Item):
    """Items you throw forward or backward."""

    def use(self, direction):
        if direction == "forward":
            print(f"{self.name} is shot in front of the kart.")
        elif direction == "backward":
            print(f"{self.name} is shot behind the kart.")
        else:
            raise ValueError("direction must be 'forward' or 'backward'")
```

Note that `ProjectileItem` uses `self.name`, even though we never define `name` inside `ProjectileItem`. This works because `ProjectileItem` inherits from the base class `Item`, where we *did* define `name` as an attribute. Since every `Item` has a `name`, every `ProjectileItem` automatically has one too.

In other words, when a class extends another class, it automatically gets all of the *parent* class’s attributes and methods. This is called **inheritance** and is how we can define sub-categories of objects. A banana belongs to the broad category or class called `Item`, and its specific sub-category or sub-class is a `ProjectileItem`.

---

We’ve modeled the basics of what an item is and can do and how projectile items specifically work. Next, let’s look at how items interact with another object in the game - karts.

We already know how to model a simple object. Now we’ll challenge ourselves by modeling a `Kart`, which is a bit more complicated. In the full game, karts can accelerate, brake, and steer - but for now, we’ll focus only on how a kart is affected by items.

- Interactive: In MarioKart, what happens when you hit a banana?
(You gain a banana item, Your car spins out)

Hitting a banana doesn’t give you an item - it changes the state of your kart. The kart is now spun out, and that information needs to be remembered somewhere. We've seen this before, with our `Candle` object. The candle can be lit or unlit, and we can change its state by lighting it or blowing it out.

Keeping that in mind, let's figure out how we want to include spinning out in our `Kart` model.

- Interactive: How might we think about spinning out as a behavior? (A kart can spin out, so we might represent that with a method like `spin_out()`)

- Interactive: How might we think about spinning out as a state? (A kart can be spun out or not, so we might represent that with an attribute like `is_spun_out`)

- Interactive: So which do we need to model spinning out?
    - only a method
    - only an attribute
    - both

You could use either or both, but we're going to use a method to cause the spin-out, and an attribute to remember that it happened. Our `spin_out()` method will simply update our `is_spun_out` attribute to `True`, and we'll also have a `recover()` method that sets `is_spun_out` to `False`.

Here's our `Kart` model:

```pseudo
CLASS Kart
    ATTRIBUTE is_spun_out

    METHOD spin_out
        is_spun_out = True
    
    METHOD recover
        is_spun_out = False
```

```python
class Kart:

    def __init__(self):
        self.is_spun_out = False  # default to not spun out

    def spin_out(self):
        """The kart loses control."""
        self.is_spun_out = True

    def recover(self):
        """The kart regains control."""
        self.is_spun_out = False
```

We now have a basic model for a kart! But a car that can only spin out isn't so interesting. Let's also allow our car to become invincible.

In MarioKart, the Star item makes you invincible to all items. (It also triggers some triumphant music - another thing we could model but we'll leave that for another time!) Using a star affects your kart, so how will we reflect that?

Let's start by updating `Kart` - it now needs to be able to become invincible and keep track of whether it is currently invincible or not. Let's model it the same way we did spinning out - we have methods for becoming invincible and losing invincibility, and the state of being invincible or not is captured in an attribute.

```pseudo
CLASS Kart
    ATTRIBUTE is_spun_out
    ATTRIBUTE is_invincible

    METHOD spin_out
        is_spun_out = True
    
    METHOD recover
        is_spun_out = False

    METHOD become_invincible
        is_invincible = True
    
    METHOD lose_invincibility
        is_invincible = False
```

```python
class Kart:

    def __init__(self):
        self.is_spun_out = False  # default to not spun out
        self.is_invincible = False  # default to not invincible

    def spin_out(self):
        self.is_spun_out = True

    def recover(self):
        self.is_spun_out = False
    
    def become_invincible(self):
        self.is_invincible = True
    
    def lose_invincibility(self):
        self.is_invincible = False
```

Looks good! Now how do we model a Star?

- Interactive: What do we need to represent the Star object? (A new class that inherits from Item)

- Interactive: What do you think we should name it? (Star, InvincibilityItem)

One of the nice things about object-oriented programming is that we can define generic functionality and re-use it later. For example, a star isn't the only item that grants invincibility in the game. Other items, like the Bullet Bill or the Ghost, might want to use some of the functionality we built for invincibility. But you can defend either choice here - being specific or generic. For now, let's keep it generic!

Following our `Item` blueprint, we need to define `InvincibilityItem`'s specific `use()` method. Recall that for a `ProjectileItem`, we need to know whether to throw it forward or backward so we give `use()` that direction. An `InvincibilityItem` is used on `Kart` object, and we need to be able to give `use()` a `Kart`.

- Interactive: Which of these is the `use()` function we want?

METHOD use(kart)
    kart.become_invincible()

Feedback: Exactly! `use()` affects the given kart by triggering it to `become_invincible()`.

METHOD use()
    kart.become_invincible()

METHOD use()
    become_invincible()

---

Here's what we have:

```pseudocode
CLASS InvincibilityItem EXTENDS Item

    METHOD use(Kart)
        Kart.become_invincible()
```

```python
class InvincibilityItem(Item):
    """Items you use on your kart to grant invincibility."""

    def use(self, kart):
        kart.become_invincible()
```

### For advanced students

Alternatively, we could have the Star item set `kart.is_invincible = True`. That works with what we have so far. But in the game, if you go off the track, you *can't* activate a star while you're falling. The InvincibilityItem shouldn't need to know whether you're actively falling or not - that's something your kart knows. So, it's preferable here to have Items ask the Kart to change (by calling its `become_invincible` method), and the kart updates itself, depending on what states it's in.

Here's how we can model Kart to take into account `is_falling` when an Item triggers the Kart the `become_invincible`.

```pseudo
CLASS Kart
    ATTRIBUTE is_invincible
    ATTRIBUTE is_falling

    METHOD become_invincible
        IF NOT is_falling
            is_invincible = True
        ELSE
            DELAY 1 second
            become_invincible()
```

```python
class Kart:

    def __init__(self):
        self.is_spun_out = False
        self.is_invincible = False

    def spin_out(self):
        self.is_spun_out = True

    def recover(self):
        self.is_spun_out = False
    
    def become_invincible(self):
        if not is_falling:
            self.is_invincible = True
        else:
            time.sleep(1)
            self.become_invincible()
    
    def lose_invincibility(self):
        self.is_invincible = False
```

Notice how in the ELSE block, we wait a second and then call `become_invincible()` again.

- Interactive: We've waited a second and then we call become_invincible again. What might be different now?
    - is_falling might be False now, so we can set is_invincible to True and move on.
    - is_falling might still be True, so we wait another second and check again
    - Either!

This is called **recursion**! Recursion is a general computer science concept and not specific to Object-Oriented Programming - so we'll dive into it in more detail in a later lesson. 

For now, just take an extra second to trace through what's happening and try to wrap your head around it. As long as is_falling is set to True, we keep waiting a second and calling the function again to check the status of is_falling. is_falling eventually gets set to False, so we change is_invincible to True and exit the function.

Cue star music!

---

With that, we've finished adding the Star item to our game. Let's review what we've built. We have two broad categories of objects implemented - `Item` and `Kart`:

### Item

```pseudocode
CLASS Item
    ATTRIBUTE name

    METHOD use()
        # Apply the item's effect
        # We'll let specific items implement their own method use()
```

```python
class Item:
    def __init__(self, name: str):
        self.name = name

    def use(self):
        """Apply the item's effect"""
        raise NotImplementedError
```

### Kart

```pseudo
CLASS Kart
    ATTRIBUTE is_spun_out
    ATTRIBUTE is_invincible

    METHOD spin_out
        is_spun_out = True
    
    METHOD recover
        is_spun_out = False

    METHOD become_invincible
        is_invincible = True
    
    METHOD lose_invincibility
        is_invincible = False
```

```python
class Kart:

    def __init__(self):
        self.is_spun_out = False
        self.is_invincible = False

    def spin_out(self):
        self.is_spun_out = True

    def recover(self):
        self.is_spun_out = False
    
    def become_invincible(self):
        self.is_invincible = True
    
    def lose_invincibility(self):
        self.is_invincible = False
```

And we have two more specific types of `Item`: `ProjectileItem` and `InvincibilityItem`.

### ProjectileItem

```pseudocode
CLASS ProjectileItem EXTENDS Item

    METHOD use(direction)
        IF direction is "forward"
            # shoot the item in front of the kart
        IF direction is "backward"
            # shoot the item behind the kart
        ELSE
            ERROR
```

```python
class ProjectileItem(Item):
    """Items you throw forward or backward."""

    def use(self, direction):
        if direction == "forward":
            print(f"{self.name} is shot in front of the kart.")
        elif direction == "backward":
            print(f"{self.name} is shot behind the kart.")
        else:
            raise ValueError("direction must be 'forward' or 'backward'")
```

### InvincibilityItem

```pseudocode
CLASS InvincibilityItem EXTENDS Item

    METHOD use(Kart)
        Kart.become_invincible()
```

```python
class InvincibilityItem(Item):
    """Items you use on your kart to grant invincibility."""

    def use(self, kart):
        kart.become_invincible()
```

## Putting it together
Finally, let's actually test out some of the things we've built! First, we'll need to create a `Kart`. Let's go ahead and do this in Python - can you guess how we set it up?

- Interactive: How do we create a `Kart` object? `my_kart = Kart()`

That's it! We don't have anything customizable about the Kart, but that's something you could add.

Let's see what current state `my_kart` is in. Press Play to run the code:

```python
print("Kart is spun out: ", my_kart.is_spun_out)
print("Kart is invincible: ", my_kart.is_invincible)
```

Perfect, our `Kart` was setup with the defaults - neither spun out nor invincible. Now lets try throwing a banana.

```python
banana_item = ProjectileItem("Banana")
banana_item.use("backward")
```
"Banana is shot behind the kart."

Finally, let's use a star!

```python
star_item = InvincibilityItem("Star")
star_item.use(my_kart)

if my_kart.is_invincible:
    print("I'm invincible!")
else:
    print("I'm not invincible :(")
```
"I'm invincible!"

### Wrapping up
In this lesson, we learned the basics of object-oriented programming. We:
- created objects with attributes (state) and methods (behavior)
- created base classes that define shared structure and behavior for related objects
- showed how objects can interact by calling each other’s methods

Great work!

Our toy MarioKart code is still a long way from the full game, but hopefully you can see how we might keep tinkering away to include more and more of the game's features. From here, there are lots of directions you could explore:

- create a `Character` class, where each character has a special item that only *they* can get
- add stats to `Kart`s like top speed, acceleration, or recovery time
- introduce more `Item`s that all share the same `use()` interface but behave differently

Thanks for building this with me and I'll see you on the course!

