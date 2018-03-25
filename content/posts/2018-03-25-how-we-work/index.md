---
path: "2018-03-25-how-we-work"
date: "2018-03-25T13:00:00-04:00"
title: "How We Work"
excerpt: "Software development is continuously looking for better ways to work"
category: "Work"
tags:
    - Work
    - Agile
    - Nimble
---

Everywhere I've worked has a different process for managing the work that software developers do.

When I first started my career, I didn't really care about how work was assigned, measured, and managed. Now I consider this an extremely important line of questioning to ask when I'm being interviewed.

How a place works is very important to quality of life, to everyone's peace of mind, and to the company's culture. How a place works is a significant amount of the interview questions I ask potential employers.

# Types of work

I broadly categorize software development work into three categories. There is some overlap and there is arguments for more categories and finer distinction, but these rough categories are simple enough for discussion.

1. Maintenance & Customer Operations
2. Feature Development
3. Pipeline Development

## Maintenance & Customer Operations

Maintenance & Customer Operations include:

* Critical bug fixes.
* Time-consuming bug investigations, reproductions, and maybe rebuttals.
* Manual, in-frequent tasks like entering new rows into a database that never got a management portal.
* Manual tasks that were never automated.
* Any tasks that non-programmers can't be trusted with for whatever business reason.
* And so much more.

The one over-riding characteristic I'm trying to emphasize here, is that Maintenance & Customer Operations is a **continuous cost in time and drain upon resources**.

Even worse, **the cost of this work is often unpredictable.** The demands of the customer (internal or external to the company) are unpredictable. When anything goes wrong is unpredictable.

I'm going to come back to this later on, but I just want to point out that every manager I've ever worked for hates unpredictability because their bosses in upper management want definite dates.

## Feature Development

Feature Development includes:

* New Software Features.
* Paying down technical debt. This item may or may not belong here, but paying off deliberately-accepted technical debt can provide value.
* Greenfield development.
* Planned work.
* Revenue generating value.

The characteristic here is that features are good. **Features is what your manager wants to report to his manager. This is the "business value" that I hear so much about.**

I'm going to come back to this later on too, but I just want to point out that the definite dates of completing these features is what managers want to report because their managers asked for those definite dates.

## Pipeline Development

Pipeline Development includes:

* Anything that decreases the cost of Maintenance & Customer Operations.
* Anything that decreases the cost of or that speeds the delivery of Feature Development.

Some examples might be:

* Setting up a build server for your code.
* Setting up a testing framework to increase confidence in software.
* A management portal for users to change things themselves.
* Automating manual tasks.

The characteristic here is that **pipeline development provides an increased of quality of life for everyone connected to software.** An increased quality of life leads to all sorts of great productivity improvements.

Less bugs and faster features are great for everyone. Less manual, repetitive tasks are good for employee retention.

And it's not often mentioned, but almost everywhere has one or two employees who can never be promoted, fired, or assigned to other tasks because they manually do an unreasonably complicated but vital set of tasks. By removing manual tasks, those blockers are removed.

# Assigning Work

**When I say "assign work", I mean in how management chooses to delegate work.** How they determine _what_ work to be done, is a different subject.

I have no categories here. The machinations of how work assigned is often not visible to the employee. All sorts of factors might be at play.

If one person gets the same category of work assigned and no one else does. That one person is stuck there. They will never move up so long as no one is there to replace them.

Most people call having a monopoly on a subject "job security".  I call it a liability. Eventually management will cover their bases and make sure multiple people have knowledge of that area, and then you're sitting there having lost your monopoly, and you haven't shown that you can provide value elsewhere. That may not be your fault, you might not have had the opportunity to show that. But do your best anyway to learn as much of the business as you can.

**How work may be assigned depends upon skill-sets, availability, knowledge of an area, management politics, and so much more.**  I have no simple concepts for here.

I will say that playing 20 Questions Game with your interviewers on how they assign work is fun, because they probably haven't put extensive thought into why or how they assign work.

# Managing work

The infamous spreadsheet of tasks held by the master Project Manager/Customer Account Representative/Scrum Master/whoever is being replaced with the infamous giant backlog of tasks in an online task tracker tool.

The specific online task tracker tool doesn't matter much really. Yes, some have nicer user experiences, but it doesn't matter much.

**What does matter is who controls the work and how work is broken down.**

Many work methodologies have the concept of a buffer between software developers and "the business". The buffer could be a person or it could be a unit of time.

Many devotees of "Sprinting" like in Scrum are very insistent that the contents of a Sprint never change once started. The software developer is protected from interference inside the current sprint for the length of that sprint, which I've seen most often as two weeks.

I've never once been in a sprint where the sprint wasn't changed extensively in the middle. I'm not trying to hate on Scrum or Agile methodologies. I'm trying to say that **we often get stuck following the processes and forget the intent of those processes. "following the letter of the law but not the spirit"**

## The Management Buffer

To expound more on the buffer, I'm going to skip going over "time buffers" and talk about the more important one "management as a buffer". Management could be your direct boss, your boss's boss, or anyone with significant input.  **Management is anyone who can tell you what to do.**

I have two mental categories for management:

1. Scared.
2. Confident.

**Management that is scared is worth than useless.** They will bow to anyone who complains, rush to appease the whims of anyone, obsess over insignificancies, and generally be as fickle as a weather-vane.

Scared management will make things take longer by interrupting tasks with other tasks, complain when the interrupted task isn't done, blame others, drive off good coworkers, and eventually the only coworkers left will be those coworkers who can't find jobs elsewhere.

**Management that is scared provides zero buffer and amplifies the worst inputs.**

Management might be scared for all the same reasons you might be: fear of losing job, fear of making someone unhappy, fear of being wrong, or fear of any number of other reasons.

**Management that is confident has the potential to be a buffer that improves productivity.**  I don't want to say that all confident management is good. Many confident people are completely wrong. But the _potential_ for productivity is there.

Confident management will stand their ground and ask why something should be done.

## Why a buffer

Here's where I go back and mention how work is broken down. All work may eventually be broken down into discreet chunks that should be done all at once.

For example, many small bug fixes are a discreet chunk of work that should be done all at one time without interruption, or more bugs will occur and resuming that interrupted work would be very time costly. Or another example could be small changes that will eventually compose a new feature.

Chunks of work that are interrupted add to the list of "WIP" or "Work In Progress" which adds to daily mental overhead, a growing task list, discontentment with lack of progress, and all sorts of ills.

**The management buffer limits Work In Progress by not interrupting discreet chunks of work.**

### Management priorities

Confident management can make life great in a whole host of other ways, but I'm just going to mention one other tendency.

**Confident management will measure need and balance the three types of work.**

* Maintenance & Customer Operations
* Feature Development
* Pipeline Development

**Scared management skips prioritization and goes straight to "everything is the most important", which means nothing is.** So the software developer is left to measure priority on their own and that will become "what task must I do to be yelled at the least". And that's a toss up between what is most visible:

* Maintenance & Customer Operations
* Feature Development

When Pipeline Development is left by the way-side, often so is technical excellence, innovation, and employee retention.

## Maintenance & Customer Operations are a blocker

**I need to mention these once more. Maintenance & Customer Operations are a blocker to giving definite dates on a project.**

I'm saying "Definite Dates", but I'm really meaning "guesstimates". We don't know when things will be done, but for the sake of argument let's say that we can estimate feature time-to-develop pretty closely.

**Maintenance & Customer Operations are unpredictable, costly, and continually eating resources. Scared management that doesn't limit the impact of these problems via Pipeline Development, is going to have even more wildly inaccurate dates.**

The fear from missing dates or from being wrong is a feedback loop. Rushing to complete more Maintenance & Customer Operations without solving the problem just amplifies the problem until it's all a development team does, and then we call that team "operations helpdesk".

The point is that Pipeline Development shouldn't be ignored. Every upper management or customers wants to know when things will be done, and we need to limit tasks that hurt our estimates.

## Software Development Methodologies

**There is no best Software Development Methodology. The only thing that matter is what works best for the company.**

Every company has at least one employee that continuously says "my old employer did X and Y, we need to do X and Y because of best practices". Even I've said that. We start to go down the road of "Scrum for Scrum's sake" instead of thinking about why we did Scrum in the first place.

As time goes on, what methodology is used doesn't matter as much to me, so long as it works in the context of that company and team. I do favor being as agile as possible, but that doesn't work for every industry or project type. And it's much more important to me that we are a cohesive team and are well managed.

# Summary

**Start asking about how work is done in your interviews. Being able to effectively work with your team and to effectively work with your manager is just as important as having the latest technology buzzwords.**
