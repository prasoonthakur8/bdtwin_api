const logOut = async (req, res) => {
  await res.setHeader('token', '');

  return res.json({ message: 'The User successfully logged out.' });
};

export { logOut };
