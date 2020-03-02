---
date: "2020-02-26T09:00:00Z"
title: "Beep beep bloop bloop - Listen to your webpage in action!"
aliases: "/beep-beep-bloop-bloop-listen-your-webpage-in-action/"
category: code
more: "Explain it to me"
tags: [audio, "bits'n'pieces"]
---

Debugging tools are better than ever, but some things still remain hidden to the un-observant eye... this small script is a delightful way to hear what webpages are doing behind the scenes.

Accurately named `plink-plonk.js` by developer [Tom Hicks](http://tomhicks.github.io), [this small snippet](https://gist.github.com/tomhicks/6cb5e827723c4eaef638bf9f7686d2d8) of JavaScript is a clever and simple way to create sounds from the browser whenever the webpage you're on modifies itself in any way. (For single-page apps, this will be a lot!)

The script is activated by pasting it into your console (not always the best idea, if you can't understand all the code). Here's a quick video of it in action:

{{< tweet 1232852862776020992 >}}

The simplicity of the script, is based in both the power of the Web Audio API and the Mutation Observer API.

So how does this work? Lets break it down!

<!--more-->

Firstly, the script creates an [Audio Context](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), which the browser will use to create audio on the fly.

```
const audioCtx = new AudioContext()
```

Then, it makes a [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)!

```
const observer = new MutationObserver(..
```

The Mutation Observer will call its callback every time a mutation happens within its applied elements. In this script, you can see those elements defined in the final lines.

```
observer.observe(document, {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
}) 
```

Here, it applies to `document` (the whole webpage) and will trigger when any of `attributes`, `childList`, `subTree` & `characterData` properties change... which covers pretty much any change.

The final block of code manages the creation of the audio.

```
const oscillator = audioCtx.createOscillator()

oscillator.connect(audioCtx.destination)
oscillator.type = "sine"
oscillator.frequency.setValueAtTime(
  Math.log(mutationsList.length + 5) * 880,
  audioCtx.currentTime,
)

oscillator.start()
oscillator.stop(audioCtx.currentTime + 0.01)
```

The `oscillator` is responsible for [creating the wave form](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) (as in sound wave). Its type is set to be `sine`, which is a smoother more natural noise.

The oscillator's frequency is set based on how many mutations are observed (higher if there are more). Then the start and stop functions are called within a very tight timeframe, meaning you'll hear the initial plink and plonk that the script is named from.

The gist thread is well worth reading as well, people have gotten creative and made a lot of small adaptions to suit their own wants and needs!

➶ [Plink Plonk Gist](https://gist.github.com/tomhicks/6cb5e827723c4eaef638bf9f7686d2d8)