# How to use this 💌

1. Unzip this folder.
2. Double-click `index.html` — it opens in your browser.
3. Tap through it. No scrolling — each part is its own full screen, and
   tapping moves you to the next one.

## Folder contents
```
dii-birthday/
├── index.html      <- the page itself, open this one
├── style.css        <- all the colors, fonts, animations
├── script.js         <- your message + all the interactive bits
├── images/          <- your 6 photos, already wired in
└── audio/            <- put your background song file here (see below)
```

## The order it plays in
1. **Gift box** — tap to unwrap
2. **Candle** — tap the flame to make a wish
3. **5 reason cards** — tap a card to flip it, tap empty space for next
4. **Photo gallery** — tap a photo to zoom in, tap empty space for next
5. **The letter** — types itself out
6. **Baking a cake** — tap the bowl to bake, then tap the candle to blow it out
7. **"Happy Birthday to my favourite sister!"** — confetti + music starts here
8. **The heart tree** — "I love you, Dii" with a tree full of heart leaves,
   floating balloons, and a "watch it again" button

There's also a back arrow (top-left) if she wants to revisit a page, and
small dots at the top showing how far through she is.

## Adding a background song 🎵
The music button (bottom-right, 🔈) is fully wired up — it just needs a
song file, since I can't include an actual copyrighted track for you.

1. Get an mp3 of a song you own or have the rights to use.
2. Rename it to exactly `theme-song.mp3`.
3. Put it inside the `audio/` folder.

Music will then also auto-attempt to start right when the "Happy Birthday"
message appears (browsers usually allow this since she'll have already
tapped several things by that point). If it doesn't, the 🔈 button always
works as a manual play/pause.

## If you want to change the words
Open `script.js`, look at the very top for a section called `CONTENT` —
name, the letter, the 5 reasons, the cake message, the tree heading, and
photo captions, all in one place. Edit, save, refresh.

## To send it to her as a link
Go to **https://app.netlify.com/drop** and drag this whole `dii-birthday`
folder onto the page (make sure `images/` and `audio/` come with it). You'll
get a free link in a few seconds.
