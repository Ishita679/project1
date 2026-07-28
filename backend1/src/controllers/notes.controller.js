export const listNotes = async (_req, res, next) => {
  try {
    res.json({ notes: [] });
  } catch (error) {
    next(error);
  }
};
