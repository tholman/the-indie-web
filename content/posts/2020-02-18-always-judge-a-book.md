---
date: "2020-02-18T09:00:00Z"
title: "Always judge a book by its cover bits'n'pieces."
category: code
more: "And the third tidbit?"
tags: ["bits'n'pieces"]
---

Last week I completed a small weekend project called [Always Judge a Book by its Cover](http://alwaysjudgeabookbyitscover.com/), and rather writing about it, I thought it would be fun to do a breakdown of some of the neater pieces of tech that have gone into it as small breakout examples.

The first one, and perhaps most obvious, is the goop effect that sits on the header, and in between each of the books (alternating from white to a light grey). This is done with the JS `canvas` element (although using CSS Houdini would be a good option in the future as well).

{{< codepen poJvZYL >}}

You can have a look at the code above... ultimately its a fairly simple effect that definitely looks a little more complex than its code.

The second little flair, which was a fun one to make, is the 3d CSS book. 

{{< codepen gOpMBjL >}}

The book gets its 3d effect by using CSS transforms, as well as the `transform-style: preserve-3d;` property, to give it that semi-realistic feel. The pages are just divs with box shadows and rounded corners. And then to top it all off, the image on the front and back. 

The inline `padding-top` is there to stop the image from jumping as it loads. There's [lots of movement](https://css-tricks.com/what-if-we-got-aspect-ratio-sized-images-by-doing-almost-nothing/) in patching up this annoying part of loading on the web, but I chose to stick with this old faithful method.

<!--more-->

The final piece that's nifty is the `image` lazy loading. I didn't want to load over 20 images as people enter the page, and also didn't want to include a big library, so I went for a quick custom solution. 

You can see in the demo below, how the images load once you've scrolled them into the screen. On the site version, I put the margin below the viewport, so you don't see the flash

{{< codepen abOZRMe >}}

This is using the [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is now supported by all modern browsers. (Although a fallback can never hurt). And is using `noscript` tags to hold the HTML that I ultimately want to inject.

And there we have it, the bits'n'pieces breakdown of Always Judge a Book by its Cover.

➶ [Always Judge a Book by its Cover](http://alwaysjudgeabookbyitscover.com/)