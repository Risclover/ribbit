from app.models import db, CommunitySettings

def seed_community_settings():
    community_1 = CommunitySettings(
        community_id=1,
        base_color="#0079d3",
        highlight="#0079d3",
        bg_color="#edeff1",
        community_icon="https://styles.redditmedia.com/t5_2qhta/styles/communityIcon_2fsd7ji8awg91.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="https://styles.redditmedia.com/t5_2qhta/styles/bannerBackgroundImage_9opwiul6g1r81.jpg",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_2 = CommunitySettings(
        community_id=2,
        base_color="#0079d3",
        highlight="#0079d3",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2wjlc/styles/communityIcon_oyjnznh9lcq41.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_3 = CommunitySettings(
        community_id=3,
        base_color="#0079d3",
        highlight="#cc8b00",
        bg_color="#dae0e6",
        community_icon="https://a.thumbs.redditmedia.com/zDOFJTXd6fmlD58VDGypiV94Leflz11woxmgbGY6p_4.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_4 = CommunitySettings(
        community_id=4,
        base_color="#00a6a5",
        highlight="#007373",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2x93b/styles/communityIcon_eefpey65pli21.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#0aa18f",
        custom_banner_color=True,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_5 = CommunitySettings(
        community_id=5,
        base_color="#3d9494",
        highlight="#008080",
        bg_color="#ebebeb",
        community_icon="https://styles.redditmedia.com/t5_2qh1o/styles/communityIcon_p20mxkvgsafb1.jpg",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="208px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="https://styles.redditmedia.com/t5_2qh1o/styles/bannerBackgroundImage_vv8yp8rwh5fb1.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_6 = CommunitySettings(
        community_id=6,
        base_color="#6da4c5",
        highlight="#e37466",
        bg_color="#edeff1",
        community_icon="https://b.thumbs.redditmedia.com/lTgz7Yx_6n8VZemjf54viYVZgFhW2GlB6dlpj1ZwKbo.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_7 = CommunitySettings(
        community_id=7,
        base_color="#ff4500",
        highlight="#ff885b",
        bg_color="#edeff1",
        community_icon="https://styles.redditmedia.com/t5_2tex6/styles/communityIcon_70ds7qqgfr8b1.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="208px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="https://styles.redditmedia.com/t5_2tex6/styles/bannerBackgroundImage_z6ejudtdz7p41.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_8 = CommunitySettings(
        community_id=8,
        base_color="#ff4500",
        highlight="#014980",
        bg_color="#00a6a5",
        community_icon="https://a.thumbs.redditmedia.com/7uVDMO7_sDgkyDpvDmAT5D777ZOWAeU82PIG-L4kHL8.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_9 = CommunitySettings(
        community_id=9,
        base_color="#c0c0c0",
        highlight="#e30224",
        bg_color="#8893a4",
        community_icon="https://styles.redditmedia.com/t5_2s30g/styles/communityIcon_wpxjh8fuvcw51.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#999999",
        custom_banner_color=True,
        banner_img="https://styles.redditmedia.com/t5_2s30g/styles/bannerBackgroundImage_zjbes4zarmd01.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_10 = CommunitySettings(
        community_id=10,
        base_color="#0079d3",
        highlight="#0079d3",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2qhta/styles/communityIcon_2fsd7ji8awg91.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_11 = CommunitySettings(
        community_id=11,
        base_color="#014980",
        highlight="#be2f2f",
        bg_color="#fafafa",
        community_icon="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#d75b5b",
        custom_banner_color=True,
        banner_img="https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_12 = CommunitySettings(
        community_id=12,
        base_color="#ff1aa7",
        highlight="#450594",
        bg_color="#edeff1",
        community_icon="https://styles.redditmedia.com/t5_2qhsa/styles/communityIcon_zp89zqe7cdlb1.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="208px",
        banner_color="#ea0027",
        custom_banner_color=True,
        banner_img="https://styles.redditmedia.com/t5_2qhsa/styles/bannerBackgroundImage_3498khtiddlb1.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_13 = CommunitySettings(
        community_id=13,
        base_color="#0079d3",
        highlight="#0079d3",
        bg_color="#dae0e6",
        community_icon="https://b.thumbs.redditmedia.com/B7IpR8P1mEsQIjdizK5x79s5aGfJUtKk3u2ksGZ9n2Q.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_14 = CommunitySettings(
        community_id=14,
        base_color="#0079d3",
        highlight="#0079d3",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2tycb/styles/communityIcon_uadq4hbj2k451.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_15 = CommunitySettings(
        community_id=15,
        base_color="#ff8717",
        highlight="#646d73",
        bg_color="#ff8717",
        community_icon="https://styles.redditmedia.com/t5_2ubgg/styles/communityIcon_lkxajjefezh51.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="208",
        banner_color="#33a8ff",
        custom_banner_color=False,
        banner_img="https://styles.redditmedia.com/t5_2ubgg/styles/bannerBackgroundImage_qhj1ts036d811.jpg",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_16 = CommunitySettings(
        community_id=16,
        base_color="#014980",
        highlight="#cc3600",
        bg_color="#373c3f",
        community_icon="https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#014980",
        custom_banner_color=True,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_17 = CommunitySettings(
        community_id=17,
        base_color="#004b6b",
        highlight="#6d4100",
        bg_color="#ffffff",
        community_icon="https://styles.redditmedia.com/t5_2s1s3/styles/communityIcon_o4vkby94vkz41.png",
        hide_community_icon=False,
        name_format="c/",
        background_img="https://styles.redditmedia.com/t5_2s1s3/styles/backgroundImage_6sn0pqqdrnw41.jpg",
        background_img_format="tile",
        banner_height="192px",
        banner_color="#f8f8f8",
        custom_banner_color=True,
        banner_img="https://styles.redditmedia.com/t5_2s1s3/styles/bannerPositionedImage_7vdtuymugb951.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_18 = CommunitySettings(
        community_id=18,
        base_color="#223a55",
        highlight="#005ba1",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2qh0y/styles/communityIcon_h9cdwd9m75a51.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="144px",
        banner_color="#7193ff",
        custom_banner_color=True,
        banner_img="https://styles.redditmedia.com/t5_2qh0y/styles/bannerBackgroundImage_rluqfluf65a51.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_19 = CommunitySettings(
        community_id=19,
        base_color="#0079d3",
        highlight="#0266b3",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2r8ot/styles/communityIcon_jwr5s7l5ici61.png",
        hide_community_icon=True,
        name_format="c/",
        background_img_format="fill",
        banner_height="80px",
        banner_color="#3376ab",
        custom_banner_color=True,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_20 = CommunitySettings(
        community_id=20,
        base_color="#349e48",
        highlight="#46d160",
        bg_color="#edeff1",
        community_icon="https://styles.redditmedia.com/t5_2r5rp/styles/communityIcon_2c4ms7mggreb1.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="208px",
        banner_color="#66cc79",
        custom_banner_color=True,
        banner_img="https://styles.redditmedia.com/t5_2r5rp/styles/bannerBackgroundImage_xjz99n5qt8p61.png",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_21 = CommunitySettings(
        community_id=21,
        base_color="#f0db50",
        highlight="#0079d3",
        bg_color="#dae0e6",
        community_icon="https://styles.redditmedia.com/t5_2tugi/styles/communityIcon_7yzrvmem0wi31.png",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="144px",
        banner_color="#efd843",
        custom_banner_color=True,
        banner_img="",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )
    community_22 = CommunitySettings(
        community_id=22,
        base_color="#1a2e39",
        highlight="#03a9f4",
        bg_color="#2c404a",
        community_icon="https://styles.redditmedia.com/t5_323oy/styles/communityIcon_wqodb68q5gca1.jpg",
        hide_community_icon=False,
        name_format="c/",
        background_img_format="fill",
        banner_height="144px",
        banner_color="#1a2e39",
        custom_banner_color=False,
        banner_img="https://styles.redditmedia.com/t5_323oy/styles/bannerBackgroundImage_4eyw4qvlp4wa1.jpg",
        banner_img_format="center",
        secondary_banner_format="left",
        active_link_color="#0079d3",
        inactive_link_color="#c7c7c7",
        hover_link_color="#0079d3",
        menu_bg_color="#ff4500",
        submenu_bg_color="#ff4500",
    )

    db.session.add(community_1)
    db.session.add(community_2)
    db.session.add(community_3)
    db.session.add(community_4)
    db.session.add(community_5)
    db.session.add(community_6)
    db.session.add(community_7)
    db.session.add(community_8)
    db.session.add(community_9)
    db.session.add(community_10)
    db.session.add(community_11)
    db.session.add(community_12)
    db.session.add(community_13)
    db.session.add(community_14)
    db.session.add(community_15)
    db.session.add(community_16)
    db.session.add(community_17)
    db.session.add(community_18)
    db.session.add(community_19)
    db.session.add(community_20)
    db.session.add(community_21)
    db.session.add(community_22)
    db.session.commit()


def undo_community_settings():
    db.session.execute("DELETE FROM community_settings")
    db.session.commit()
