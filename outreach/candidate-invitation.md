# Candidate invitation — standard text

This is the **only** outreach email this guide sends to candidates. It goes to every
candidate in every covered race, with nothing changed but the bracketed fields.

Publishing it here is deliberate. "Every candidate received the same invitation" is a claim
about a private act, and the only way to make it checkable is to publish the text and let
the git history show whether it was ever quietly tailored for someone. If this file needs to
change, change it for everyone and re-send, or don't change it.

**Rules for using it:**

- Send to every candidate in a race on the same day, with the same deadline.
- Never add a personal note, a compliment, or anything not in this template. A friendlier
  email to one candidate is differential treatment even if the published page is identical.
- Log the send in each candidate record: `participation.contacted`, `contacted_date`.
  The build **fails** if some candidates in a race are contacted and others are not.
- If someone replies with questions, answer factually and log nothing else. Do not discuss
  strategy, messaging, or anything that could read as coordination with a campaign (§13).

---

**Subject:** Livingston Voter Guide — your entry for the [RACE NAME] race

Dear [CANDIDATE NAME],

I'm [MAINTAINER NAME], and I build the Livingston County Voter Guide
(livingstonvoterguide.org), a nonpartisan guide covering every candidate for every office on
the Livingston County ballot — including the nonpartisan races that are hardest for voters to
find information about.

I've drafted an entry for you for the November 3 general election: [DRAFT ENTRY URL]

Everything in it is sourced from public materials — your campaign website, your professional
biography, county filings, and reported election results. I'm writing to give you the chance
to correct it and to add your own words.

Three things, all optional:

1. **A candidate statement of 120–220 words, in your own words.** It will be published as you
   write it, attributed to you, and not edited for content. The same word range applies to
   every candidate in this race.
2. **A photo you own or have permission to publish.** Without one, no photo appears on your
   entry.
3. **Corrections** to anything in the draft.

How this guide works, so you know what you're participating in:

- It does not endorse candidates and never will. There are no rankings, scores, or
  recommendations of any kind, and no "lean" or ideology ratings.
- Every candidate in this race is receiving this identical email, with the same deadline and
  the same word limit.
- If you don't respond, your entry stays up, built from public sources, and the page will
  note that you were contacted and did not respond. That is recorded the same way for
  everyone, and it is not a comment on you.
- I can't coordinate with your campaign and am not asking to. This is only about whether your
  entry is accurate.

One disclosure you should have up front: I am a Democratic precinct delegate in Livingston
County. I built this guide because there is almost no neutral information available on local
and nonpartisan races, and I've tried to make the method rather than my word be the thing you
trust. The full methodology is published at livingstonvoterguide.org/about — identical fields,
identical structure, and an identical word budget for every candidate, with a source required
for every claim. The entire dataset and every edit ever made to it are public at
[REPO URL]. You're welcome to hold me to it.

If you can reply by [DEADLINE DATE], your information will be live well before absentee
ballots go out. Corrections are welcome at any time after that as well.

Thank you for your time,

[MAINTAINER NAME]
[MAINTAINER EMAIL]
livingstonvoterguide.org
