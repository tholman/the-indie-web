---
date: "2020-02-18T09:00:00Z"
title: "Always judge a book by its cover, bits'n'pieces."
category: code
more: "And the third tidbit?"
tags: ["bits'n'pieces"]
---

Last week I completed a small weekend project called [Always Judge a Book by its Cover](http://alwaysjudgeabookbyitscover.com/). Rather write about it, I thought it would be fun to go over some of the neater pieces of tech that have gone into it and break them down into small examples.

The first, and perhaps the most obvious, is the goop effect that sits on the header and in between each of the books (alternating from white to a light grey). This is created using JS and a `canvas` element. (Although CSS Houdini could be a good option in the future.)

{{< codepen poJvZYL >}}

You can have a look at the code above... Ultimately, it's a fairly simple effect that definitely looks a little more complex than its actual code.

The second little flair, which was a fun one to make, is the 3D CSS book. 

{{< codepen gOpMBjL >}}

The book gets its 3D effect from the CSS transform property. I used the `transform-style: preserve-3d;` property to really give it that semi-realistic feel. The pages are just divs with box shadows and rounded corners. And then to top it all off, an image of the cover is used on the front and back.

The inline `padding-top` stops the image from jumping as it loads. There are [lots of thoughts](https://css-tricks.com/what-if-we-got-aspect-ratio-sized-images-by-doing-almost-nothing/) on how to patch up this annoying part of loading images on the web, but I chose to stick with this old faithful method.

<!--more-->

The final nifty bit from this project is the `image` lazy loading. I didn't want to load over 20 images right when people enter the page. I also didn't want to include a big library. So I went for a quick, custom solution.

You can see in the demo below, how the images load once you've scrolled them into view. On the site version, I put the margin below the viewport, so you don't see the flash.

{{< codepen abOZRMe >}}

This uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which is now supported by all modern browsers. (Although, a fallback can never hurt.) The `noscript` tags are used to hold the HTML that I ultimately want to inject.

And there we have it, the bits'n'pieces breakdown of Always Judge a Book by its Cover.

➶ [Always Judge a Book by its Cover](http://alwaysjudgeabookbyitscover.com/)