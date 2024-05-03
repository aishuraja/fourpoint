exports.userBoard = (req, res) => {
  const resp_body = {
    "full_name": req.body.full_name,
    "email": req.body.email
  }
  res.status(200).send(resp_body);
};