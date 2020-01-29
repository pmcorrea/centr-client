
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.folder_id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.note_id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folder_id === folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder_id === folderId).length