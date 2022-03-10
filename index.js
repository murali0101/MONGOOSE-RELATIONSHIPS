const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://muralimv:murali1234@cluster0.tzkmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};
//section schema
const sectionSchema = new mongoose.Schema(
  {
    sectionName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Section = mongoose.model("section", sectionSchema);
//book schema
const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true },
    body: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("book", bookSchema);
//author schema
const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Author = mongoose.model("author", authorSchema);
//CRUD section schema
app.get("/sections", async (req, res) => {
  try {
    const section = await Section.find().lean().exec();
    return res.status(200).send(section);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(200).send(section);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.patch("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(section);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.get("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();
    return res.status(200).send(section);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.delete("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).send(section);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
//CRUD book schema
app.get("/books", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
//CRUD author schema
app.get("/authors", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.patch("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.delete("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send("some thing went wrong", error);
  }
});
app.listen(4700, async () => {
  try {
    await connect();
  } catch (error) {
    console.log("error:", error);
  }
  console.log("listening port 4700");
});
