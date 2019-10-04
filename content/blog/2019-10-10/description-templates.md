---
title: 'Gitlab Description Templates'
date: '2019-10-10'
category: ['programming']
tags: ['product management', 'issues', 'tickets', 'templates']
---
We use templates to help write descriptive tickets or MRs on various projects at work.<sup>1</sup> Then I started working on a new project and when I reached for them, I found the templates hadn’t been set up.

I didn’t realize just how much I liked them until I found myself in a position where they weren’t available. I took their absence as an opportunity. I set out to set up some basic ones and get the process started for the team.

To do that, however, I needed to learn a few things. It turns out that there are multiple types of templates (issues _and_ merge requests) and that they can have some levels of automation built into them (through quick actions<sup>2</sup> on Gitlab). 

The actual creation of the process is very straightforward:
1. Create a directory in your project `.gitlab/issue_templates/` or `.gitlab/merge_request_templates` depending on the template type you’re interested in.
2. Create a Markdown (`.md`) file with the template. Name it how you’d like the template to appear in the UI. 
3. Push the changes to the `repo` and merge them into Master.

Once that’s done, you should have templates available.

## Parting Thoughts
First, While we use Gitlab at work, it turns out that Github has nearly identical capabilities.<sup>3,4</sup>.

Secondly, I loved the motivation for the feature. According to Gitlab:
> We all know that a properly submitted issue is more likely to be addressed in a timely manner by the developers of a project.  
> Description templates allow you to define context-specific templates for issue and merge request description fields for your project, as well as help filter out a lot of unnecessary noise from issues.  

So true. Now, go forth and create better tickets powered by templates. 

## Footnotes
* <sup>1</sup> In Gitlab parlance, these are actually called Description Templates. [Description templates | GitLab](https://docs.gitlab.com/ee/user/project/description_templates.html)
* <sup>2</sup> [GitLab Quick Actions | GitLab](https://docs.gitlab.com/ee/user/project/quick_actions.html)
* <sup>3</sup> [Creating issue templates for your repository | GitHub Help](https://help.github.com/en/articles/creating-issue-templates-for-your-repository)
* <sup>4</sup> [Creating a pull request template for your repository | GitHub Help](https://help.github.com/en/articles/creating-a-pull-request-template-for-your-repository)

