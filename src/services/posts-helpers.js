export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findPost = (posts=[], postId) =>
  posts.find(post => post.id === postId)

export const getPostsForFolder = (posts=[], folderId) => (
  (!folderId)
    ? posts
    : posts.filter(post => post.folder_id === folderId)
)

export const countPostsForFolder = (posts=[], folderId) =>
  posts.filter(post => post.folder_id === folderId).length
