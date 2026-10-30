import pool from "./config/db.js";

// --------------------------------------------------
// 1. GENRES
// --------------------------------------------------

const genres = [
  ["Fiction", "Literary and contemporary fiction"],
  ["Fantasy", "Fantasy novels and magical adventures"],
  ["Dystopian", "Dystopian and speculative fiction"],
  ["Self Help", "Personal development and self improvement"],
  ["Mystery & Thriller", "Crime, suspense and mystery novels"],
  ["Romance", "Romantic fiction"],
  ["Science Fiction", "Futuristic and science-based fiction"],
  ["Business & Finance", "Business, entrepreneurship and finance"],
  ["Biography", "Memoirs and biographies"],
  ["History", "Historical nonfiction"],
  ["Young Adult", "Fiction for young adult readers"],
  ["Children", "Books for younger readers"],
  ["Psychology", "Psychology and human behavior"],
  ["Classics", "Classic literature"],
  ["Horror", "Horror and supernatural fiction"],
];

// --------------------------------------------------
// 2. AUTHORS
// --------------------------------------------------

const authors = [
  "James Clear",
  "Paulo Coelho",
  "George Orwell",
  "J.R.R. Tolkien",
  "J.K. Rowling",
  "Agatha Christie",
  "Stephen King",
  "Jane Austen",
  "Colleen Hoover",
  "Taylor Jenkins Reid",
  "Rebecca Yarros",
  "Sarah J. Maas",
  "Suzanne Collins",
  "Veronica Roth",
  "Frank Herbert",
  "Andy Weir",
  "Isaac Asimov",
  "George R.R. Martin",
  "Brandon Sanderson",
  "Neil Gaiman",
  "Matt Haig",
  "Alex Michaelides",
  "Freida McFadden",
  "Dan Brown",
  "Gillian Flynn",
  "Paula Hawkins",
  "Arthur Conan Doyle",
  "Harper Lee",
  "F. Scott Fitzgerald",
  "Ernest Hemingway",
  "Charlotte Brontë",
  "Emily Brontë",
  "Oscar Wilde",
  "Charles Dickens",
  "Mark Twain",
  "Louisa May Alcott",
  "Khaled Hosseini",
  "John Green",
  "Rick Riordan",
  "Roald Dahl",
  "C.S. Lewis",
  "Jeff Kinney",
  "Eric Carle",
  "Robert Kiyosaki",
  "Morgan Housel",
  "Napoleon Hill",
  "Dale Carnegie",
  "Simon Sinek",
  "Cal Newport",
  "Mark Manson",
  "Daniel Kahneman",
  "Yuval Noah Harari",
  "Michelle Obama",
  "Walter Isaacson",
  "Viktor E. Frankl",
  "Brianna Wiest",
  "Robin Sharma",
  "Patrick Rothfuss",
  "Lucy Foley",
  "Lois Lowry",
  "Orson Scott Card",
  "James Patterson",
  "Jojo Moyes",
  "Nicholas Sparks",
];

// --------------------------------------------------
// 3. BOOKS
// Format:
// [title, author, genre, ISBN, price]
// --------------------------------------------------

const books = [
  ["Atomic Habits", "James Clear", "Self Help", "9780735211292", 3500],
  ["The Alchemist", "Paulo Coelho", "Fiction", "9780061122415", 2800],
  ["1984", "George Orwell", "Dystopian", "9780451524935", 2500],
  ["The Name of the Wind", "Patrick Rothfuss", "Fantasy", "9780756404741", 3900],
  ["Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", "9780590353427", 3800],
  ["Murder on the Orient Express", "Agatha Christie", "Mystery & Thriller", "9780062693662", 2700],
  ["The Guest List", "Lucy Foley", "Mystery & Thriller", "9780062868930", 3400],
  ["The Shining", "Stephen King", "Horror", "9780307743657", 3500],
  ["Pride and Prejudice", "Jane Austen", "Classics", "9780141439518", 2200],
  ["It Ends with Us", "Colleen Hoover", "Romance", "9781501110368", 3600],
  ["The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "Fiction", "9781501161933", 3900],
  ["Fourth Wing", "Rebecca Yarros", "Fantasy", "9781649374042", 4900],
  ["A Court of Thorns and Roses", "Sarah J. Maas", "Fantasy", "9781635575569", 4500],
  ["The Hunger Games", "Suzanne Collins", "Young Adult", "9780439023481", 3300],
  ["The Giver", "Lois Lowry", "Dystopian", "9780544336261", 2700],
  ["Dune", "Frank Herbert", "Science Fiction", "9780441172719", 4200],
  ["The Martian", "Andy Weir", "Science Fiction", "9780553418026", 3800],
  ["Ender's Game", "Orson Scott Card", "Science Fiction", "9780812550702", 3500],
  ["A Game of Thrones", "George R.R. Martin", "Fantasy", "9780553593716", 4600],
  ["American Gods", "Neil Gaiman", "Fantasy", "9780062572233", 3900],
  ["The Midnight Library", "Matt Haig", "Fiction", "9780525559474", 3700],
  ["The Silent Patient", "Alex Michaelides", "Mystery & Thriller", "9781250301697", 3600],
  ["The Housemaid", "Freida McFadden", "Mystery & Thriller", "9781538742570", 3800],
  ["The Da Vinci Code", "Dan Brown", "Mystery & Thriller", "9780307474278", 3400],
  ["Gone Girl", "Gillian Flynn", "Mystery & Thriller", "9780307588371", 3600],
  ["The Girl on the Train", "Paula Hawkins", "Mystery & Thriller", "9781594634024", 3300],
  ["To Kill a Mockingbird", "Harper Lee", "Classics", "9780061120084", 2800],
  ["Jane Eyre", "Charlotte Brontë", "Classics", "9780141441146", 2800],
  ["Little Women", "Louisa May Alcott", "Classics", "9780147514011", 2900],
  ["The Kite Runner", "Khaled Hosseini", "Fiction", "9781594631931", 3400],
];


// 200 additional curated titles; ISBNs are resolved and checked against
// Open Library edition records at seed time, never guessed.
const additionalBooks = [
  [
    "The Fellowship of the Ring",
    "J.R.R. Tolkien",
    "Fantasy",
    2300
  ],
  [
    "The Two Towers",
    "J.R.R. Tolkien",
    "Fantasy",
    2530
  ],
  [
    "The Return of the King",
    "J.R.R. Tolkien",
    "Fantasy",
    2760
  ],
  [
    "The Silmarillion",
    "J.R.R. Tolkien",
    "Fantasy",
    2990
  ],
  [
    "The Lion, the Witch and the Wardrobe",
    "C.S. Lewis",
    "Fantasy",
    3220
  ],
  [
    "Prince Caspian",
    "C.S. Lewis",
    "Fantasy",
    3450
  ],
  [
    "The Voyage of the Dawn Treader",
    "C.S. Lewis",
    "Fantasy",
    3680
  ],
  [
    "The Silver Chair",
    "C.S. Lewis",
    "Fantasy",
    3910
  ],
  [
    "The Magician's Nephew",
    "C.S. Lewis",
    "Fantasy",
    4140
  ],
  [
    "The Last Battle",
    "C.S. Lewis",
    "Fantasy",
    4370
  ],
  [
    "The Horse and His Boy",
    "C.S. Lewis",
    "Fantasy",
    4600
  ],
  [
    "The Final Empire",
    "Brandon Sanderson",
    "Fantasy",
    4830
  ],
  [
    "The Well of Ascension",
    "Brandon Sanderson",
    "Fantasy",
    2300
  ],
  [
    "The Hero of Ages",
    "Brandon Sanderson",
    "Fantasy",
    2530
  ],
  [
    "The Way of Kings",
    "Brandon Sanderson",
    "Fantasy",
    2760
  ],
  [
    "Words of Radiance",
    "Brandon Sanderson",
    "Fantasy",
    2990
  ],
  [
    "Oathbringer",
    "Brandon Sanderson",
    "Fantasy",
    3220
  ],
  [
    "Rhythm of War",
    "Brandon Sanderson",
    "Fantasy",
    3450
  ],
  [
    "Warbreaker",
    "Brandon Sanderson",
    "Fantasy",
    3680
  ],
  [
    "Elantris",
    "Brandon Sanderson",
    "Fantasy",
    3910
  ],
  [
    "The Eye of the World",
    "Robert Jordan",
    "Fantasy",
    4140
  ],
  [
    "The Great Hunt",
    "Robert Jordan",
    "Fantasy",
    4370
  ],
  [
    "The Dragon Reborn",
    "Robert Jordan",
    "Fantasy",
    4600
  ],
  [
    "The Shadow Rising",
    "Robert Jordan",
    "Fantasy",
    4830
  ],
  [
    "The Fires of Heaven",
    "Robert Jordan",
    "Fantasy",
    2300
  ],
  [
    "The Lies of Locke Lamora",
    "Scott Lynch",
    "Fantasy",
    2530
  ],
  [
    "The Blade Itself",
    "Joe Abercrombie",
    "Fantasy",
    2760
  ],
  [
    "Before They Are Hanged",
    "Joe Abercrombie",
    "Fantasy",
    2990
  ],
  [
    "Last Argument of Kings",
    "Joe Abercrombie",
    "Fantasy",
    3220
  ],
  [
    "The Priory of the Orange Tree",
    "Samantha Shannon",
    "Fantasy",
    3450
  ],
  [
    "The Poppy War",
    "R. F. Kuang",
    "Fantasy",
    3680
  ],
  [
    "The Dragon Republic",
    "R. F. Kuang",
    "Fantasy",
    3910
  ],
  [
    "The Burning God",
    "R. F. Kuang",
    "Fantasy",
    4140
  ],
  [
    "Babel",
    "R. F. Kuang",
    "Fantasy",
    4370
  ],
  [
    "The Invisible Life of Addie LaRue",
    "V. E. Schwab",
    "Fantasy",
    4600
  ],
  [
    "A Darker Shade of Magic",
    "V. E. Schwab",
    "Fantasy",
    4830
  ],
  [
    "Vicious",
    "V. E. Schwab",
    "Fantasy",
    2300
  ],
  [
    "Neverwhere",
    "Neil Gaiman",
    "Fantasy",
    2530
  ],
  [
    "Stardust",
    "Neil Gaiman",
    "Fantasy",
    2760
  ],
  [
    "The Ocean at the End of the Lane",
    "Neil Gaiman",
    "Fantasy",
    2990
  ],
  [
    "The Colour of Magic",
    "Terry Pratchett",
    "Fantasy",
    3220
  ],
  [
    "Good Omens",
    "Terry Pratchett",
    "Fantasy",
    3450
  ],
  [
    "The Fifth Season",
    "N. K. Jemisin",
    "Fantasy",
    3680
  ],
  [
    "The Obelisk Gate",
    "N. K. Jemisin",
    "Fantasy",
    3910
  ],
  [
    "The Stone Sky",
    "N. K. Jemisin",
    "Fantasy",
    4140
  ],
  [
    "Project Hail Mary",
    "Andy Weir",
    "Science Fiction",
    4370
  ],
  [
    "Artemis",
    "Andy Weir",
    "Science Fiction",
    4600
  ],
  [
    "Children of Time",
    "Adrian Tchaikovsky",
    "Science Fiction",
    4830
  ],
  [
    "Children of Ruin",
    "Adrian Tchaikovsky",
    "Science Fiction",
    2300
  ],
  [
    "Leviathan Wakes",
    "James S. A. Corey",
    "Science Fiction",
    2530
  ],
  [
    "Caliban's War",
    "James S. A. Corey",
    "Science Fiction",
    2760
  ],
  [
    "Abaddon's Gate",
    "James S. A. Corey",
    "Science Fiction",
    2990
  ],
  [
    "Neuromancer",
    "William Gibson",
    "Science Fiction",
    3220
  ],
  [
    "Snow Crash",
    "Neal Stephenson",
    "Science Fiction",
    3450
  ],
  [
    "Seveneves",
    "Neal Stephenson",
    "Science Fiction",
    3680
  ],
  [
    "Hyperion",
    "Dan Simmons",
    "Science Fiction",
    3910
  ],
  [
    "The Fall of Hyperion",
    "Dan Simmons",
    "Science Fiction",
    4140
  ],
  [
    "The Three-Body Problem",
    "Liu Cixin",
    "Science Fiction",
    4370
  ],
  [
    "The Dark Forest",
    "Liu Cixin",
    "Science Fiction",
    4600
  ],
  [
    "Death's End",
    "Liu Cixin",
    "Science Fiction",
    4830
  ],
  [
    "Do Androids Dream of Electric Sheep?",
    "Philip K. Dick",
    "Science Fiction",
    2300
  ],
  [
    "The Man in the High Castle",
    "Philip K. Dick",
    "Science Fiction",
    2530
  ],
  [
    "Ubik",
    "Philip K. Dick",
    "Science Fiction",
    2760
  ],
  [
    "The Left Hand of Darkness",
    "Ursula K. Le Guin",
    "Science Fiction",
    2990
  ],
  [
    "The Dispossessed",
    "Ursula K. Le Guin",
    "Science Fiction",
    3220
  ],
  [
    "A Wizard of Earthsea",
    "Ursula K. Le Guin",
    "Fantasy",
    3450
  ],
  [
    "The Tombs of Atuan",
    "Ursula K. Le Guin",
    "Fantasy",
    3680
  ],
  [
    "The Farthest Shore",
    "Ursula K. Le Guin",
    "Fantasy",
    3910
  ],
  [
    "I, Robot",
    "Isaac Asimov",
    "Science Fiction",
    4140
  ],
  [
    "The Caves of Steel",
    "Isaac Asimov",
    "Science Fiction",
    4370
  ],
  [
    "The Naked Sun",
    "Isaac Asimov",
    "Science Fiction",
    4600
  ],
  [
    "The Robots of Dawn",
    "Isaac Asimov",
    "Science Fiction",
    4830
  ],
  [
    "Ready Player One",
    "Ernest Cline",
    "Science Fiction",
    2300
  ],
  [
    "Ready Player Two",
    "Ernest Cline",
    "Science Fiction",
    2530
  ],
  [
    "Dark Matter",
    "Blake Crouch",
    "Science Fiction",
    2760
  ],
  [
    "Recursion",
    "Blake Crouch",
    "Science Fiction",
    2990
  ],
  [
    "Upgrade",
    "Blake Crouch",
    "Science Fiction",
    3220
  ],
  [
    "The Time Machine",
    "H. G. Wells",
    "Science Fiction",
    3450
  ],
  [
    "The War of the Worlds",
    "H. G. Wells",
    "Science Fiction",
    3680
  ],
  [
    "The Invisible Man",
    "H. G. Wells",
    "Science Fiction",
    3910
  ],
  [
    "Brave New World",
    "Aldous Huxley",
    "Dystopian",
    4140
  ],
  [
    "Fahrenheit 451",
    "Ray Bradbury",
    "Dystopian",
    4370
  ],
  [
    "The Handmaid's Tale",
    "Margaret Atwood",
    "Dystopian",
    4600
  ],
  [
    "The Testaments",
    "Margaret Atwood",
    "Dystopian",
    4830
  ],
  [
    "Never Let Me Go",
    "Kazuo Ishiguro",
    "Dystopian",
    2300
  ],
  [
    "The Road",
    "Cormac McCarthy",
    "Dystopian",
    2530
  ],
  [
    "Station Eleven",
    "Emily St. John Mandel",
    "Dystopian",
    2760
  ],
  [
    "The Power",
    "Naomi Alderman",
    "Dystopian",
    2990
  ],
  [
    "The Maze Runner",
    "James Dashner",
    "Dystopian",
    3220
  ],
  [
    "The Scorch Trials",
    "James Dashner",
    "Dystopian",
    3450
  ],
  [
    "The Death Cure",
    "James Dashner",
    "Dystopian",
    3680
  ],
  [
    "Legend",
    "Marie Lu",
    "Dystopian",
    3910
  ],
  [
    "Prodigy",
    "Marie Lu",
    "Dystopian",
    4140
  ],
  [
    "Champion",
    "Marie Lu",
    "Dystopian",
    4370
  ],
  [
    "Unwind",
    "Neal Shusterman",
    "Dystopian",
    4600
  ],
  [
    "Scythe",
    "Neal Shusterman",
    "Dystopian",
    4830
  ],
  [
    "Thunderhead",
    "Neal Shusterman",
    "Dystopian",
    2300
  ],
  [
    "The Toll",
    "Neal Shusterman",
    "Dystopian",
    2530
  ],
  [
    "Red Rising",
    "Pierce Brown",
    "Dystopian",
    2760
  ],
  [
    "Golden Son",
    "Pierce Brown",
    "Dystopian",
    2990
  ],
  [
    "Morning Star",
    "Pierce Brown",
    "Dystopian",
    3220
  ],
  [
    "The Girl with the Dragon Tattoo",
    "Stieg Larsson",
    "Mystery & Thriller",
    3450
  ],
  [
    "The Girl Who Played with Fire",
    "Stieg Larsson",
    "Mystery & Thriller",
    3680
  ],
  [
    "The Girl Who Kicked the Hornets' Nest",
    "Stieg Larsson",
    "Mystery & Thriller",
    3910
  ],
  [
    "Big Little Lies",
    "Liane Moriarty",
    "Mystery & Thriller",
    4140
  ],
  [
    "The Husband's Secret",
    "Liane Moriarty",
    "Mystery & Thriller",
    4370
  ],
  [
    "The Woman in the Window",
    "A. J. Finn",
    "Mystery & Thriller",
    4600
  ],
  [
    "The Couple Next Door",
    "Shari Lapena",
    "Mystery & Thriller",
    4830
  ],
  [
    "The Last Mrs. Parrish",
    "Liv Constantine",
    "Mystery & Thriller",
    2300
  ],
  [
    "The Woman in Cabin 10",
    "Ruth Ware",
    "Mystery & Thriller",
    2530
  ],
  [
    "In a Dark, Dark Wood",
    "Ruth Ware",
    "Mystery & Thriller",
    2760
  ],
  [
    "The Turn of the Key",
    "Ruth Ware",
    "Mystery & Thriller",
    2990
  ],
  [
    "The Paris Apartment",
    "Lucy Foley",
    "Mystery & Thriller",
    3220
  ],
  [
    "The Hunting Party",
    "Lucy Foley",
    "Mystery & Thriller",
    3450
  ],
  [
    "The Maid",
    "Nita Prose",
    "Mystery & Thriller",
    3680
  ],
  [
    "The Thursday Murder Club",
    "Richard Osman",
    "Mystery & Thriller",
    3910
  ],
  [
    "The Man Who Died Twice",
    "Richard Osman",
    "Mystery & Thriller",
    4140
  ],
  [
    "The Bullet That Missed",
    "Richard Osman",
    "Mystery & Thriller",
    4370
  ],
  [
    "The Last Devil to Die",
    "Richard Osman",
    "Mystery & Thriller",
    4600
  ],
  [
    "The Cuckoo's Calling",
    "Robert Galbraith",
    "Mystery & Thriller",
    4830
  ],
  [
    "The Silkworm",
    "Robert Galbraith",
    "Mystery & Thriller",
    2300
  ],
  [
    "Career of Evil",
    "Robert Galbraith",
    "Mystery & Thriller",
    2530
  ],
  [
    "The Reversal",
    "Michael Connelly",
    "Mystery & Thriller",
    2760
  ],
  [
    "The Lincoln Lawyer",
    "Michael Connelly",
    "Mystery & Thriller",
    2990
  ],
  [
    "The Poet",
    "Michael Connelly",
    "Mystery & Thriller",
    3220
  ],
  [
    "The Firm",
    "John Grisham",
    "Mystery & Thriller",
    3450
  ],
  [
    "The Pelican Brief",
    "John Grisham",
    "Mystery & Thriller",
    3680
  ],
  [
    "A Time to Kill",
    "John Grisham",
    "Mystery & Thriller",
    3910
  ],
  [
    "The Client",
    "John Grisham",
    "Mystery & Thriller",
    4140
  ],
  [
    "The Runaway Jury",
    "John Grisham",
    "Mystery & Thriller",
    4370
  ],
  [
    "The Nightingale",
    "Kristin Hannah",
    "Fiction",
    4600
  ],
  [
    "The Great Alone",
    "Kristin Hannah",
    "Fiction",
    4830
  ],
  [
    "The Four Winds",
    "Kristin Hannah",
    "Fiction",
    2300
  ],
  [
    "The Women",
    "Kristin Hannah",
    "Fiction",
    2530
  ],
  [
    "Where the Crawdads Sing",
    "Delia Owens",
    "Fiction",
    2760
  ],
  [
    "Lessons in Chemistry",
    "Bonnie Garmus",
    "Fiction",
    2990
  ],
  [
    "Tomorrow, and Tomorrow, and Tomorrow",
    "Gabrielle Zevin",
    "Fiction",
    3220
  ],
  [
    "A Man Called Ove",
    "Fredrik Backman",
    "Fiction",
    3450
  ],
  [
    "Anxious People",
    "Fredrik Backman",
    "Fiction",
    3680
  ],
  [
    "Beartown",
    "Fredrik Backman",
    "Fiction",
    3910
  ],
  [
    "Us Against You",
    "Fredrik Backman",
    "Fiction",
    4140
  ],
  [
    "My Grandmother Asked Me to Tell You She's Sorry",
    "Fredrik Backman",
    "Fiction",
    4370
  ],
  [
    "The Book Thief",
    "Markus Zusak",
    "Fiction",
    4600
  ],
  [
    "All the Light We Cannot See",
    "Anthony Doerr",
    "Fiction",
    4830
  ],
  [
    "Cloud Cuckoo Land",
    "Anthony Doerr",
    "Fiction",
    2300
  ],
  [
    "The Goldfinch",
    "Donna Tartt",
    "Fiction",
    2530
  ],
  [
    "The Secret History",
    "Donna Tartt",
    "Fiction",
    2760
  ],
  [
    "Normal People",
    "Sally Rooney",
    "Fiction",
    2990
  ],
  [
    "Conversations with Friends",
    "Sally Rooney",
    "Fiction",
    3220
  ],
  [
    "Beautiful World, Where Are You",
    "Sally Rooney",
    "Fiction",
    3450
  ],
  [
    "Intermezzo",
    "Sally Rooney",
    "Fiction",
    3680
  ],
  [
    "The Vanishing Half",
    "Brit Bennett",
    "Fiction",
    3910
  ],
  [
    "Americanah",
    "Chimamanda Ngozi Adichie",
    "Fiction",
    4140
  ],
  [
    "Half of a Yellow Sun",
    "Chimamanda Ngozi Adichie",
    "Fiction",
    4370
  ],
  [
    "Purple Hibiscus",
    "Chimamanda Ngozi Adichie",
    "Fiction",
    4600
  ],
  [
    "A Thousand Splendid Suns",
    "Khaled Hosseini",
    "Fiction",
    4830
  ],
  [
    "And the Mountains Echoed",
    "Khaled Hosseini",
    "Fiction",
    2300
  ],
  [
    "The Remains of the Day",
    "Kazuo Ishiguro",
    "Fiction",
    2530
  ],
  [
    "Klara and the Sun",
    "Kazuo Ishiguro",
    "Fiction",
    2760
  ],
  [
    "The Buried Giant",
    "Kazuo Ishiguro",
    "Fantasy",
    2990
  ],
  [
    "The Fault in Our Stars",
    "John Green",
    "Young Adult",
    3220
  ],
  [
    "Looking for Alaska",
    "John Green",
    "Young Adult",
    3450
  ],
  [
    "Paper Towns",
    "John Green",
    "Young Adult",
    3680
  ],
  [
    "Turtles All the Way Down",
    "John Green",
    "Young Adult",
    3910
  ],
  [
    "Eleanor & Park",
    "Rainbow Rowell",
    "Young Adult",
    4140
  ],
  [
    "Fangirl",
    "Rainbow Rowell",
    "Young Adult",
    4370
  ],
  [
    "The Perks of Being a Wallflower",
    "Stephen Chbosky",
    "Young Adult",
    4600
  ],
  [
    "Aristotle and Dante Discover the Secrets of the Universe",
    "Benjamin Alire Sáenz",
    "Young Adult",
    4830
  ],
  [
    "The Hate U Give",
    "Angie Thomas",
    "Young Adult",
    2300
  ],
  [
    "One of Us Is Lying",
    "Karen M. McManus",
    "Young Adult",
    2530
  ],
  [
    "One of Us Is Next",
    "Karen M. McManus",
    "Young Adult",
    2760
  ],
  [
    "We Were Liars",
    "E. Lockhart",
    "Young Adult",
    2990
  ],
  [
    "The Cruel Prince",
    "Holly Black",
    "Fantasy",
    3220
  ],
  [
    "The Wicked King",
    "Holly Black",
    "Fantasy",
    3450
  ],
  [
    "The Queen of Nothing",
    "Holly Black",
    "Fantasy",
    3680
  ],
  [
    "Caraval",
    "Stephanie Garber",
    "Fantasy",
    3910
  ],
  [
    "Legendary",
    "Stephanie Garber",
    "Fantasy",
    4140
  ],
  [
    "Finale",
    "Stephanie Garber",
    "Fantasy",
    4370
  ],
  [
    "Once Upon a Broken Heart",
    "Stephanie Garber",
    "Fantasy",
    4600
  ],
  [
    "The Ballad of Never After",
    "Stephanie Garber",
    "Fantasy",
    4830
  ],
  [
    "A Curse for True Love",
    "Stephanie Garber",
    "Fantasy",
    2300
  ],
  [
    "Beach Read",
    "Emily Henry",
    "Romance",
    2530
  ],
  [
    "People We Meet on Vacation",
    "Emily Henry",
    "Romance",
    2760
  ],
  [
    "Book Lovers",
    "Emily Henry",
    "Romance",
    2990
  ],
  [
    "Happy Place",
    "Emily Henry",
    "Romance",
    3220
  ],
  [
    "Funny Story",
    "Emily Henry",
    "Romance",
    3450
  ],
  [
    "The Love Hypothesis",
    "Ali Hazelwood",
    "Romance",
    3680
  ],
  [
    "Love on the Brain",
    "Ali Hazelwood",
    "Romance",
    3910
  ],
  [
    "Love, Theoretically",
    "Ali Hazelwood",
    "Romance",
    4140
  ],
  [
    "The Spanish Love Deception",
    "Elena Armas",
    "Romance",
    4370
  ],
  [
    "The American Roommate Experiment",
    "Elena Armas",
    "Romance",
    4600
  ],
  [
    "The Hating Game",
    "Sally Thorne",
    "Romance",
    4830
  ],
  [
    "The Kiss Quotient",
    "Helen Hoang",
    "Romance",
    2300
  ],
  [
    "The Bride Test",
    "Helen Hoang",
    "Romance",
    2530
  ],
  [
    "The Heart Principle",
    "Helen Hoang",
    "Romance",
    2760
  ],
  [
    "Me Before You",
    "Jojo Moyes",
    "Romance",
    2990
  ],
  [
    "After You",
    "Jojo Moyes",
    "Romance",
    3220
  ],
  [
    "Still Me",
    "Jojo Moyes",
    "Romance",
    3450
  ],
  [
    "The Notebook",
    "Nicholas Sparks",
    "Romance",
    3680
  ],
  [
    "A Walk to Remember",
    "Nicholas Sparks",
    "Romance",
    3910
  ]
];


// --------------------------------------------------
// 4. SAFE ISBN LOOKUP AND VALIDATION
// --------------------------------------------------

const normalize = (value) => String(value || "")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

function validIsbn(value) {
  const isbn = String(value || "").replace(/[-\s]/g, "");
  if (/^\d{13}$/.test(isbn)) {
    const sum = [...isbn].reduce((total, digit, index) =>
      total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
    return sum % 10 === 0;
  }
  if (/^\d{9}[\dXx]$/.test(isbn)) {
    const sum = [...isbn.toUpperCase()].reduce((total, digit, index) =>
      total + (digit === "X" ? 10 : Number(digit)) * (10 - index), 0);
    return sum % 11 === 0;
  }
  return false;
}

async function getJson(url, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`Open Library HTTP ${response.status}`);
      }
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      if (attempt === attempts) throw error;
      await new Promise(resolve => setTimeout(resolve, attempt * 1500));
    }
  }
  return null;
}

async function findVerifiedIsbn(title, author) {
  const query = new URLSearchParams({
    title,
    author,
    fields: "title,author_name,isbn,edition_key",
    limit: "10",
  });
  const result = await getJson(`https://openlibrary.org/search.json?${query}`);
  if (!result?.docs?.length) return null;
  const match = result.docs.find(doc =>
    normalize(doc.title) === normalize(title) &&
    (doc.author_name || []).some(name => normalize(name) === normalize(author))
  );
  if (!match) return null;

  // Confirm an ISBN belongs to an actual Open Library edition.
  for (const editionKey of (match.edition_key || []).slice(0, 5)) {
    const edition = await getJson(`https://openlibrary.org/books/${encodeURIComponent(editionKey)}.json`);
    if (!edition) continue;
    const candidates = [...(edition.isbn_13 || []), ...(edition.isbn_10 || [])];
    const isbn = candidates.find(validIsbn);
    if (isbn) return isbn;
  }
  return null;
}

// --------------------------------------------------
// 5. SEED FUNCTION
// --------------------------------------------------

async function seedDatabase() {
  const client = await pool.connect();
  let added = 0;
  let alreadyPresent = 0;
  let unverified = 0;
  let lookupErrors = 0;
  try {
    // Seed original 30 with their explicitly supplied ISBNs.
    // The additional 200 require live ISBN verification before insertion.
    const planned = [
      ...books.map(([title, author, genre, isbn, price]) => ({title, author, genre, isbn, price})),
      ...additionalBooks.map(([title, author, genre, price]) => ({title, author, genre, price})),
    ];

    // Check the ISBNs in the existing seed list for valid check digits.
    for (const book of planned) {
      if (book.isbn && !validIsbn(book.isbn)) {
        throw new Error(`Invalid ISBN in original seed: ${book.title} (${book.isbn})`);
      }
    }

    // Network lookups happen outside transactions to avoid long DB locks.
    for (const book of planned) {
      const exists = await client.query(
        `SELECT 1 FROM book WHERE LOWER(TRIM(title)) = LOWER(TRIM($1)) LIMIT 1`,
        [book.title]
      );
      if (exists.rowCount) {
        alreadyPresent++;
        continue;
      }
      if (!book.isbn) {
        try {
          book.isbn = await findVerifiedIsbn(book.title, book.author);
        } catch (error) {
          lookupErrors++;
          console.warn(`Lookup error: ${book.title}: ${error.message}`);
          continue;
        }
        if (!book.isbn) {
          unverified++;
          console.warn(`Skipped (no verified ISBN): ${book.title}`);
          continue;
        }
      }

      try {
        await client.query("BEGIN");
        await client.query(
          `INSERT INTO genre (name, description)
           SELECT $1::varchar, $2::text WHERE NOT EXISTS
           (SELECT 1 FROM genre WHERE LOWER(name) = LOWER($1::text))`,
          [book.genre, `${book.genre} books`]
        );
        await client.query(
          `INSERT INTO author (name)
           SELECT $1::varchar WHERE NOT EXISTS
           (SELECT 1 FROM author WHERE LOWER(name) = LOWER($1::text))`,
          [book.author]
        );
        const authorResult = await client.query(
          `SELECT author_id FROM author WHERE LOWER(name) = LOWER($1) ORDER BY author_id LIMIT 1`,
          [book.author]
        );
        const genreResult = await client.query(
          `SELECT genre_id FROM genre WHERE LOWER(name) = LOWER($1) ORDER BY genre_id LIMIT 1`,
          [book.genre]
        );
        const inserted = await client.query(
          `INSERT INTO book
           (title, author_id, genre_id, isbn, description, cover_url,
            price, stock_quantity, restock_threshold, is_active)
           SELECT $1::varchar, $2::integer, $3::integer, $4::varchar, $5::text, $6::text, $7::numeric, 20, 5, true
           WHERE NOT EXISTS (SELECT 1 FROM book WHERE isbn = $4::varchar)
             AND NOT EXISTS (SELECT 1 FROM book WHERE LOWER(TRIM(title)) = LOWER(TRIM($1::text)))
           RETURNING title`,
          [book.title, authorResult.rows[0].author_id, genreResult.rows[0].genre_id,
           book.isbn, `Discover ${book.title} by ${book.author}.`,
           `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`,
           book.price]
        );
        await client.query("COMMIT");
        if (inserted.rowCount) {
          added++;
          console.log(`Added ${added}: ${book.title} (${book.isbn})`);
        } else {
          alreadyPresent++;
          console.log(`Skipped duplicate ISBN/title: ${book.title}`);
        }
      } catch (error) {
        await client.query("ROLLBACK");
        console.error(`Database error on ${book.title}: ${error.message}`);
        throw error; // Stop instead of concealing schema/constraint errors.
      }
    }
    const result = await client.query("SELECT COUNT(*) AS total FROM book");
    console.log(`\nSeed complete: ${added} inserted, ${alreadyPresent} already present, ${unverified} unverified, ${lookupErrors} lookup errors.`);
    console.log(`Total books now in database: ${result.rows[0].total}`);
    console.log("Re-run the seeder to retry any skipped network lookups.");
  } catch (error) {
    console.error("Seeding stopped:", error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
