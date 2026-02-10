---
layout: default
title: Object Oriented Programming with MarioKart
---

# Object-Oriented Programming with MarioKart

**Audience**: highschool age or adults newer to programming and code. Suitable for beginners.

*Not compatible with mobile. Some interactive widgets may not work properly on a phone or tablet.*

In programming, there are many different ways to think about and solve a problem. Some approaches focus on steps and instructions (like a recipe), while others focus on the data being processed.

**Object-oriented programming (OOP)** is a way of organizing your code by thinking in terms of *things* in your program. These things are called **objects**.

An object represents something meaningful in the problem you’re solving. Objects have **attributes**, which describe what they are, and **behaviors**, which describe what they can do.

For example, we could model a candle as an object. A candle can be lit or unlit, and there are specific actions that change that state: you can light an unlit candle, or blow out a lit one.

A candle also has characteristics we might want to store, like its color and its height. The height changes over time, but only while the candle is lit - so knowing whether the candle is lit or unlit matters to how the candle behaves.

In object-oriented programming, we can represent all of this by grouping the candle’s data (its color, height, and whether it’s lit) together with the actions that affect it (lighting and blowing it out) into a single object.

Below, you can choose the color of the candle and press buttons to light it or blow it out. The height decreases while the candle is lit, but you can make it taller again by dragging the slider up when the candle is unlit.

<div id="candle"></div>
<script type="module" src="../assets/Candle.js"></script>
<br>

---

<br>

Now let's look at a more exciting example - MarioKart! MarioKart has a lot of different objects we could model, for example, the items. Some items you can throw at other cars so that, if you hit them, you can pass them while they spin out.

## Modeling Items in MarioKart

<div style="text-align: center; margin: 1.5rem 0;">
  <img src="../assets/images/luigi.webp" alt="Luigi hits Rosalina with a red shell and passes her with a sneer." style="max-width: 500px; border-radius: 8px;">
</div>

Some items, like Mushrooms, give you a speed boost. A Star gives you invincibility.

Different categories of items behave differently, but they also have some things in common.

<div style="display: flex; justify-content: center; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <img src="../assets/images/mushroom.webp" alt="Mushroom item" style="max-width: 150px; border-radius: 8px;">
  <img src="../assets/images/star.webp" alt="Star item" style="max-width: 150px; border-radius: 8px;">
  <img src="../assets/images/banana.webp" alt="Banana item" style="max-width: 150px; border-radius: 8px;">
</div>

Let's sort out things that *all* MarioKart items have in common compared to what might be specific attributes of certain kinds of items.

<div id="attribute-sorting"></div>
<script type="module" src="../assets/AttributeSorting.js"></script>
<br>

All items have a name and can be used, but different items behave differently when used. When you’re playing the game, you press the same button to use an item regardless of how that item works. The details of what happens when an item is used are specific to the item itself.

We can capture this idea in our code by defining what a generic `Item` is, and then letting specific items control how they behave when used. This lets the rest of the program treat all items the same: pick up an Item, then use it.

Let’s model a generic `Item` in pseudocode and in the programming language Python. In Python, an object is called a `class`, which defines the attributes and methods that objects of the class all have.

<br>
<div id="multiple-choice-quiz-class-name"
    data-question='The name "class" was chosen intentionally. In object-oriented programming, what might we mean when we say a "class"?'
    data-options='["School Course", "Category", "Stylish / Classy"]'
    data-correct-answer="1"
    data-explanations='["Hint: Another synonym for class, as we mean it here, is \"type\".", "", "Hint: Another synonym for class, as we mean it here, is \"type\"."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

A class represents a category of objects that share the same attributes and behaviors. Here, we're defining what's called a **base class**: a blueprint for other, more specific class types to follow. We'll see concretely how that works later.

For now, here's what an `Item` class might look like in simplified "pseudocode" and in actual Python code. Don't worry about the exact syntax yet (things like `__init__` or `self`). For now, focus on how we're capturing **attributes** - what the object *is* - and **methods** - functions that show what the object *can do*.

<br>
<div id="code-comparison-item"
    data-pseudocode='
CLASS Item
    ATTRIBUTE name

    METHOD use()
        # Apply the item&apos;s effect
        # We&apos;ll let specific items implement their own method use()'
    data-python='
class Item:
    def __init__(self, name: str):
        self.name = name

    def use(self):
        """Apply the item&apos;s effect"""
        pass'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

Notice we don't specify any instructions for what a generic item does when we `use()` it. Different item categories in MarioKart work differently, so we'll create more specific types of items, following this base class's blueprint, and define what it means to use each of these specific items.

One of the most iconic items is the banana - roll over a banana and it'll cause your Kart to slip and spin out! When you use a banana, or any other projectile item like a shell, you can choose whether to throw it in front of or behind your kart. So when we `use()` this type of item, we need to know what direction it's being thrown in. `direction` can be a **parameter** that we pass to our method like: `use(direction)`. `direction` will either be "forward" or "backward".

<br>
<div id="code-comparison-item"
    data-pseudocode='
CLASS ProjectileItem EXTENDS Item

    METHOD use(direction)
        IF direction is "forward"
            # shoot the item in front of the kart
        IF direction is "backward"
            # shoot the item behind the kart
        ELSE
            ERROR'
    data-python='
class ProjectileItem(Item):
    """Items you throw forward or backward."""

    def use(self, direction):
        if direction == "forward":
            print(f"{self.name} is shot in front of the kart.")
        elif direction == "backward":
            print(f"{self.name} is shot behind the kart.")
        else:
            raise ValueError("direction must be &apos;forward&apos; or &apos;backward&apos;")'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

Note that `ProjectileItem` uses `self.name`, even though we never define `name` inside `ProjectileItem`. This works because `ProjectileItem` inherits from the base class `Item`, where we *did* define `name` as an attribute. Since every `Item` has a `name`, every `ProjectileItem` automatically has one too.

In other words, when a class extends another class, it automatically gets all of the *parent* class’s attributes and methods. This is called **inheritance** and is how we can define sub-categories of objects. A banana belongs to the broad category or class called `Item`, and its specific sub-category or sub-class is a `ProjectileItem`.

<br>

---

<br>

We’ve modeled the basics of what an item is and can do and how projectile items specifically work. Next, let’s look at how items interact with another object in the game - karts.

We already know how to model a simple object. Now we’ll challenge ourselves by modeling a `Kart`, which is a bit more complicated. In the full game, karts can accelerate, brake, and steer - but for now, we’ll focus only on how a kart is affected by items.

<br>
<div id="multiple-choice-quiz-banana"
    data-question='In MarioKart, what happens when you run over a banana?'
    data-options='["You gain a banana item", "Your car spins out"]'
    data-correct-answer="1"
    data-explanations='["Actually, if you run over a banana, your car spins out and you can&apos;t make forward progress for a moment.", ""]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

Hitting a banana doesn’t give you an item - it changes the state of your kart. The kart is now spun out, and that information needs to be remembered somewhere. We've seen this before, with our `Candle` object. The candle can be lit or unlit, and we can change its state by lighting it or blowing it out.

Keeping that in mind, let's figure out how we want to include spinning out in our `Kart` model.

<br>
<div id="multiple-choice-quiz-spinout-behavior"
    data-question='How might we think about spinning out as a behavior?'
    data-options='["As a method like spin_out()", "As an attribute like is_spun_out"]'
    data-correct-answer="0"
    data-explanations='["Exactly! A kart can spin out, so we might represent that action with a method like spin_out().", "Not quite. An attribute represents state, not behavior."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

<div id="multiple-choice-quiz-spinout-state"
    data-question='How might we think about spinning out as a state?'
    data-options='["As a method like spin_out()", "As an attribute like is_spun_out"]'
    data-correct-answer="1"
    data-explanations='["Not quite. A method represents behavior, not state.", "Exactly! A kart can be spun out or not, so we might represent that state with an attribute like is_spun_out."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

<div id="multiple-choice-quiz-spinout-both"
    data-question='So which do we need to model spinning out?'
    data-options='["Only a method", "Only an attribute", "Both a method and an attribute"]'
    data-correct-answer="2"
    data-explanations='["A method captures the action of spinning out, but without an attribute we can&apos;t keep track of whether the car is still spinning out or not.", "An attribute keeps track of whether the car is still spinning out or not, but it doesn&apos;t capture how the kart enters or leaves that state.", "An attribute keeps track of whether the car is still spinning out or not, and a method captures how the kart enters or leaves that state."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

Our `spin_out()` method will simply update our `is_spun_out` attribute to `True`, and we'll also have a `recover()` method that sets `is_spun_out` to `False`.

Here's our `Kart` model:

<br>
<div id="code-comparison-kart"
    data-pseudocode='
CLASS Kart
    ATTRIBUTE is_spun_out

    METHOD spin_out
        is_spun_out = True

    METHOD recover
        is_spun_out = False'
    data-python='
class Kart:

    def __init__(self):
        self.is_spun_out = False  # default to not spun out

    def spin_out(self):
        """The kart loses control."""
        self.is_spun_out = True

    def recover(self):
        """The kart regains control."""
        self.is_spun_out = False'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

We now have a basic model for a kart! But a car that can only spin out isn't very fun. Let's also allow our car to become invincible.

<div style="text-align: center; margin: 1.5rem 0;">
  <img src="../assets/images/princess-peach-mario-kart.gif" alt="Princess Peach uses a star to turn invincible!" style="max-width: 500px; border-radius: 8px;">
</div>

[Image Credit - Tenor](https://tenor.com/view/princes-speach-mario-kart-superstar-gif-10116704)

In MarioKart, the Star item makes you invincible to all attacks. (It also triggers some triumphant music - another thing we could model but we'll leave that for another time!) Using a star affects your kart, so how will we reflect that?

Let's start by updating `Kart` - it now needs to be able to become invincible and keep track of whether it is currently invincible or not. Let's model it the same way we did spinning out - we have methods for becoming invincible and losing invincibility, and the state of being invincible or not is captured in an attribute.

<br>
<div id="code-comparison-kart-invincible"
    data-pseudocode='
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
        is_invincible = False'
    data-python='
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
        self.is_invincible = False'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

Looks good! Now how do we model a Star?

<br>
<div id="multiple-choice-quiz-star-class"
    data-question='What do we need to represent the Star object?'
    data-options='["A new method in the Kart class", "A new class that inherits from Item", "Just a variable to store the star"]'
    data-correct-answer="1"
    data-explanations='["The Star is an item in the game, not a behavior of the kart.", "The Star is a type of Item, so we create a new class that inherits from Item.", "We need to define what a Star can do (its methods and attributes), not just store it."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

<div id="reflection-quiz-star-name"
    data-question='What should we name this new class?'
    data-options='["Star", "InvincibilityItem", "Either could work"]'
    data-explanations='["This is a good specific name, but let&apos;s think through the naming a bit more.", "This is a good generic name, let&apos;s think through why this might be a good option.", "Both names work, but let&apos;s think through why one might be better than the other."]'>
</div>
<script type="module" src="../assets/ReflectionQuiz.js"></script>
<br>

One of the nice things about object-oriented programming is that we can define generic functionality and re-use it later. For example, a star isn't the only item that grants invincibility in the game. Other items, like the Bullet Bill or the Ghost, might want to use some of the functionality we built for invincibility. But you can defend either choice here - being specific or generic. For now, let's keep it generic!

<div style="text-align: center; margin: 1.5rem 0;">
  <img src="../assets/images/bullet_bill.gif" alt="A bullet bill steers you through the course without you having to lift a finger, all while invincible!" style="max-width: 500px; border-radius: 8px;">
</div>

[Image Credit - Tenor](https://tenor.com/view/mario-kart-wii-mario-kart-mario-kart-wii-gif-23390794)

> A bullet bill steers you through the course without you having to lift a finger, all while invincible!

<br>

Following our `Item` blueprint, we need to define `InvincibilityItem`'s specific `use()` method. Recall that for a `ProjectileItem`, we need to know whether to throw it forward or backward so we give `use()` that direction. An `InvincibilityItem` is used on `Kart` object, and we need to be able to give `use()` a `Kart`.

<br>
<div id="code-option-quiz-invincibility-use"
    data-question='Which of these is the use() function we want?'
    data-options='["CLASS InvincibilityItem EXTENDS Item\n\n    METHOD use(kart)\n        kart.become_invincible()", "CLASS InvincibilityItem EXTENDS Item\n\n    METHOD use()\n        kart.become_invincible()", "CLASS InvincibilityItem EXTENDS Item\n\n    METHOD use()\n        become_invincible()"]'
    data-correct-answer="0"
    data-explanations='["Exactly! use() takes a kart as a parameter and affects the given kart by triggering it to become_invincible().", "Not quite. Where does kart come from? We need to pass it as a parameter to use().", "Not quite. We need to specify which kart to affect, and become_invincible() is a method on Kart, not InvincibilityItem."]'>
</div>
<script type="module" src="../assets/CodeOptionQuiz.js"></script>
<br>

---

<br>

So for `InvincibilityItem`, we have:

<br>
<div id="code-comparison-invincibility"
    data-pseudocode='
CLASS InvincibilityItem EXTENDS Item

    METHOD use(kart)
        kart.become_invincible()'
    data-python='
class InvincibilityItem(Item):
    """Items you use on your kart to grant invincibility."""

    def use(self, kart):
        kart.become_invincible()'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

<details>
<summary><strong>For advanced students</strong></summary>

<br>

Alternatively, we could have the Star item set <code>kart.is_invincible = True</code>. That works with what we have so far. But in the game, if you go off the track, you <em>can't</em> activate a star while you're falling. The InvincibilityItem shouldn't need to know whether you're actively falling or not - that's something your kart knows. So, it's preferable here to have Items ask the Kart to change (by calling its <code>become_invincible</code> method), and the kart updates itself, depending on what states it's in.

Here's how we can model Kart to take into account <code>is_falling</code> when an Item triggers the Kart the <code>become_invincible</code>.

<br>
<div id="code-comparison-kart-falling"
    data-pseudocode='
CLASS Kart
    ATTRIBUTE is_invincible
    ATTRIBUTE is_falling

    METHOD become_invincible
        IF NOT is_falling
            is_invincible = True
        ELSE
            DELAY 1 second
            become_invincible()'
    data-python='
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
        self.is_invincible = False'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

Notice how in the ELSE block, we wait a second and then call <code>become_invincible()</code> again.

<br>
<div id="reflection-quiz-recursion"
    data-question="We've waited a second and then we call become_invincible again. What might be different now?"
    data-options='["is_falling might be False now, so we can set is_invincible to True and move on.", "is_falling might still be True, so we wait another second and check again", "Either!"]'
    data-explanations='["Good call - After waiting, is_falling might have changed to False, allowing us to finally set is_invincible to True.", "Good thinking! It&apos;s possible is_falling is still True, so we&apos;d wait another second and recursively check again.", "You got it! Both scenarios are possible and we keep checking until the condition changes."]'>
</div>
<script type="module" src="../assets/ReflectionQuiz.js"></script>
<br>

This is called <strong>recursion</strong>! Recursion is a general computer science concept and not specific to Object-Oriented Programming - so we'll dive into it in more detail in a later lesson.

For now, just take an extra second to trace through what's happening and try to wrap your head around it. As long as is_falling is set to True, we keep waiting a second and calling the function again to check the status of is_falling. is_falling eventually gets set to False, so we change is_invincible to True and exit the function.

Cue star music!

</details>

<br> 

---

<br>

With that, we've finished adding `InvincibilityItem` to our game, which lets us use items like the Star ⭐ 

Let's review what we've built. We have two broad categories of objects implemented - `Item` and `Kart`:

### Item

<br>
<div id="code-comparison-item-review"
    data-pseudocode='
CLASS Item
    ATTRIBUTE name

    METHOD use()
        # Apply the item&apos;s effect
        # We&apos;ll let specific items implement their own method use()'
    data-python='
class Item:
    def __init__(self, name: str):
        self.name = name

    def use(self):
        """Apply the item&apos;s effect"""
        raise NotImplementedError'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

### Kart

<br>
<div id="code-comparison-kart-review"
    data-pseudocode='
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
        is_invincible = False'
    data-python='
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
        self.is_invincible = False'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

And we have two more specific types of `Item`: `ProjectileItem` and `InvincibilityItem`.

### ProjectileItem

<br>
<div id="code-comparison-projectile-review"
    data-pseudocode='
CLASS ProjectileItem EXTENDS Item

    METHOD use(direction)
        IF direction is "forward"
            # shoot the item in front of the kart
        IF direction is "backward"
            # shoot the item behind the kart
        ELSE
            ERROR'
    data-python='
class ProjectileItem(Item):
    """Items you throw forward or backward."""

    def use(self, direction):
        if direction == "forward":
            print(f"{self.name} is shot in front of the kart.")
        elif direction == "backward":
            print(f"{self.name} is shot behind the kart.")
        else:
            raise ValueError("direction must be &apos;forward&apos; or &apos;backward&apos;")'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

### InvincibilityItem

<br>
<div id="code-comparison-invincibility-review"
    data-pseudocode='
CLASS InvincibilityItem EXTENDS Item

    METHOD use(kart)
        kart.become_invincible()'
    data-python='
class InvincibilityItem(Item):
    """Items you use on your kart to grant invincibility."""

    def use(self, kart):
        kart.become_invincible()'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

## Putting it together
Finally, let's actually test out some of the things we've built! First, we'll need to create a `Kart`. Let's go ahead and do this in Python - can you guess how we set it up?

<br>
<div id="multiple-choice-quiz-create-kart"
    data-question='How do we create a Kart object?'
    data-options='["my_kart = Kart()", "Kart()", "my_kart = kart()"]'
    data-correct-answer="0"
    data-explanations='["", "", "Pay attention to the capitalization - we&apos;ve created a Kart() object with a capital K. Python objects are case-sensitive!"]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

That's it! We don't have anything customizable about the Kart, but that's something you could add.

Let's see what current state `my_kart` is in. Press Play to run the code:

<br>
<div id="code-runner-kart-status"
    data-code='print("Kart is spun out: ", my_kart.is_spun_out)
print("Kart is invincible: ", my_kart.is_invincible)'
    data-output='Kart is spun out:  False
Kart is invincible:  False'>
</div>
<script type="module" src="../assets/CodeRunner.js"></script>
<br>

Perfect, our `Kart` was setup with the defaults - neither spun out nor invincible. Now let's try throwing a banana.

<br>
<div id="code-runner-banana"
    data-code='banana_item = ProjectileItem("Banana")
banana_item.use("backward")'
    data-output='Banana is thrown behind the kart.'>
</div>
<script type="module" src="../assets/CodeRunner.js"></script>
<br>

Finally, let's use a star!

<br>
<div id="code-runner-special-star"
    data-code='star_item = InvincibilityItem("Star")
star_item.use(my_kart)

if my_kart.is_invincible:
    print("⭐ I&apos;m invincible! ⭐")
else:
    print("I&apos;m not invincible 😭")'
    data-output='⭐ I&apos;m invincible! ⭐'>
</div>
<script type="module" src="../assets/CodeRunnerSpecial.js"></script>
<br>

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

Thanks for building this with me and I'll see you out on the track!

<br>
<br>

---

<br>

### AI Use
The narrative content and idea for this article are entirely my own. AI was used to generate code for the widgets, per my designs. My final outline, before AI was used, is available [here](https://github.com/FarynWoods/interactive-learning/blob/15964444fdabf5448be39e2f8414b1449d5253c4/articles/double_dash.md). Further editing was done by me after this version, but it captures my original outline before using code assistance to add in the interactive widgets.
