export const createSummary = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    res.json({ videoId, summary: 'Summary placeholder' });
  } catch (error) {
    next(error);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    res.json({ videoId, summary: 'Summary placeholder' });
  } catch (error) {
    next(error);
  }
};
