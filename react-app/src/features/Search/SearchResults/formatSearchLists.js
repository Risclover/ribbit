export const formatCommunityList = (list) => {
  let communityList = Object.values(list).map((comm) => {
    return {
      name: comm.name,
      members: comm.members,
      communityImg: comm.communitySettings[comm.id].communityIcon,
      id: comm.id,
      description: comm.description,
      bgColor: comm.communitySettings[comm.id].baseColor,
    };
  });

  return communityList;
};

export const formatPostList = (list) => {
  let postList = Object.values(list).map((post) => {
    return {
      title: post.title,
      author: post.postAuthor.username,
      content: post.content,
      imgUrl: post.imgUrl,
      authorId: post.postAuthor.id,
      communityName: post.communityName,
      communityId: post.communityId,
      communityImg: post.communitySettings[post.id].communityIcon,
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      votes: post.votes,
      postComments: post.postComments,
    };
  });

  return postList;
};

export const formatCommentList = (list) => {
  let commentsList = [];
  let comment;
  for (let post of Object.values(list)) {
    let postAuthor = post.postAuthor.username;
    for (let i = 0; i < Object.values(post.postComments).length; i++) {
      comment = {
        postAuthor: postAuthor,
        postId: post.id,
        postTitle: post.title,
        postDate: post.createdAt,
        communityName: post.communityName,
        content: Object.values(post.postComments)[i].content,
        commentAuthor: Object.values(post.postComments)[i].commentAuthor
          .username,
        commentDate: Object.values(post.postComments)[i].createdAt,
        commentEdited: Object.values(post.postComments)[i].updatedAt,
        postEdited: post.updatedAt,
        postUpvotes: post.votes,
        postComments: Object.values(post.postComments).length,
        commentUpvotes: Object.values(post.postComments)[i].votes,
      };
      commentsList.push(comment);
    }
  }

  return commentsList;
};

export const formatUserList = (list) => {
  let userList = Object.values(list).map((user) => {
    return {
      profileImg: user.profile_img,
      username: user.username,
      id: user.id,
      karma: user.karma,
      about: user.about,
    };
  });

  return userList;
};
