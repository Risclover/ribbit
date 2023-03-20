from app.models import db, Rule

def seed_rules():
    community1_rule1 = Rule(
        title = "No kissing",
        description = "No kissing ok",
        community_id = 1
    )
    community1_rule2 = Rule(
        title = "Nudists only",
        description = "Only nudists allowed. Take your clothes off.",
        community_id = 1
    )
    community2_rule1 = Rule(
        title = "Be nice!!",
        description = "Those who aren't nice will get booted and banned.",
        community_id = 2
    )
    community10_rule1 = Rule(
        title="All posts must make an attempt at humor.",
        description="Humor is subjective, but all posts must at least make an attempt at humor. Posts which are intentionally disruptive, inane, or nonsensical will be removed.",
        community_id=10
    )
    community10_rule2 = Rule(
        title="No memes, HIFW, MRW, MeIRL, DAE, or similar posts.",
        description="Memes of any sort are expressly forbidden. This includes any variety of memetic image or video format, any footage or photographs of memes in real-world or virtual settings (as with \"challenges\" and other imitated behaviors), and any derivation or adaptation of memetic content. HIFW, MRW, TFW, MeIRL, demotivationals, eCards, and DAE posts are similarly disallowed. Non-memetic image macros are allowed.",
        community_id=10
    )
    community10_rule3 = Rule(
        title="No reposts.",
        description="If a given piece of content has appeared on /c/Funny before, do not post it. Sites like KarmaDecay and TinEye can help to determine the uniqueness of a given submission, but since neither site is 100% accurate, original content is strongly preferred. Serial reposters will be banned.",
        community_id=10
    )
    community10_rule4 = Rule(
        title="No personal info, no hate speech, no harassment.",
        description="No personally identifying information, including anything hosted on platforms making that information public. Posts encouraging the harassment of any individual, group, community, or community will be removed and may result in a ban. If necessary, a report will be made to the site administration. In accordance with Ribbit's policies, there is zero tolerance for this.",
        community_id=10
    )
    community10_rule5 = Rule(
        title="No politics or political figures.",
        description="Anything which involves or includes politics or a political figure – even if they are not the focus of the post – may not be posted here. Try c/politicalhumor instead.",
        community_id=10
    )
    community10_rule6 = Rule(
        title="No forbidden titles, low-effort titles, or posts about Ribbit cakedays.",
        description="No asking for upvotes (in any form), no “Cake Day” posts, and no posts to communicate with another Ribbitor. Posts with titles such as \"I got banned from /c/___\" or \"This got removed from /c/___\" are not allowed. For an inclusive list, please read the complete rules page. Low-effort titles, memetic titles, titles which circumvent other rules, and titles comprising excessive or disruptive emojis are similarly disallowed.",
        community_id=10
    )
    community10_rule7 = Rule(
        title="No gore, pornography, or animal cruelty.",
        description="Gore, pornography, and sexually-graphic images are not allowed. Try /c/NSFWfunny. Animal cruelty is strictly forbidden. All other NSFW content must be tagged as such.",
        community_id=10
    )
    community10_rule8 = Rule(
        title="No unoriginal comics.",
        description="""Comics may only be posted on Wednesdays and Sundays (measured using Pacific Time), and only by their original artists.

            All comics submitted to /c/Funny must be hosted either on Ribbit's native servers or on Imgur.

            Artists may offer one self-promotional comment per post.""",
        community_id=10
    )
    community10_rule9 = Rule(
        title="No pictures of just text.",
        description="Image-based submissions in which the humor can be conveyed via text alone are not allowed. This includes pictures of text with images that don't add necessary context, transcriptions of standup comedy (as with /c/standupshots), and screenshots of jokes. Here are some examples. Text posts using Ribbit's native system are allowed.",
        community_id=10
    )
    community10_rule10 = Rule(
        title="No electronic messaging or social media content (including Ribbit).",
        description="Social media content of any kind is not allowed. This includes anything from any form of \"comments section\" on the Internet, as well as content accompanied by text from those platforms. Screenshots of electronic messages of any variety are not allowed. Images with added Snapchat text are allowed, as long as all UI elements have been removed.",
        community_id=10
    )
    community11_rule1=Rule(
        title="No vague support questions about WYSIWYG editors or other software.",
        description="No vague product support questions (like \"why is this plugin not working\" or \"how do I set up X\"). For vague product support questions, please use communities relevant to that product for best results. Specific issues that follow rule 6 are allowed.",
        community_id=11
    )
    community11_rule2=Rule(
        title="No memes, screenshots, and jokes",
        description="Do not post memes, screenshots of bad design, or jokes. Check out /c/ProgrammerHumor/ for this type of content.",
        community_id=11
    )
    community11_rule3=Rule(
        title="No self-promotion",
        description="Read and follow ribbiquette; no excessive self-promotion. Please refer to the Ribbit 9:1 rule when considering posting self promoting materials.",
        community_id=11
    )
    community11_rule4=Rule(
        title="No commercial promotions/solicitations",
        description="We do not allow any commercial promotion or solicitation. Violations can result in a ban.",
        community_id=11
    )
    community11_rule5=Rule(
        title="No soliciting feedback not on Saturday",
        description="Sharing your project, portfolio, or any other content that you want to either show off or request feedback on is limited to Showoff Saturday. If you post such content on any other day, it will be removed.",
        community_id=11
    )
    community11_rule6=Rule(
        title="Assistance Questions Guidelines",
        description="""If you are asking for assistance on a problem, you are required to provide
- Context of the problem
- Research you have completed prior to requesting assistance
- Problem you are attempting to solve with high specificity
- Questions in violation of this rule will be removed or locked.""",
        community_id=11
    )
    community11_rule7=Rule(
        title="Career/Getting Started Questions",
        description="Highly specific career/getting started assistance questions are allowed so long as they follow the required assistance post guidelines.",
        community_id=11
    )

    db.session.add(community1_rule1)
    db.session.add(community1_rule2)
    db.session.add(community2_rule1)
    db.session.add(community10_rule1)
    db.session.add(community10_rule2)
    db.session.add(community10_rule3)
    db.session.add(community10_rule4)
    db.session.add(community10_rule5)
    db.session.add(community10_rule6)
    db.session.add(community10_rule7)
    db.session.add(community10_rule8)
    db.session.add(community10_rule9)
    db.session.add(community10_rule10)
    db.session.add(community11_rule1)
    db.session.add(community11_rule2)
    db.session.add(community11_rule3)
    db.session.add(community11_rule4)
    db.session.add(community11_rule5)
    db.session.add(community11_rule6)
    db.session.add(community11_rule7)

    db.session.commit()

def undo_rules():
    db.session.execute("DELETE FROM rules")
    db.session.commit()
