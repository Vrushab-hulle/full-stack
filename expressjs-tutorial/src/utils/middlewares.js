
//creating middleware to find userIndex
export const handleUserIndex = (req, res, next) => {
  const { params } = req;
  const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

export const middlewareExample = (req, res, next) => {
  console.log(`${req.method}-${req.url}`);
  next();
};