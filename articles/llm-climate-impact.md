---
layout: default
title: LLM Climate Impact
---

# The Energy Cost of Generative AI

Every time you use Generative AI, like ChatGPT, Claude, or run a google search that gives an AI overview, a server running at a huge data center must process your search, which requires electricity.

A lot of things that we do require electricity, but sometimes it's less obvious when something is power-hungry. When you plug your phone charger into the wall, you know that it's drawing electricity. But when you watch videos on your phone, not only is your phone power draining, but a server somewhere is transmitting that video to your phone for you to watch. And that server is plugged in and demanding power too.

Being power-hungry in itself is not the whole problem. Electricity is life-saving! Imagine trying to get through a hot summer without air conditioning, which requires electricity. This is unfortunately the reality for many people who face life-threatening heat waves every year. We should expand electricity access to as many people as possible.

But where does electricity come from? Check out this chart from [Our World In Data](https://ourworldindata.org/energy-mix). You can hover your mouse over the chart to see information about the TWh, or Terrawatt-hours, of electricity was consumed from each source, annually. You can also drag the slider at the bottom to adjust the time frame you're looking at. Try dragging the left slider to the right to see recent trends in energy consumption by source. See if you can answer the following:

<iframe src="https://archive.ourworldindata.org/20260119-065148/grapher/energy-consumption-by-source-and-country.html?stackMode=absolute&tab=chart" loading="lazy" style="width: 100%; height: 600px; border: 0px none;" allow="web-share; clipboard-write"></iframe>

<br>

---

<br>
<div id="multiple-choice-quiz"
    data-question="As of 2020, what was the biggest source of energy across the world?"
    data-options='["Solar", "wind", "Coal", "Oil"]'
    data-correct-answer="3"
    data-explanations='["Not quite. If you hover your mouse above 2020 on the chart, you can see electricity consumption by each source. Which source served the biggest number of TWh?", "Not quite. If you hover your mouse above 2020 on the chart, you can see electricity consumption by each source. Which source served the biggest number of TWh?", "Not quite. If you hover your mouse above 2020 on the chart, you can see electricity consumption by each source. Which source served the biggest number of TWh?", "Exactly! Oil was burned to supply the majority of the world&apos;s electricity in 2020."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

---

<br>

Many of these energy sources come with a major downside. The following are all fossil fuels, and burning them emits carbon dioxide ($CO_{2}$) and contribute to climate change.
- Oil
- Coal
- Gas
- Biofuels

On the other hand, renewables (like solar and wind) and low-carbon sources (like nuclear) supply energy with a much lower carbon footprint. Earlier I said that a technology being power-hungry in itself isn't the whole story - it's also the fact that we're burning fossil fuels to supply that power.

What can we do about this?

<br>

---

<br>

<div id="reflection-quiz"
    data-question="What should we do about the carbon footprint of AI?"
    data-options='["Make AI more energy-efficient", "Decrease AI usage", "Switch to renewable energy", "Can we do all three?"]'
    data-explanations='["This would definitely help! Decreasing AI usage overall and powering it using renewables would also go far.", "This would definitely help! Making AI more energy efficient and powering it using renewables would also be great.", "This would definitely help! Making AI more energy efficient and decreasing AI use overall would also be great.", "Great idea! Why not tackle the problem from as many sides as we can?"]'>
</div>
<script type="module" src="../assets/ReflectionQuiz.js"></script>

<br>

---

<br>

Let's explore some of these options.

### Making AI more energy-efficient
Let's consider first making AI more energy-efficient. The idea is that if we can make AI demand less energy, then its overall carbon footprint will decrease. But is it that simple?

There are ways to increase the energy efficiency of AI. AI may appear magic, but behind the curtain, it's all math! (And not a literal man behind a curtain, typing out responses, in case you were wondering.)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 2rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/-RQxD4Ff7dY?si=xnX6v2Mf8lf205lE" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

A generative AI model makes trillions of calculations as it outputs your text, image, or video. And the computer chip "serving" the model demands electricity while the model furiously calculates. Researchers are looking into ways to decrease the number of calculations that must be made while still allowing the model to work well. They are also improving the energy efficiency of the chip itself, similar to how scientists invented more energy efficient LED bulbs compared to fluorescent bulbs.

So, it's possible to improve efficiency! Let's say we improve the efficiency of AI. Let's also assume that the biggest factor in the cost of companies serving AI is its energy consumption. What do you think might happen to the cost of AI?

<br>
<div id="multiple-choice-quiz-efficiency"
    data-question="If AI is more efficient, will the cost of using AI go up or down for users?"
    data-options='["Cost will go up", "Cost will go down"]'
    data-correct-answer="1"
    data-explanations='["Not quite. If AI is more energy efficient, it will likely be cheaper for companies to serve.", "Exactly. If AI is more energy efficient, it will likely be cheaper for companies to serve."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

And if AI is cheaper for consumers, what might happen?

<br>
<div id="multiple-choice-quiz-tradeoff"
    data-question="What might happen if AI is cheaper?"
    data-options='["People will use it more, or more people will start to use it", "People will use it less, or fewer people will use it overall"]'
    data-correct-answer="0"
    data-explanations='["Exactly! If the technology becomes more affordable, more people will use it.", "Not quite. If the technology is more affordable, more people will be able to use it and people will use it more!"]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

Let's pull it all together. The chart below shows how the energy efficiency of AI relates to the usage cost and the overall energy demand of AI. TODO: Add a line showing cost going down.

<br>
<div id="jevons-paradox"></div>
<script type="module" src="../assets/JevonsParadox.js"></script>
<br>

<br>
<div id="multiple-choice-quiz-jevons"
    data-question="According to the graph, how does energy efficiency affect AI energy demand?"
    data-options='["Overall energy demand goes up despite efficiency improvements.", "Overall energy demand goes down due to efficiency improvements."]'
    data-correct-answer="0"
    data-explanations='["You nailed it! At first glance this may seem counterintuitive, but now you see how efficiency can actually lead to increased overall energy demand.", "Not quite. The graph actually shows that overall energy demand goes up, despite efficiency improvements. When AI is more efficient, it can also be more affordable, which causes people to use it more, causing the overall energy demand to outpace the energy saved by efficiency improvements."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

This is called **Jevons Paradox**, and researchers like Sasha Luccioni, Emma Strubell, and Kate Crawford [are concerned about how it might show up with AI](https://dl.acm.org/doi/10.1145/3715275.3732007).

So, while energy efficiency improvements are inevitable with AI, we shouldn't count on them to lower the overal carbon footprint of AI.


### Switch to renewable energy
We've seen how the energy demand of AI might go up due to increased demand. Energy consumption contributes to climate change when we're burning fossil fuels for energy. 

- unprecedented demand creating urgency - we don't have time to build new solar, wind, and batteries, we have to use what we have. Reopening coal plants
- demand for AI is constant, while renewables are intermittent

<br>

<div id="energy-source-demo"></div>
<script type="module" src="../assets/EnergySourceDemo.js"></script>

Image sources:
- [Solar Panels](https://www.flaticon.com/free-icon/solar-panel_5733161)
- [Factory Icon](https://www.freeiconspng.com/images/factory-icon)


### Decreasing AI usage
