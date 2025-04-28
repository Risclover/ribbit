from app.models import Rule
from app.extensions import db


def seed_rules():
    rules_by_community = {
        1: [
            {
                "title": "Must be about cats",
                "description": "Your submission must be about cats (Rule 1)."
            },
            {
                "title": "No claiming ownership of another person's cat",
                "description": "Poster has falsely claimed that a cat posted is their own. Note: Lying and claiming/posting someone else's cat as your own will result in an immediate ban, with no warnings given. (Rule 2)."
            },
            {
                "title": "No NSFW, animal abuse, or cruelty",
                "description": "Contains content that is NSFW, features animal abuse, or cruelty (Rule 3)."
            },
            {
                "title": "No asking for upvotes",
                "description": "No posts or comments that ask for upvotes (Rule 4)."
            },
            {
                "title": "No fundraisings, crowdfunding, competitions, or advertisements",
                "description": "Fundraisings, crowdfunding, competitions, or advertisements (Rule 5)."
            },
            {
                "title": "Don't be insulting, harassing, or creepy",
                "description": "Be civil. We have a strong, bright-line policy against insults, name-calling or harassment, and will ban you without notice for such conduct. If a photo has a person in it along with a cat, don't even think of being creepy or rude to that person. This includes any comments on people's appearance, either positive or negative!"
            },
            {
                "title": "No personal information",
                "description": "Do not post personal information (this includes Facebook links as it can be easily traced back)."
            },
            {
                "title": "No meme, image macro, low-effort content",
                "description": "Original content is preferred. No image macros, memes, or similar low-effort content."
            },
            {
                "title": "Recent/Egregious repost",
                "description": "Repost of recent or currently popular post from another community for the purpose of farming karma (Rule 10)."
            },
            {
                "title": "Reposts and Crossposts",
                "description": "Reposts are allowed (and crossposts are too, don't confuse them!), within reason."
            },
            {
                "title": "No asking what gender your cat is",
                "description": "No gender my cat posts."
            }
        ],
        2: [
            {
                "title": "Frequent repost.",
                "description": "This post has been flagged as a recent repost or a repost from the very frequent repost list at the top of the sub."
            },
            {
                "title": "Targeted harassment.",
                "description": "No harassment will be tolerated."
            },
            {
                "title": "Zero-effort title.",
                "description": "All posts require titles that relate to the content of the post. No click-bait or \"haha so true\" titles are allowed."
            },
            {
                "title": "Shock/gore/violent sexuality.",
                "description": "This community does not accept posts containing shock/gore/violent sexuality."
            },
            {
                "title": "Be nice.",
                "description": "Be nice."
            }
        ],
        3: [
            {
                "title": "Excessive Self-Promotion",
                "description": "It's ok to promote your own content, or content that you're otherwise vested in, but it should not constitute a majority of your contributions."
            },
            {
                "title": "Where's the Javascript?",
                "description": "Demos can be fun, but they really don't provide for much discussion unless code is provided as well."
            },
            {
                "title": "/c/JavaScript is not a support forum",
                "description": "Is this a help request? Try /c/LearnJavascript instead!"
            },
            {
                "title": "Java !== Javascript",
                "description": "Java is not the same as Javascript."
            },
            {
                "title": "Remember the human.",
                "description": """\"Remember the human.\"

        It's okay to disagree, but we should attack ideas, not people."""
            },
            {
                "title": "Low-effort content (listicles, memes, etc.)",
                "description": "Low-effort content such as listicles, memes, clickbait, etc. is prohibited."
            },
            {
                "title": "Advertising",
                "description": "Advertising paid products and services is prohibited."
            }
        ],
        4: [
            {
                "title": "No number posts, memes, violence, compilations, products, or YouTube links",
                "description": "We have a number of banned topics including memes/image macros, posts centered around numbers, violence, compilation videos, and YouTube videos."
            },
            {
                "title": "No NSFW/NSFL content",
                "description": "NSFW/NSFL links or images are not allowed. NSFW text posts and comments are allowed (\"Say it, don't show it.\")."
            },
            {
                "title": "No reposts of last 2 months or highly upvoted",
                "description": "Frequent or common reposts, or reposts from the past 2 months and highly upvoted may be removed. When you report posts, please include a link to the original version of the post. Please help keep this community satisfyingly fresh by not intentionally reposting content that has already circulated regardless of when. If it appears you are intentionally reposting old content repeatedly, we may resort to limiting your posting privileges."
            },
            {
                "title": "Mods reserve the right to remove content or restrict users' posting privileges as necessary",
                "description": "Mods reserve the right to remove content or restrict users' posting privileges as necessary, if it is deemed detrimental to the community or to the experience of others."
            },
            {
                "title": "Title must represent the content",
                "description": """- The title of each submission must describe the content shown. Any user should know the contents of a link before clicking.

- Clickbait-esque titles are not allowed.

- Titles claiming possession, original content, event participation, etc. (such as "My...", "Mine...", "Our...", "We...", etc.) in which another's original work/content may be mistaken as OP's will be removed."""
            },
            {
                "title": "No claiming non-OC as your own content",
                "description": "False claims of authorship for content (\"I made\", etc when you didn't make the content) will result in a ban. Please also cite sources for art submissions when possible and do not spam."
            },
            {
                "title": "No spam",
                "description": "No spamming whatsoever."
            },
            {
                "title": "Be civil and kind",
                "description": """- Please abide by proper etiquette at all times.

- Please keep the comments section civil and friendly. General cursing/foul language are allowed.

- The definition of what truly is "Oddly Satisfying" is subjective and unique to each user. Please respect their definition."""
            }
        ],
        5: [
            {
                "title": "No \"sad\" content",
                "description": "No \"sad\" content, such as pics of animals that have passed away, animals that have been injured/abused, or sob stories (e.g. found him in a dumpster, finding abandoned animals, sick/survived cancer)."
            },
            {
                "title": "No captioned pictures/videos",
                "description": "No comics, captioned pictures/videos, or photos of just text. No memes or snapchat captions."
            },
            {
                "title": "No asking for upvotes or approval",
                "description": "No post titles asking for upvotes or approval, such as \"any love for...\", \"what does /c/aww think of...\", or \"this didn't get much love on...\", or \"karma machine\", \"sort by new\", \"don't scroll past\", \"not your typical aww\", \"c/aww needs more [X] animals,\" \"name my pet.\""
            },
            {
                "title": "No harassment",
                "description": """No slurs or harassing comments.

This includes racial slurs, sexually inappropriate comments, and personal attacks on users or their animals.

Examples include: pitbull "statistics", reduction of animals to food items (e.g. calling a cow a burger/steak, calling a pig a bacon, anything about Asian people eating cats/dogs), advocating animal abuse, etc."""
            },
            {
                "title": "No NSFW content",
                "description": "This includes not only inappropriate images but also inappropriate text, innuendo, or inappropriate jokes in comments. No comments about how dangerous certain domesticated breeds are, or about eating the animals in the post."
            },
            {
                "title": "No asking for donations or adoptions",
                "description": "No asking for donations, sponsorship or adoptions."
            },
            {
                "title": "No bots or bot-like behaviour",
                "description": "No bots or bot-like behaviour. This includes copypasting titles and/or comments, or generally acting like a script/bot. No flooding (more than 4 posts in a 24 hour period). New users (< 3,000 comment karma) may only post OC, vice reposts or stock photos."
            },
            {
                "title": "No lying about ownership",
                "description": "No false claims of content ownership."
            },
            {
                "title": "No social media",
                "description": "No links to social media content, whether in comments, submissions, image/video descriptions (including imgur gallery descriptions for direct links), or as superimposed text in an image. Handles are okay in comments as long as they're not links."
            },
            {
                "title": "We're here to help, but please provide a link/URL when you contact us",
                "description": "If you need to contact the mods, you'll need to provide a link/URL to whatever it is that you're talking about. Failure to do this may mean that you get ignored. We have other users to help as well, and making us dig through your profile to find an issue means we have less time to help others and deal with the rest of the community."
            }
        ],
        6: [
            {
                "title": "No Memes",
                "description": "No memes. This includes references in titles of your post (e.g. \"banana for scale,\" \"potato quality\")."
            },
            {
                "title": "No Related Posts",
                "description": "Related posts must be in the comments of the original. Posts that acknowledge, \"one-up,\" or relate specifically to another post are not allowed (e.g. \"I see your X and raise you Y\")"
            },
            {
                "title": "No X-Posts or Reposts",
                "description": """Do not post something that has been submitted to Ribbit before, even if you were the one who posted it.

Exception: If a post is deleted or removed from /c/mildlyinteresting for breaking the rules less than one hour after being submitted or receives less than 100 upvotes, we allow the submitter to resubmit a fixed version of the post. Posts deleted or removed from other communities are not exempt from rule 3."""
            },
            {
                "title": "Original [OC] Photographs Only",
                "description": """a. All submissions must be original and non-animated photographs. No gifs, videos, or web sites.

b. All submissions must be original content. If you didn't take the picture, don't post it.

c. Software glitches/errors, overlaid text, arrows, scribbles, and other substantive edits are not allowed, although you may censor personal information per Ribbit-wide rules.

d. Albums are not allowed, but side by side photographs (within the same image) are okay if they adhere to the rest of the rules."""
            },
            {
                "title": "No Screenshots",
                "description": "No screenshots. We define a screenshot as a screen grab. This means no images of screens, pictures of screens taken with a different device, images that have been partially or fully generated by a computer, or pictures of printed out screenshots."
            },
            {
                "title": "Titles Must Be Exact But Concise Descriptions",
                "description": """a. Titles must not contain jokes, backstory, or other fluff. That information belongs in a follow-up comment.

b. Titles must exactly describe the content. It should act as a "spoiler" for the image. Specify what your picture shows; do not simply say “I saw this” or something similar. If your title leaves people surprised at the content within, it breaks the rule!

c. Titles must not contain emoticons, emojis, or special characters unless they are absolutely necessary in describing the image."""
            }
        ],
        7: [
            {
                "title": "Posts must be humorous",
                "description": """At the very least, posts must make an attempt at humor.

Do not make posts that cannot be funny in any way, such as asking for help with programming."""
            },
            {
                "title": "Posts must strictly be related to programming/programmers",
                "description": "We do not allow memes that can apply to more than just programming as a profession, or general tech related jokes/memes (such as \"running as administrator\", sudo, USB or BIOS related posts)"
            },
            {
                "title": "No reposts",
                "description": "Content that is part of top of all time, reached trending in the past 2 months, or has recently been posted, is considered a repost and will be removed."
            },
            {
                "title": "No low-quality content",
                "description": """We also remove the following to preserve the quality of the community, even if it passes the previous rules:

- Feeling/reaction posts
- Software errors/bugs
- Low effort/quality analogies (enforced at moderator discretion)"""
            },
            {
                "title": "Hotlinking to outside sources is not allowed",
                "description": """Hotlinking is not allowed without explicit permission from the mods, unless it is obvious that the host allows it (e.g. Imgur or other image hosting services).

Rehosting for the purposes of offering a direct link to an image is allowed in the comments."""
            },
            {
                "title": "Any common post will be removed if it's not novel",
                "description": """Any post on the list of common posts will be removed.

Established meme formats are allowed, as long as the post is compliant with the previous rules."""
            },
            {
                "title": "Put effort into your titles",
                "description": "Titles must also be creative, high effort and relevant to the content. Titles such as “Interesting title”, “.”, “print(title)”, and “I don’t know what to put here” are not allowed."
            },
            {
                "title": "Posts or comments must not focus around merchandise or advertising",
                "description": "Posts or comments must not focus around merchandise, merchandisable goods (mugs, t-shirts, etc), or advertising. These posts are considered spam and removed on sight. Permabans will be handed out."
            }
        ],
        8: [
            {
                "title": "Post MUST begin with YSK and have appropriate flair. Post must be a YSK as defined below.",
                "description": """This is a community to share tips and tricks that will help yourself improve on activities, skills and various other tasks.

YSKs are about self-improvement on how to do things, not for facts and figures, which is what <a href="https://ribbit-app.herokuapp.com/c/13" target="_blank">/c/TodayILearned</a> is for."""
            },
            {
                "title": "In the text body of your post, you must include \"Why YSK:\" followed by an explanation.",
                "description": """You must include a separate section in the text body of your post with "Why YSK:" followed by an explicit explanation on how the info helps people self-improve in a skill, task, or ability.

The explanation can't be a personal anecdote, instructions, or a repeat of the post title. It must be in a separate paragraph at the beginning or end of the text body so to be easily identifiable."""
            },
            {"title": "YSKs regarding Ribbit, Facebook, Twitter or any other social media are NOT ALLOWED.", "description": ""},
            {"title": "YSKs with referral links to sites such as Dropbox or Amazon are NOT ALLOWED.", "description": ""},
            {"title": "Ideas or concepts based in conspiracy will be removed at the discretion of the moderators.", "description": ""},
            {
                "title": "Call to arms / support for charities, organizations or political parties WILL NOT BE ALLOWED.",
                "description": "Posts about elections, voting, bills etc. are also covered under this."
            },
            {
                "title": "No spam or self promotion.",
                "description": "This community is not the place to be self-advertising your websites, products and services. YSKs that are spamming websites, products and services will be dealt with at the discretion of the moderators and may result in action against the user posting the YSK."
            },
            {
                "title": "YSKs regarding computer shortcuts are not allowed.",
                "description": "YSKs regarding computer shortcuts are no longer allowed as of June 2, 2014. It is advised that you use the search function in this community or any other technology based community to search for posts containing shortcuts for your OS"
            },
            {"title": "Citations are required for YSKs regarding health and science related topics.", "description": ""},
            {
                "title": "Don't shitpost. Be civil - Remember the human.",
                "description": """Don't shitpost.

Be civil and Remember the human

No hate speech, bigotry etc. This will result in bans."""
            }
        ],
        9: [
            {
                "title": "Don't be an asshole / be respectful to others.",
                "description": """Don't be an asshole. Pretty simple. This does not mean you can report people for saying mean things to you and hurting your feefees. We're not a safe space here, if you make a comment or an argument, be prepared to defend it if people call you out on your shit. But don't resort to name calling or telling people to kill themselves. Blatant racism, sexism etc is punishable with a permanent ban. the word CUCK is banned.

Just exercise basic human decency and you'll be fine. I know it's hard."""
            },
            {
                "title": "The title of your post must contain an actual, concise question. No clickbait titles.",
                "description": "The title of your post must contain an actual question. Keep your question concise, and don't make a clickbait title like \"What do you think of this?\""
            },
            {
                "title": "Do not make posts asking about a specific person or group's actions, behavior, or thinking.",
                "description": """Do not make posts trying to figure out a specific person's actions, behavior, or thinking.

NOBODY KNOWS WHAT HE/SHE IS THINKING. ASK THEM! Don't ask men when you really want to ask man.

That applies to your own thinking, too. This is not a place to seek advice for specific situations.

This also goes for wanting to suss out men or women's behavior as an entire gender. We don't want people speculating into the actions and behaviors of people they arent."""
            },
            {
                "title": "Do not make posts looking for affirmation of your appearance, personality or body features.",
                "description": "Do not make posts looking for affirmation of your appearance, body features, personality traits or life situation. Do not make posts asking about what you look like or what you should wear or what makeup men like. Nobody gives a shit. Go make an instagram post."
            },
            {
                "title": "YES/NO/\"Does anyone else\" questions will be removed at our discretion.",
                "description": """Taken from the mod post:

If we feel like your question can be answered with a "yes" or a "no", asks "does anyone else do/feel this way", or asks "is X behavior normal", we will remove it. This also includes 'A or B?' or "What would you rather?" type questions

This is pretty straightforward. Please exercise some common sense here."""
            },
            {
                "title": "Do not post negative/forever alone rants.",
                "description": "Do not post negative/forever alone rants."
            },
            {
                "title": "No questions about gifts or presents.",
                "description": "Seriously, no gift threads. If you are going to ask \"what should I get\"/\"what would be a good gift for\" someone, then go to somewhere else right now and post your question there because we will not take this shit. This also includes asking for other ways to celebrate/thank/show appreciation to someone."
            },
            {
                "title": "No agenda posting, and no brigading/complaining about other subs.",
                "description": """Don't post a question that is obviously geared towards creating an echo chamber where you can either a) create a circlejerk about how everyone agrees with you or b) get into fights with everyone because you're right and everyone else is a shitlord/plebian/whatever. If you want to get into stupid slapfights with people, then take it somewhere else.

Do not link to other communities with the intention to draw attention to a certain post or comment. Only archived Ribbit post links will be approved."""
            },
            {
                "title": "Medical advice is not allowed here.",
                "description": "Medical advice is not allowed here. We recommend talking to a medical professional instead of the Internet."
            },
            {
                "title": "Don't comment/post self-deprecating content looking to get karma or attention.",
                "description": "Don't comment/post self-deprecating content looking to get karma or attention. Example: if someone asks what your favorite thing about your girlfriend is and you reply with \"lol that she actually existed lol\" or \"she's my hand lol-ercopter\", we're going to issue a temp ban to you for the first offense and a permaban the next time. Keep your replies on-topic for people asking questions."
            },
            {
                "title": "We do not allow surveys or promotional content.",
                "description": "Message the moderators with any questions/comments. This includes external sites looking to farm responses for content. We don't currently allow surveys or promotional content."
            },
            {
                "title": "Overly political questions will be removed.",
                "description": "Overly political questions will be removed."
            },
            {
                "title": "Questions overly sexual in nature will be removed.",
                "description": "\"How to sex/sexiest sex you’ve ever sexed/when-where-what sex do you like/ why is sex thing sexy?\" and questions of that nature will be removed at our discretion."
            }
        ],
        10: [
            {
                "title": "All posts must make an attempt at humor.",
                "description": "Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed."
            },
            {
                "title": "No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
                "description": "Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed."
            },
            {
                "title": "No reposts.",
                "description": "If a given piece of content has appeared on /c/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned."
            },
            {
                "title": "No personal info, no hate speech, no harassment.",
                "description": "No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, or community will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Ribbit's policies, there is zero tolerance for this."
            },
            {
                "title": "No politics or political figures.",
                "description": "Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. Try c/politicalhumor instead."
            },
            {
                "title": "No forbidden titles, low-effort titles, or posts about Ribbit cakedays.",
                "description": "No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Ribbitor. Posts with titles such as \"I got banned from /c/___\" or \"This got removed from /c/___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles, titles which circumvent other rules, and titles comprising excessive or disruptive emojis are similarly disallowed."
            },
            {
                "title": "No gore, pornography, or animal cruelty.",
                "description": "Gore, pornography, and sexually-graphic images are not allowed. Try /c/NSFWfunny. Animal cruelty is strictly forbidden. All other NSFW content must be tagged as such."
            },
            {
                "title": "No unoriginal comics.",
                "description": """Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.

            All comics submitted to /c/Funny must be hosted either on Ribbit's native servers or on Imgur.

            Artists may offer one self-promotional comment per post."""
            },
            {
                "title": "No pictures of just text.",
                "description": "Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /c/standupshots), and screenshots of jokes. Here are some examples. Text posts using Ribbit's native system are allowed."
            },
            {
                "title": "No electronic messaging or social media content (including Ribbit).",
                "description": "Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed."
            }
        ],
        11: [
            {
                "title": "No vague support questions about WYSIWYG editors or other software.",
                "description": "No vague product support questions (like \"why is this plugin not working\" or \"how do I set up X\"). For vague product support questions, please use communities relevant to that product for best results. Specific issues that follow rule 6 are allowed."
            },
            {
                "title": "No memes, screenshots, and jokes",
                "description": "Do not post memes, screenshots of bad design, or jokes. Check out /c/ProgrammerHumor/ for this type of content."
            },
            {
                "title": "No self-promotion",
                "description": "Read and follow ribbiquette; no excessive self-promotion. Please refer to the Ribbit 9:1 rule when considering posting self promoting materials."
            },
            {
                "title": "No commercial promotions/solicitations",
                "description": "We do not allow any commercial promotion or solicitation. Violations can result in a ban."
            },
            {
                "title": "No soliciting feedback not on Saturday",
                "description": "Sharing your project, portfolio, or any other content that you want to either show off or request feedback on is limited to Showoff Saturday. If you post such content on any other day, it will be removed."
            },
            {
                "title": "Assistance Questions Guidelines",
                "description": """If you are asking for assistance on a problem, you are required to provide
- Context of the problem
- Research you have completed prior to requesting assistance
- Problem you are attempting to solve with high specificity
- Questions in violation of this rule will be removed or locked."""
            },
            {
                "title": "Career/Getting Started Questions",
                "description": "Highly specific career/getting started assistance questions are allowed so long as they follow the required assistance post guidelines."
            }
        ],
        12: [
            {
                "title": "Rule 1: This post is not IAF",
                "description": """Things that aren't IAF:

Something you made, like art or a bracelet

mildly interesting (architecture, earthporn, AI art, illusions)

Social media screenshots, or screenshots in general.

No unnecessary sound

Memes, funny things, edgy content

Things that are purely cute

Porn/NSFL things

Click bait, "Top 10 best X"

Just because something is old (historyporn) does not inherently make it IAF

This is not a complete list of what isn't IAF"""
            },
            {
                "title": "Rule 2: Post doesn't have a descriptive title",
                "description": """Make sure your title is descriptive. Users should be able to know what the post is generally about or if it's a pun they should get the joke after viewing the content of the post. If needed you can add additional information in the comment section. "This thing" is not an adequate title.

Titles should not be the only thing interesting about the post.

Title should not "piggy back" off other interesting posts. Example: "I see we're posting about X, well here's my X"."""
            },
            {
                "title": "Rule 3: No Spam",
                "description": """Don't be a spammer. No self promotion/marketing/product shilling. No website/blog promotion.

Don't encourage shillbots by asking where to buy the nifty toy/gadget."""
            },
            {
                "title": "Rule 4: No Gossip or tabloid esque material",
                "description": "This isn't the place for pop culture news/events nor is it a glorified image version of /c/TodayILearned. No \"talking head\" videos without extensive proof. This is not a tiktok/social media rehosting site (not explicitly banned, but must be informative and backed by proof)"
            },
            {
                "title": "Rule 5: Proof needed, and not provided",
                "description": "If your post declares something as fact, please cite a source in the comment section. Do not claim ownership or creation of something you did not create. Do not post false or misleading information. Credible sources only for claims, no obscure blogs or twitter. As a courtesy for some interesting posts, please provide background information so that Ribbitors can read for more info."
            },
            {
                "title": "Rule 6: Uncivil",
                "description": "We are here to learn and share interesting things. Don't be a jerk."
            },
            {
                "title": "Rule 7: No text on images",
                "description": "In most cases text on an image is useless. It can be put into the title or into the comment section. Text on gifs is sometimes useful, but still preferred to put information into the title and/or into the comment section. This also encourages discussion. There are some exceptions to this rule, mainly dates or little labeling on images/gifs/videos. Subtitles and diagram labels are allowed, but distracting text, emoji, music on videos are not allowed."
            },
            {
                "title": "Rule 8: Reposts",
                "description": """Usually there’s no ban for a repost, unless it’s done often due to karma farming. Reposts attract attention from mods who will check for bots, farming, shilling accounts. Do not repost something that was posted within 2 months. Use the search tools. If your reposts become an annoyance to mods, you will be banned.

If reporting a repost, provide a link to the previous post."""
            }
        ],
        13: [
            {
                "title": "Inaccurate/unverifiable/not supported by source",
                "description": "Please link directly to a reliable source that supports every claim in your post title. Images alone do not count as valid references. Videos are fine so long as they come from reputable sources (e.g. BBC, Discovery, etc)."
            },
            {
                "title": "No personal opinions/anecdotes/subjective posts",
                "description": "(e.g \"TIL xyz is a great movie\")"
            },
            {
                "title": "No recent sources",
                "description": "Any sources (blog, article, press release, video, etc.) more recent than two months are not allowed."
            },
            {
                "title": "No politics/agenda pushing",
                "description": "No submissions regarding or related to the following: recent politics, politicians, police misconduct, race/religion/gender, environmental issues, social issues, etc. See wiki for more detailed explanation"
            },
            {
                "title": "No misleading claims",
                "description": "Posts that omit essential information, or present unrelated facts in a way that suggest a connection will be removed."
            },
            {
                "title": "Too general/can't stand on its own/how to",
                "description": "a. Titles must begin with \"TIL\" or \"Today I Learned\" b. Make them descriptive, concise and specific (e.g. not \"TIL something interesting about bacon\"). c. Titles must be able to stand on their own without requiring readers to click on a link. d. \"TIL about ...\" and other broad posts don't belong on TIL."
            },
            {
                "title": "No submissions about software/websites",
                "description": "No submissions related to the usage, existence or features of specific software/websites (e.g. \"TIL you can click on widgets in WidgetMaker 1.22\")."
            }
        ],
        14: [
            {
                "title": "Rule 1 – Must be 25 years old or more",
                "description": "Everything from 1999 and after will be removed."
            },
            {
                "title": "Rule 2 – Must have year or decade in the title",
                "description": "Submissions without a year in the title will be removed. If you don’t know the exact year, make an educated guess and put the decade."
            },
            {
                "title": "Rule 3 – No offensive comments, offensive submissions or repost spam",
                "description": """Offensive comments include sexism, racism, homophobia and abuse. Offensive submissions include racist, homophobic or sexist post. Repost spamming is consistently submitting reposts. All these will get you a permanent ban.

It is up to moderators to decide whether a comment or submission is offensive enough to warrant a ban. However, here is a good rule of thumb to follow: If you wouldn’t say it or share it with your own mother, don’t say it or share it here."""
            },
            {
                "title": "Rule 4 – Don't mention death of relative in title",
                "description": "It is okay to submit photos of deceased relatives. It is not okay to mention that they have passed away in the title. Please include this information in a comment if you feel the need to share."
            },
            {
                "title": "Rule 5 – No reposts less than 6 months old",
                "description": ""
            },
            {
                "title": "Rule 6 – Must feature a person",
                "description": "This should be self-explanatory. No vehicles, buildings, animals, etc."
            },
            {
                "title": "Rule 7. No publicity photos of celebrities",
                "description": "You can still post normal photos of celebrities living life and doing their thing, but just not publicity photos."
            },
            {
                "title": "Rule 8 - No cinematic movie clips or stills",
                "description": "Old School Cool is for real life coolness not fictional coolness."
            }
        ],
        15: [
            {
                "title": "R1: No memes, meme-like pics, text heavy pics, overdone references.",
                "description": "We don't like memes because they're low quality. We also don't like text-heavy pics, because they are meme like, and we occasionally have verbal/text infuriation threads stickies for that purpose. Use the title to be descriptive of the pic! See this post. This includes \"trendy\" title names such as \"This shit.\" and this rule is automatically enforced by automoderator."
            },
            {
                "title": "R2a: No <6 month reposts or xposts unless it's OC.",
                "description": """a) Please try to post original content. Reposts or crossposts of someone else's content will be removed if it has been posted on Ribbit within the past 6 months.

We want fresh new content, and hopefully you do, too!"""
            },
            {
                "title": "R2b-c-d: No gifs cut short, big overlays, or surveys.",
                "description": """b) No GIFs that end slightly before something happens Example.

c) Unnecessarily overdone text, arrows, scribbles, or substantive edits over the original content are not allowed.

d) No surveys.

We feel that this community shouldn't act as a platform for survey spam and information harvesting, whether the surveys are academic in nature or not."""
            },
            {
                "title": "R2e: Blur personal info - Full names, numbers, etc.",
                "description": """Its a site-wide rule of Ribbit (rule 7) that you agreed to when you signed up. Don't post your own or others' personal information under any circumstances, as we can't verify of you are indeed posting your info.

Personal info can include: Full names, phone numbers, license plates, addresses, ID numbers, etc."""
            },
            {
                "title": "R3: Follow Ribbit sitewide rules.",
                "description": "The rules of Ribbit are site-wide rules created by the admins. Not following the rules may result in not only a ban from our community, but from Ribbit as well."
            },
            {
                "title": "R4: No meta Ribbit posts. This includes other communities, other users, the Ribbit site design.",
                "description": "Posts that in any way concern Ribbit shan't be allowed. This includes posts about other Ribbit users, about a particular community, and the content present in it, DMs or chat messages you've received, about the Ribbit website or Ribbit mobile app design."
            },
            {
                "title": "R5a-b: No grandstanding, politics or pushing agendas. No price complaint posts.",
                "description": "Material that could reasonably be deemed inappropriate whether politically, sexually, racially, or socially, is prohibited. This includes but is not limited to, discussion of illegal activities such as piracy, porn, and sexualization of minors. Posts that push an agenda of any sort is also prohibited, including inappropriate posts about this community or other subs as described in \"prevent brigading\" rule. If you're unsure if your post or comment falls under this rule, message the mods to ask!"
            }
        ],
        16: [
            {
                "title": "Be kind",
                "description": "Be kind to your fellow human. Polite or Constructive criticism is welcome but don't rag on other people's work or attempts to improve themselves. Especially beginners."
            },
            {
                "title": "No bashing",
                "description": "No bashing other frameworks. Reasoned criticism of React or any other library is welcome, but spare us your rants."
            },
            {
                "title": "Be inclusive",
                "description": "We all started somewhere. Telling people to \"get out\" of the industry or that they are not good enough in some shape or form is a bannable offense."
            },
            {
                "title": "Some Self-promotion OK, Spam not OK",
                "description": "You are definitely welcome to promote your own content as part of your participation in this community, but if you repeatedly post low quality crap you will be banned."
            },
            {
                "title": "Demos should link source code or live demos",
                "description": "We're all here to learn from you, but can't learn very much from a video recording. Please link some source code (or if not possible, we understand, link some live demo or codepen so that people can try you out and learn from you)"
            },
            {
                "title": "GitHub, not PornHub",
                "description": "We rarely get NSFW posts (e.g. links to NSFW apps built with React) but try not to be prudes. We're all adults here. We ask that NSFW posts nevertheless focus on the technology rather than the content. Therefore posts of NSFW React apps must link to source, not to the live NSFW app."
            },
            {
                "title": "Portfolios on Sundays only",
                "description": "If you want to show off or need feedback on your portfolios, you should post on Sundays, and Sundays only. Mods will remove such posts posted on other days."
            }
        ],
        17: [
            {
                "title": "All posts must relate to Flask.",
                "description": """All posts must pertain to The Pallets Projects' Flask in some way. If your post doesn't involve Flask, consider checking out c/Python."""
            },
            {
                "title": "Be thorough when asking for help.",
                "description": """If you’re encountering an error or if your code won’t behave as expected, include as much detail as possible. This includes:

- Error messages (if applicable)

- Relevant code from your program. Please be nice and format your code!

- Context - where is the code running? What steps have you taken so far?

Help c/Flask help you! And when your question has been solved, edit the title with the "Solved" flair."""
            },
            {
                "title": "Provide details when sharing your work.",
                "description": "Remember that others will be learning from your experience. Consider discussing what you learned, challenges you encountered, and best of all, the project source code."
            },
            {
                "title": "No spamming or repeated self-promotion.",
                "description": "Posting your personal project/tutorial multiple times, spamming post comments, or any other kind of repetitive self-promotion will result in a temporary ban. Repeat offenders will be banned permanently."
            }
        ],
        18: [
            {
                "title": "\"How do I\" questions belong in c/LearnPython",
                "description": "If you are about to ask a question about how to do something in python, please check out /c/learnpython. It is a very helpful community that is focused on helping people get answers that they understand."
            },
            {
                "title": "Posts must be relevant to the Python Programming Language",
                "description": "Please use other communities for things that are more generally programmer related, or for things that involve large snakes."
            },
            {
                "title": "Please don't downvote without commenting your reasoning for doing so",
                "description": "Obviously we can't enforce this one very easily, it more is a level of trust we have in our users. Please do not downvote comments without providing valid reasoning for doing so. This rule helps maintain a positive atmosphere on the community with both posts and comments."
            },
            {
                "title": "When posting projects please include both description text and a link to source code",
                "description": "When posting a project please include an image showing your project if applicable, a textual description of your project including how Python is relevant to it and a link to source code."
            },
            {
                "title": "Project posts must be text",
                "description": """When posting a project you must use a text post, not an image post, video post or similar.

Using new Ribbit you may embed these media types within the post body, including multiple images in one post.

Please write a bit about your project instead of just dumping links since it will increase the relevance of your project to the Python community."""
            },
            {
                "title": "Submission Titles must be descriptive",
                "description": "Titles for all submissions should describe the topic of the post and offer Ribbitors an idea of what the link or text covers. Vague titles which require clicking through to clarify the subject matter of the post will be removed."
            }
        ],
        19: [
            {
                "title": "Be polite.",
                "description": "Don't insult others; everyone comes to Python with a different level of knowledge and experience, and what is obvious to you may not be obvious to them."
            },
            {
                "title": "Posts to this community must be requests for help learning python.",
                "description": ""
            },
            {
                "title": "Replies on this community must be pertinent to the question OP asked.",
                "description": "This is not the place to advertise your blog/video/guide/tutorial. Nor is it the place to try and hire someone. If you want to learn, just post a question so we can answer it."
            },
            {
                "title": "No advertising. No blogs/tutorials/videos/books/recruiting attempts.",
                "description": "No advertising. This is not the place to advertise your book, video, blog, study group, company training video, bot, or really anything. No advertising, no recruiting."
            },
            {
                "title": "No replies copy / pasted from ChatGPT or similar.",
                "description": ""
            }
        ],
        20: [
            {
                "title": "No uncivil, bigoted, misogynist, misandrist, racist comments or posts.",
                "description": "No namecalling or personal attacks. No bigotry including but not limited to racism, homophobia, transphobia, sexism, etc."
            },
            {
                "title": "No Misinformation",
                "description": "Comments or posts that actively counter a plurality of scientific consensus or other well established facts."
            },
            {
                "title": "No Memes",
                "description": ""
            },
            {
                "title": "No language error posts",
                "description": "Errors of language are not Facepalms."
            },
            {
                "title": "No jokes/satire/trolls posts",
                "description": ""
            },
            {
                "title": "Remove identifying personal information",
                "description": "Please obscure/remove: names, usernames, business names, and other identifying elements from posts. (Only applicable to possible witch-hunt posts)"
            },
            {
                "title": "No \"likes\"/\"shares\" posts",
                "description": "\"This was shared x times\", \"This received x up/downvotes/likes\", etc, are not Facepalms"
            },
            {
                "title": "No \"Ribbit Meta\" Posts",
                "description": "No beefing about Ribbit bans, posts, mods or subs."
            },
            {
                "title": "No posts about politicians being politicians",
                "description": ""
            },
            {
                "title": "No posts attacking a political party or side",
                "description": ""
            }
        ],
        21: [
            {
                "title": "Be Welcoming.",
                "description": "n00bs are welcome here. Negativity is not."
            },
            {
                "title": "Include context and code in your post.",
                "description": "The better the question, the better the answers will be. If people cannot recreate or understand a problem, they cannot help as effectively. Consider including a code snippet, or perhaps even an entire <a href='https://jsfiddle.net' target='_blank'>JS fiddle</a>."
            },
        ]
    }

    # Build Rule objects by iterating over the dictionary.
    rule_objects = []
    for community_id, rules in rules_by_community.items():
        for rule_data in rules:
            # Automatically assign the community_id.
            rule_data["community_id"] = community_id
            rule_objects.append(Rule(**rule_data))

    db.session.add_all(rule_objects)
    db.session.commit()

def undo_rules():
    db.session.execute("DELETE FROM rules")
    db.session.commit()
