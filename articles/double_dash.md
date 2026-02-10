---
layout: default
title: Object Oriented Programming with MarioKart
---

# Object-Oriented Programming with MarioKart

**Audience**: highschool age or adults newer to programming and code. Suitable for beginners.

<small>*Not optimized for mobile devices (yet). Some interactive widgets may not work properly on a phone or tablet.*</small>

<br>

---

<br>

## Intro to Object-Oriented Programming

In programming, there are many different ways to think about and solve a problem. Some approaches focus on steps and instructions (like a recipe), while others focus on the data being processed.

**Object-oriented programming (OOP)** is a way of writing programs by modeling parts of a problem as individual **objects.**

An object represents something meaningful in the problem you're solving. Objects have **attributes**, which describe what they are, and **behaviors**, which describe what they can do.

For example, we could model a candle as an object. A candle can be lit or unlit, and there are specific actions we can take that change that **state**: you can light an unlit candle, or blow out a lit one.

A candle also has characteristics we might want to store, like its color and its height. The height changes over time, but only while the candle is lit - so knowing whether the candle is lit or unlit matters to how the candle behaves.

In object-oriented programming, we can represent all of this by grouping the candle's data (its color, height, and whether it's lit) together with the actions that affect it (lighting and blowing it out) into a single object.

Below, you can choose the color of the candle and press buttons to light it or blow it out. The height decreases while the candle is lit, but you can make it taller again by dragging the slider up when the candle is unlit.

<div id="candle"></div>
<script type="module" src="../assets/Candle.js"></script>
<br>

---

<br>

## Modeling Items in MarioKart

Now let's look at a more exciting example - MarioKart! MarioKart has a lot of different objects we could model, for example, the **items**. Some items you aim at other cars hoping you land a hit and can pass them while they spin out.

<div style="text-align: center; margin: 1.5rem 0;">
  <img src="../assets/images/luigi.webp" alt="Luigi hits Rosalina with a red shell and passes her with a sneer." style="max-width: 500px; border-radius: 8px;">
</div>

<div style="text-align: center;"><small><a href="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjlnMmxkamhmZ3Y4cDh2OW9xOTNtNG9uYjZpZGZ2cG9xdjliZ201ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NXDoaAmF7dkyc/giphy.gif">GIF Credit - Giphy</a></small></div>

<br>

Some items, like Mushrooms, give you a speed boost. A Star gives you invincibility.

<div style="display: flex; justify-content: center; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <img src="../assets/images/mushroom.webp" alt="Mushroom item" style="max-width: 150px; border-radius: 8px;">
  <img src="../assets/images/star.webp" alt="Star item" style="max-width: 150px; border-radius: 8px;">
  <img src="../assets/images/banana.webp" alt="Banana item" style="max-width: 150px; border-radius: 8px;">
</div>

<div style="text-align: center;"><small><a href="https://mariokart.fandom.com/wiki/Item">Images from MarioKart.Fandom.com</a></small></div>

<br>

Different categories of items behave differently, but they also have some things in common.

Let's sort out things that *all* MarioKart items have in common compared to what might be specific attributes of certain kinds of items.

<div id="attribute-sorting"></div>
<script type="module" src="../assets/AttributeSorting.js"></script>
<br>

All items have a name and can be used, but not all items work the same or have the same effects. When you're playing the game, though, you press the same button to use an item regardless of which one you have. At the level of a button press, the game doesn't need to know which specific item you're holding, and this vastly simplifies things for the program.

Using object-oriented programming, we can let each specific item define how it behaves when used, while the rest of the game only needs to know how to work with a generic `Item`. This lets the program treat all items the same: pick up an `Item`, then use it.

Let's model a generic `Item` in pseudocode and in the programming language **Python**. In Python, a blueprint for an object is called a `class`, which defines the attributes and methods that objects of the class all have.

<small>Note: New to seeing things formatted like <code>Item</code> or <code>class</code>? This special format just shows that we're talking about code.</small>

<br>
<div id="multiple-choice-quiz-class-name"
    data-question='The name "class" was chosen intentionally. In object-oriented programming, what might we mean when we say a "class"?'
    data-options='["School Course", "Category", "Stylish / Classy"]'
    data-correct-answer="1"
    data-explanations='["Hint: Another synonym for class, as we mean it here, is \"type\".", "", "Hint: Another synonym for class, as we mean it here, is \"type\"."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

A class represents a category of objects that share the same attributes and behaviors. Here, we're defining what's called a **base class**: a blueprint for other, more specific class types (Hint: 🍌, 🍄, ⭐) to follow. We'll see concretely how that works later.

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
    def __init__(self, name):
        self.name = name

    def use(self):
        """Apply the item&apos;s effect"""
        pass'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

Notice we don't specify any instructions for what a generic item does when we `use()` it. Different item categories in MarioKart work differently, so we'll create more specific types of items, following this base class's blueprint, and define what it means to use each of these specific items.

## Modeling a ProjectileItem

One of the most iconic items is the banana - roll over a banana and it'll cause your Kart to slip and spin out! When you use a banana, or any other projectile item like a shell, you can choose whether to throw it in front of or behind your kart. So when we `use()` this type of item, we need to know what direction it's being thrown in. `direction` can be a **parameter** that we pass to our method like: `use(direction)`. `direction` will either be "forward" or "backward". Pay attention to how we use the parameter in the function.

<br>
<div id="code-comparison-item"
    data-pseudocode='
CLASS ProjectileItem EXTENDS Item

    METHOD use(direction)
        IF direction is "forward"
            PRINT "self.name is thrown in front of the kart."
        IF direction is "backward"
            PRINT "self.name is thrown behind the kart."
        ELSE
            ERROR'
    data-python='
class ProjectileItem(Item):
    """Items you throw forward or backward."""

    def use(self, direction):
        if direction == "forward":
            print(f"{self.name} is thrown in front of the kart.")
        elif direction == "backward":
            print(f"{self.name} is thrown behind the kart.")
        else:
            raise ValueError("direction must be &apos;forward&apos; or &apos;backward&apos;")'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

<br>
<div id="multiple-choice-quiz-direction"
    data-question='In the Python code above, how do we use our parameter &lt;code&gt;direction&lt;/code&gt;?'
    data-options='["We check its value", "We change its value"]'
    data-correct-answer="0"
    data-explanations='["We use if statements to check whether <code>direction</code> is &apos;forward&apos; or &apos;backward&apos;.", "Actually we don&apos;t change its value - look at the &apos;IF&apos; statements. We use those to check if <code>direction</code> is &apos;forward&apos; or &apos;backward&apos;."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

Now, choose a `direction` and test it out for yourself.

<br>
<div id="interactive-code-runner-direction"
    data-code-template='banana_1 = ProjectileItem("banana")
banana_1.use(<direction>)'
    data-output-template='banana is thrown <in front of/behind> the kart.'
    data-choices='["forward", "backward"]'
    data-choice-label='Choose a direction:'>
</div>
<script type="module" src="../assets/InteractiveCodeRunner.js"></script>
<br>

It's working!

Now, going back to the code, note that `ProjectileItem` uses `self.name`, even though we never define `name` inside `ProjectileItem`. 

```
IF direction is "forward"
    PRINT "self.name is thrown in front of the kart."
IF direction is "backward"
    PRINT "self.name is thrown behind the kart."
```

This works because `ProjectileItem` inherits from the base class `Item`, where we *did* define `name` as an attribute. Since every `Item` has a `name`, every `ProjectileItem` automatically has one too.

In other words, when a class extends another class, it automatically gets all of the *parent* class's attributes and methods. This is called **inheritance** and is how we can define sub-categories of objects. A banana belongs to the broad category or class called `Item`, and its specific sub-category or sub-class is a `ProjectileItem`.

You can see how we gave our `ProjectileItem` the name "banana" like so:

```
banana_1 = ProjectileItem("banana")
```

<br>

Try giving using different items by setting the name!

<div id="interactive-code-runner-name"
    data-code-template='my_item = ProjectileItem("<name>")
my_item.use("forward")'
    data-output-template='<name> is thrown in front of the kart.'
    data-choices='["banana", "red_shell", "bob_omb"]'
    data-choice-label='Choose an item:'>
</div>
<script type="module" src="../assets/InteractiveCodeRunner.js"></script>
<br>

<br>

---

<br>

## Modeling Karts

We've modeled the basics of what an item is and can do and how projectile items, specifically, work. Next, let's look at how items interact with another object in the game - karts.

We already know how to model a simple object. Now we'll challenge ourselves by modeling a `Kart`, which is a bit more complicated. In the full game, karts can accelerate, brake, and steer - but for now, we'll focus only on how a kart is affected by items.

<br>
<div id="multiple-choice-quiz-banana"
    data-question='In MarioKart, what happens when you run over a banana?'
    data-options='["You gain a banana item", "Your car spins out"]'
    data-correct-answer="1"
    data-explanations='["Actually, if you run over a banana, your car spins out and you can&apos;t make forward progress for a moment.", ""]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

Hitting a banana doesn't give you an item - it changes the **state** of your kart. The kart is now spun out, and that information needs to be remembered somewhere. We've seen this before, with our candle. The candle can be lit or unlit, and we can change its state by lighting it or blowing it out.

Keeping that in mind, let's figure out how we want to include spinning out in our `Kart` model.

<br>
<div id="multiple-choice-quiz-spinout-behavior"
    data-question='How might we think about spinning out as an action?'
    data-options='["As a method like spin_out()", "As an attribute like is_spun_out"]'
    data-correct-answer="0"
    data-explanations='["A kart can spin out, which is an action. Actions are naturally represented by methods like spin_out().", "An attribute allows us to remember what state we&apos;re in, but how do we change that state?"]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

<div id="multiple-choice-quiz-spinout-state"
    data-question='How might we think about spinning out as a state?'
    data-options='["As a method like spin_out()", "As an attribute like is_spun_out"]'
    data-correct-answer="1"
    data-explanations='["A method allows us to change state, but how do we remember what state we&apos;re in?", "A kart can be spun out or not. That&apos;s information we want to remember, so it makes sense to store it in an attribute like is_spun_out."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

<div id="multiple-choice-quiz-spinout-both"
    data-question='So which do we need to model spinning out?'
    data-options='["Only a method", "Only an attribute", "Both a method and an attribute"]'
    data-correct-answer="2"
    data-explanations='["A method captures the action of spinning out, but without an attribute we can&apos;t keep track of whether the car is still spinning out or not.", "An attribute keeps track of whether the car is spun out, but it doesn&apos;t capture how the kart enters or leaves that state.", "Using both works best. The method describes what happens, and the attribute remembers what state the kart is in."]'>
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

<div style="text-align: center;"><small><a href="https://tenor.com/view/princes-speach-mario-kart-superstar-gif-10116704">GIF Credit - Tenor</a></small></div>

## Modeling InvincibilityItem

In MarioKart, the Star item makes you invincible to all attacks. (It also triggers some triumphant music!) Using a star affects your kart, so how will we reflect that?

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

Looks good! Now how do we model a Star? The Star interacts with our Kart, but think about what object should "own" methods and attributes about the Star.

<br>
<div id="multiple-choice-quiz-star-class"
    data-question='How should we represent a Star using object-oriented programming?'
    data-options='["A new method in the Kart class", "A new class that inherits from Item", "A variable to store whether we have a star"]'
    data-correct-answer="1"
    data-explanations='["The Star is an item in the game. While it affects the kart, it isn&apos;t a behavior of the kart itself.", "The Star is a specific type of Item, so we model it as a new class that inherits from <code>Item</code> and defines how it is used.", "A variable can store information, but it can&apos;t describe behavior. We need to define what the Star does when it&apos;s used."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

<div id="reflection-quiz-star-name"
    data-question='What should we name this new class?'
    data-options='["Star", "InvincibilityItem", "Either could work"]'
    data-explanations='["This is a good specific name, but let&apos;s think through the naming a bit more.", "This is a good generic name. Let&apos;s think through why this might be a good option.", "Both names work, but let&apos;s think through why one might be better than the other."]'>
</div>
<script type="module" src="../assets/ReflectionQuiz.js"></script>
<br>

One of the nice things about object-oriented programming is that we can define generic functionality and re-use it later. For example, a star isn't the only item that grants invincibility in the game. Other items, like the Bullet Bill or the Ghost, might want to use some of the functionality we built for invincibility. But you can defend either choice here - being specific or generic. For now, let's keep it generic!

<div style="text-align: center; margin: 1.5rem 0;">
  <img src="../assets/images/bullet_bill.gif" alt="A bullet bill steers you through the course without you having to lift a finger, all while invincible!" style="max-width: 500px; border-radius: 8px;">
</div>

<div style="text-align: center;"><small><a href="https://tenor.com/view/mario-kart-wii-mario-kart-mario-kart-wii-gif-23390794">Gif Credit - Tenor</a></small></div>

<small><i>A bullet bill steers you through the course without you having to lift a finger, all while invincible!</i></small>

<br>

Following our `Item` blueprint, we need to define `InvincibilityItem`'s specific `use()` method. Recall that for a `ProjectileItem`, we need to know whether to throw it forward or backward so we give `use()` that direction. An `InvincibilityItem` is used on `Kart` object, and we need to be able to give `use()` a `Kart`.

<br>
<div id="code-option-quiz-invincibility-use"
    data-question='Which version of use() correctly applies invincibility to a kart?'
    data-options='["CLASS InvincibilityItem EXTENDS Item\n\n    METHOD use()\n        kart.become_invincible()", "CLASS InvincibilityItem EXTENDS Item\n\n    METHOD use(kart)\n        kart.become_invincible()", "CLASS InvincibilityItem EXTENDS Item\n\n    METHOD use()\n        become_invincible()"]'
    data-correct-answer="1"
    data-explanations='["Where does kart come from? We need to pass the kart into use() so the item knows which kart to affect.", "use() takes a kart as a parameter and affects that kart by calling its become_invincible() method.", "We need to specify which kart to affect, and become_invincible() is a method on Kart, not on InvincibilityItem."]'>
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

Let's build some more intuition for why we should change a <code>Kart</code>'s state using a method, as opposed to letting another item change its state directly. We <i>could</i> have the Star item set <code>kart.is_invincible = True</code> directly, and with our current model that would work. But in the actual game, if you drive off the track, you <em>can't</em> activate a star while you're falling. The <code>InvincibilityItem</code> shouldn't need to know whether your kart is falling - that's something your kart should check.

This is the same idea we saw earlier with spinning out. We didn’t let other objects flip <code>is_spun_out</code> directly; instead, we gave the kart a <code>spin_out()</code> method and let the kart decide how its state changes.

By having the Star call <code>kart.become_invincible()</code>, we keep all the rules about invincibility inside the `Kart` class. Items <i>ask</i> the kart to change, and the kart decides whether that change is allowed based on its current state. This keeps responsibilities clear and makes the code easier to extend as the game gets more complex.

With that, we've finished adding `InvincibilityItem` to our game, which lets us use items like the Star ⭐ 

Before we try it out though, let's review what we've built!

<br>

<details>
<summary><strong>For an extra challenge ...</strong></summary>

<br>

<h2>Modeling falling off the track with recursion</h2>

Here's one way that we can model Kart to take into account <code>is_falling</code> when an Item triggers the Kart to <code>become_invincible</code>.

<br>
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

    def become_invincible(self):
        if not is_falling:
            self.is_invincible = True
        else:
            time.sleep(1)
            self.become_invincible()'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

Notice how in the ELSE block, we wait a second and then call <code>become_invincible()</code> again.

<br>

<br>
<div id="reflection-quiz-recursion"
    data-question="We've waited a second and then we call become_invincible again. What might be different now?"
    data-options='["is_falling might be False now, so we can set is_invincible to True and move on.", "is_falling might still be True, so we wait another second and check again", "Either!"]'
    data-explanations='["Good call - After waiting, is_falling might have changed to False, allowing us to set is_invincible to True.", "Good thinking! It&apos;s possible is_falling is still True, so we&apos;d wait another second and recursively check again.", "You got it! Both scenarios are possible and we keep checking until the condition changes."]'>
</div>
<script type="module" src="../assets/ReflectionQuiz.js"></script>
<br>

We could see either case! And eventually, we'll check is_falling, it will be False, and we're able to become_invincible. This method is called <strong>recursion</strong>! Recursion is a general computer science concept and not specific to Object-Oriented Programming - so we'll dive into it in more detail in a later lesson.

<br>
<br>

For now, just take an extra second to trace through what's happening and try to wrap your head around it. As long as is_falling is set to True, we keep waiting a second and calling the function again to check the status of is_falling. is_falling eventually gets set to False, so we change is_invincible to True and exit the function.

<br>
<br>

Cue star music!

<br>
<br>

<i>Note: Recursion is only one way to implement this, there are other ways!</i>

</details>

<br> 

---

<br>

## What we've built!

We have two broad categories of objects: `Item` and `Kart`, plus two specific types of `Item`: `ProjectileItem` and `InvincibilityItem`.

<br>
<div id="code-comparison-full-review"
    data-pseudocode='# Item base class
CLASS Item
    ATTRIBUTE name

    METHOD use()
        # Apply the item&apos;s effect
        # We&apos;ll let specific items implement their own method use()

# Kart class
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

# ProjectileItem subclass
CLASS ProjectileItem EXTENDS Item

    METHOD use(direction)
        IF direction is "forward"
            PRINT "self.name is thrown in front of the kart."
        IF direction is "backward"
            PRINT "self.name is thrown behind the kart."
        ELSE
            ERROR

# InvincibilityItem subclass
CLASS InvincibilityItem EXTENDS Item

    METHOD use(kart)
        kart.become_invincible()'
    data-python='# Item base class
class Item:
    def __init__(self, name):
        self.name = name

    def use(self):
        """Apply the item&apos;s effect"""
        raise NotImplementedError

# Kart class
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

# ProjectileItem subclass
class ProjectileItem(Item):
    """Items you throw forward or backward."""

    def use(self, direction):
        if direction == "forward":
            print(f"{self.name} is thrown in front of the kart.")
        elif direction == "backward":
            print(f"{self.name} is thrown behind the kart.")
        else:
            raise ValueError("direction must be &apos;forward&apos; or &apos;backward&apos;")

# InvincibilityItem subclass
class InvincibilityItem(Item):
    """Items you use on your kart to grant invincibility."""

    def use(self, kart):
        kart.become_invincible()'
    data-show-both-option='false'>
</div>
<script type="module" src="../assets/CodeComparison.js"></script>
<br>

## Putting it together
Finally, let's test out everything we've built! First, we'll need to create a `Kart`. Let's go ahead and do this in Python - can you guess how we set it up?

<br>
<div id="multiple-choice-quiz-create-kart"
    data-question='How do we create a Kart object?'
    data-options='["my_kart = Kart()", "Kart()", "my_kart = kart()"]'
    data-correct-answer="0"
    data-explanations='["", "We created an object, but we need to save it to a variable so we can use it. We do that by choosing a name for our variable and setting it equal to our Kart class, like <code>my_variable = Kart()</code>", "Pay attention to the capitalization - we&apos;ve created a Kart() object with a capital K. Python objects are case-sensitive!"]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

That's it! Unlike `Item`s, `Kart`s don't have a name of any other customization, so we just create a generic `Kart`.

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
In this lesson, we learned some basics of object-oriented programming. We:
- created objects with attributes (state) and methods (behavior)
- created base classes that define shared structure and behavior for related objects
- showed how objects can interact by calling each other's methods

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
Here was my process for developing this article:
- Came up with the idea (using MarioKart to teach OOP) on my own
- Developed the narrative and ideas for interactive widgets on my own. That draft is viewable [here](https://github.com/FarynWoods/interactive-learning/blob/15964444fdabf5448be39e2f8414b1449d5253c4/articles/double_dash.md).
- Used AI to generate the code for the interactive widgets.
- While editing the final draft, most of the edits are my own but I used AI to offer suggestions when I was stuck.
