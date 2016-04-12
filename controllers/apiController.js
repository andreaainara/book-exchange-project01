function index(req,res) {
  res.json({
    message: "Welcome to Book Exchange!",
    documentation_url: "https://github.com/andreaainara/book-exchange-project01/api.md",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes availaible endpoints"}
    ]
  });
}

module.exports.index = index;
