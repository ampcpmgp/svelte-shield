import Home from "./Home.svelte";
import Speak from "./Speak.svelte";
import Books from "./Books.svelte";
import Book from "./Book.svelte";
import NotFound from "./NotFound.svelte";

export default {
  "/": Home,
  "/speak": Speak,
  "/books": Books,
  "/books/:hash": Book,
  "*": NotFound,
};
