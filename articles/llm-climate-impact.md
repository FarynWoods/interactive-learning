---
layout: default
title: LLM Climate Impact
---

# WIP: The Energy Cost of Generative AI

**This article is unfinished. In its current state, it exists to setup and showcase the [interactive demo towards the end](#switching-to-renewables) that I'm really proud of so please check it out!**

<br>

---

<br>

## Where energy comes from

Every time you use Generative AI - like ChatGPT, Claude, or an AI-powered search - a server in a data center has to run computations. That requires electricity.

Electricity itself isn’t "bad." It's essential (think air conditioning during dangerous heat waves). The problem is **where the electricity comes from**. If a lot of that power is produced by burning fossil fuels, then more computing can mean more carbon emissions.

Unfortunately right now, a lot of global electricity *is* coming from fossil fuels. Check out this chart from [Our World In Data](https://ourworldindata.org/energy-mix).

<iframe src="https://archive.ourworldindata.org/20260119-065148/grapher/energy-consumption-by-source-and-country.html?stackMode=absolute&tab=chart" loading="lazy" style="width: 100%; height: 600px; border: 0px none;" allow="web-share; clipboard-write"></iframe>
<br>

You can hover your mouse over the chart to see information about the terawatt-hours (TWh) of electricity that was consumed from each source over the years. You can also drag the slider at the bottom to adjust the time frame you're looking at. Try dragging that slider to the right to see recent trends in energy consumption by source. See if you can find the answer to the following question:

<br>
<div id="multiple-choice-quiz"
    data-question="As of 2020, what was the biggest source of energy across the world?"
    data-options='["Solar", "wind", "Coal", "Oil"]'
    data-correct-answer="3"
    data-explanations='["If you hover your mouse above 2020 on the chart, you can see electricity consumption by each source. Which source served the biggest number of TWh?", "If you hover your mouse above 2020 on the chart, you can see electricity consumption by each source. Which source served the biggest number of TWh?", "If you hover your mouse above 2020 on the chart, you can see electricity consumption by each source. Which source served the biggest number of TWh?", "Oil was burned to supply the majority of the world&apos;s electricity in 2020."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

---

<br>

## Switching to renewables

In general, we want to switch our power supply to come from renewable sources (like solar and wind) and low-carbon sources (like nuclear, although this is controversial due to safety concerns).

However, it can be difficult to match our current constant electricity demand with certain renewable sources that only deliver power intermittently. AI in particular is a technology that [demands constant power](https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/).

<br>
<div id="multiple-choice-quiz-night"
    data-question="For example, are we able to get energy from our solar panels at night?"
    data-options='["Yes", "No", "I&apos;m not sure"]'
    data-correct-answer="1"
    data-explanations='["Will the solar panels work if the sun isn&apos;t up to shine on them?", "The solar panels can&apos;t generate any electricity if the sun isn&apos;t shining on them.", "That&apos;s okay! The next demo should help you figure it out."]'>
</div>
<script type="module" src="../assets/MultipleChoiceQuiz.js"></script>
<br>

In the demo below, you can manipulate things like the wind speed, the time of day, and how much the power plant is burning fossil fuels. Start by adjusting each of the sliders and noticing what happens in the animation. Then, look below the animation to see how these changes affect the power output for each source.

<div id="energy-source-demo"></div>
<script type="module" src="../assets/EnergySourceDemo.js"></script>

<br>
<div id="demo-state-quiz-wind"
    data-demo-id="energy-source-demo"
    data-question="Setup the demo so we're maximizing the output from the windmill."
    data-validation-rule="windSpeed:100"
    data-correct-message="Correct! Maximum wind speed (100%) produces the highest power output from the windmill."
    data-incorrect-message="Not quite. Does the windmill produce more energy when it's moving faster or slower?">
</div>
<script type="module" src="../assets/DemoStateQuiz.js"></script>

<br>
<div id="demo-state-quiz-solar"
    data-demo-id="energy-source-demo"
    data-question="Setup the demo so we're maximizing the output from the solar panels."
    data-validation-rule="hourOfDay:12"
    data-correct-message="Correct! Solar panels produce peak output at noon (12:00 PM) when the sun is directly overhead."
    data-incorrect-message="Not quite. Think about when the sun is strongest during the day. Try adjusting the time of day slider and see when the Solar line (orange) is the highest.">
</div>
<script type="module" src="../assets/DemoStateQuiz.js"></script>

<br>
<div id="demo-state-quiz-fossil"
    data-demo-id="energy-source-demo"
    data-question="Setup the demo so we're maximizing the output from the fossil fuel plant."
    data-validation-rule="fossilBurning:5"
    data-correct-message="Correct! The fossil fuel plant produces maximum output when it's at its highest burning level."
    data-incorrect-message="Not quite. Does the power plant generate more energy when it's burning more or when it's burning less? Try adjusting the Fossil Fuel Burning slider and see when the Fossil Fuel line (purple) is the highest.">
</div>
<script type="module" src="../assets/DemoStateQuiz.js"></script>
<br>

In this demo, we can manipulate things like wind and solar with the sliders. But in reality, we don't have control over how fast the wind blows or whether the sun is up and the sky is clear. We can control how much we burn fossil fuels though, which is one of the reasons why they've stuck around even though renewable sources are now cheaper - they can provide constant energy.

Does that mean all hope is lost? **Of course not!**

Solar and wind are not the only renewable sources of energy, and they're not the only solutions to this problem. They are and will continue to be a huge part of our clean energy transition, but they'll share that stage with:
- batteries, which can store excess energy for when we need it (like on windless nights)
- nuclear power, which generates electricity using controlled nuclear reactions
- hydropower and geothermal energy
- And perhaps new technologies that we haven't even discovered or invented yet!

I'll leave you with one last chart, again from [Our World in Data](https://ourworldindata.org/renewable-energy). Renewable energy is on the rise!

<iframe src="https://archive.ourworldindata.org/20260119-065148/grapher/modern-renewable-energy-consumption.html?tab=chart" loading="lazy" style="width: 100%; height: 600px; border: 0px none;" allow="web-share; clipboard-write"></iframe>

<br>

---

<br>

Image sources:
- [Solar Panels](https://www.flaticon.com/free-icon/solar-panel_5733161)
- [Factory Icon](https://www.freeiconspng.com/images/factory-icon)
