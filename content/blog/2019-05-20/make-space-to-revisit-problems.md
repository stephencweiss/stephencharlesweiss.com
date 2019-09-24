---
title: 'Make Space To Revisit Problems'
date: '2019-05-20'
category: ['code comments']
tags: ['learning', 'growth', 'pragmatism']
---

> Make it work.
> Make it right.
> Make it fast.<sup>1</sup>

This maxim screams pragmatism. Don't optimize too early. Get something working. Then, and only then, make it better. It's also not my natural inclination. If I had my druthers, I would much rather do it _right_ the first time.

The challenge, of course, is that I don't know _how_ to do it “right.” At least not at first.

I sit down, plan my approach, trying to anticipate problems and how I'd solve them all in vain. Until I dive in and begin work, I don't know everything. I can't know everything.

There are known unknowns. Those are the ones I have contingencies for. Then, there are the Donald Rumsfelds (the unknown unknowns).<sup>2</sup> Those can't be known until we run into them, which only happens by going through the process and allowing all of the new information that turns up to evolve my understanding.

Then there's the problem of what to do _next_. This is particularly acute at the moment that we've achieved a working solution. Suddenly the strongest forces point in one direction: toward the next challenge that needs tackling, the next problem that needs solving. These forces come from well-intentioned managers, project deadlines, and even the more ephemeral cultural and societal expectations for constant, unyielding, progress toward something _better_.

There are some countervailing winds - calls to pause, reflect and revisit - but support is scarce. A recent Wall Street Journal report concluded that only 27% of companies have a defined post-mortem process and 94% of those were only set to occur after significant _failures_.<sup>3</sup> Different project methodologies (e.g., Agile and Scrum) bake in “retrospectives”, but their popularity is in constant flux and adherence is at the discretion of project managers (who have deadlines and delivery schedules they need to meet).

Make space to revisit problems - whether the role we're inhabiting is an individual contributor, a member of a team, or as a leader. Do it quickly and do it often. Do it for ourselves and do it for our team. Resist the pressure to move onto what's next. Pause, reflect, and importantly, _revisit_ because these activities pay dividends! If done quickly enough, revisiting a problem can pay down a debt incurred by implementing a working, but suboptimal, solution _before_ it has a chance to accumulate. And regardless of when it's done, the process will cement lessons learned through the process - preparing us for the _next_ problem or challenge.

# Pause Early, Pause Often, But Where?

## AKA Detecting The Smell And Its Source

> Work expands to fill the time available for its completion
> — Parkinson's Law<sup>5</sup>

While it would be nice to be able to revisit each part of our project and make each line perfect, reality and Parkinson's Law make such an approach untenable. Instead, it's a matter of identifying _which_ areas will yield the greatest return on our time. This can be a difficult exercise though.

It is challenging to identify these areas ourselves because having worked through the problem, we are too close. We _know_ the obstacles we overcame. We know why we made the decision to turn left not right or to include one variable and exclude another.

En route to a working solution, it is probable that we made dozens, if not hundreds, of little decisions. Teasing out the reasoning behind those decisions from the environment in which they were made is difficult because we're still carrying around the baggage associated with making them. So use the blissful ignorance of our peers, managers, coaches, etc., to our advantage. Get them to point out which areas need the most work.

Their absence from the decision process is a pro here because it forces us to focus on presenting the solution - not the context. By describing _what_ it's doing and _how_ it's doing it, they will be better positioned to spot areas where an approach seems excessively contrived.

Looking at a recent personal example might be helpful. I was building a pop-up menu that we could use through out our project. By clicking on the menu, a window would appear that would show the different options. Each menu item, however, could look different depending on the _type_ of item it was.

When I started the project, there had only been one type, but by the end I had multiple situations to handle and the logic to manage it had grown organically - adding one case at a time as it became an apparent need.

The presentation of my solution for review was going well until I got to the part where I handled the different item types. At that point, my manager's forehead creased, brows furrowed, and nose wrinkled. It was the face one would expect from someone who'd just stumbled into a cloud of noxious gas. In fact there was a smell - it was my code.

No one likes to be told that they smell, but sometimes it's necessary - because, as Febreze taught us, we're all susceptible to nose-blindness.<sup>6</sup> I'd become inured to the smell because I was there the whole time as it slowly got worse. Each new edge case that I handled by tacking on a new appendage to the code increased the smell - but I was oblivious.

At least now I knew _what_ smelled and could direct my efforts toward fixing it! And thank heavens I did because reasoning through the solution was difficult, even for me, and I'd just written it. Heaven have mercy on anyone who would have to modify it later.

# Refining Saves Times

> Shortcuts make for long delays.
> — Andy Hunt and Dave Thomas, _Pragmatic Programmer_

Once we have a working solution, it can be difficult to justify spending _more_ time on it, but that's because it's often difficult to see how interconnected problems are. If every problem were solved in a vacuum, then it wouldn't matter if a solution were complicated or not as long as it worked. The reality, however, is that most systems are in fact tightly coupled - from the climate<sup>7</sup> to the human body, and from helicopters to software.

This issue is particularly pernicious in software which has the allusion of mutability. When Marc Andreessen says “software is eating the world” I took it as assumed that part of the reason was the ease with which it could evolve and change.<sup>8</sup> This mutability is a law as Moore's Law is a law - that is, it does not occur naturally but only through the hard work of individuals striving to make it so.

> There's nothing more permanent, than a temporary hack.
> — Unknown, via Kyle Simpson

Jaron Lanier, in his book _You Are Not A Gadget_, described how easy it is for assumption to not materialize. Writing about MIDI, the software behind most digitized music production today, Lanier described how it evolved from a small application with a narrow use-case and accepted limitations into a core piece of infrastructure that resists all efforts at modification. He documented multiple, well-financed attempts to address some of limitations and how they all failed — there are just too many down stream dependencies and changing it would break too many things.

> So software presents what often feels like an unfair level of responsibility to technologies. Because computers are growing more powerful at an exponential rate, the designers and programmers of technology must be extremely careful when they make design choices. The consequences of tiny, initially inconsequential decisions often are amplified to become defining, unchangeable rules of our lives.
> — Jaron Lanier

It's not just software though. Any system of a reasonable complexity can become entangled and interdependent - weighed down by past decisions. By revisiting problems _early_ we can delay, if not forever at least temporarily, the moment at which progress is not feasible without tearing down the whole system and starting fresh. Whether we succeed or not, it's an enterprise worthy of our attention and effort.

# Revisiting Cements Lessons

K Anders Ericsson studies the effects of deliberate practice. Carol Dweck writes about growth mindsets. Angela Duckworth researches grit. Though approaching similar problems from slightly different angles, they all share a common thread running through their conclusions: people are works in progress.

Experience is one of the best ways to make progress. Each experience is its own well of information - accessible, though extraction requires effort. It's not _just_ taking 1,000 shots a day or playing 100 games of chess that make us better. It's the analyzing afterwards. The _deliberate_ in deliberate practice.

Building a habit of pausing is one way to do this. Pause at the completion of a problem to jot a note down about what we learned. Take a longer pause at the culmination of a project to discuss what went well and what didn't.

If problems and projects aren't as discrete, time can serve as a suitable substitute. As an example, I keep a note card next to me every day on my desk. I split the card in half and place my schedule on one side. On the other, I scribble lessons during the day. At the end of the week, I gather them all and use them as key inputs into my weekly review process. They are the raw materials, the product of going to the well, that I then use to produce the newest version of myself.

When things don't go exactly right, when we stumble or don't know something - it's easy to get upset and feel like we failed. However, by revisiting the problem, we can learn from those stumbles. In so doing, we are preparing ourselves for the future - arming ourselves with new skills and insights. It also breeds a sense of understanding and self-forgiveness.

By revisiting problems and making growth more tangible, we acknowledge we are not finished products. It also shows how impossible precognition is proving that mistakes are inevitable. There are some lessons we can only learn _through_ experience, so self-abasement is unjustified. Learning to forgive the mistakes and grow _from_ the lessons they bring is much more productive as we emerge more prepared for the next challenge.

# Conclusion

> The greatest mistake in business and life is not outright failure, it's becoming successful without understanding why you were successful in the first place.
> — Robert Burgelman

Making space to revisit problems is an investment. While it's sticker-price may seem high, the time it takes to revisit a problem and ask probing questions about what lessons were learned, what went well, and what could have gone better will seem like a pittance when compared against the time saved in the future.

For me, while my natural inclination may still be “do it right the first time” - the process of recognizing the value in revisiting problems has demonstrated that it's not only an impractical aspiration, but short-sighted. Doing it right the first time implies an absence of potential lessons and leaves me fixed. Challenging myself to document what I learned reinforces the fact that I'm a work in progress. In other words, I'm human.

## Footnotes

- <sup>1</sup> [Make it work, make it right, make it fast](http://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast)
- <sup>2</sup> [Donald Rumsfield's Unknown Unknown news conference](https://youtu.be/GiPe1OiKQuk?t=6)
- <sup>3</sup> [Don't Just Learn From Failure; Learn From Your Successes - WSJ](https://www.wsj.com/articles/dont-just-learn-from-failure-learn-from-your-successes-11557503314)
- <sup>4</sup> [Turtles all the way down](https://en.wikipedia.org/wiki/Turtles_all_the_way_down)
- <sup>5</sup> [Parkinson's Law](https://en.wikipedia.org/wiki/Parkinson%27s_law)
- <sup>6</sup> [Febreze #Noseblind](https://www.youtube.com/watch?v=2jQvAtmosdQ)
- <sup>7</sup> [Tristan Harris on Kara Swisher](https://www.vox.com/recode/2019/5/6/18530860/tristan-harris-human-downgrading-time-well-spent-kara-swisher-recode-decode-podcast-interview)
- <sup>8</sup> [Why Software Is Eating the World – Andreessen Horowitz](https://a16z.com/2011/08/20/why-software-is-eating-the-world/)
