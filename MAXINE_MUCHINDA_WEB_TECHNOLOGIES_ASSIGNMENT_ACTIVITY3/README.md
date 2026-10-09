# Maxine Muchinda | ICT251 Web Technologies | Activity 3

An interactive personal portfolio built with plain HTML5, CSS and JavaScript for the Mulungushi University ICT251 course. It improves my Activity 2 website, keeping my own content, photos, video and audio.

**Live website:** https://YOUR-SITE-NAME.onrender.com *(replace after deployment)*

## What the website contains

About Me, My Hobbies, Projects and Skills, My Learning Plan (with a weekly timetable), My Photos, My Media (video and audio with written summaries) and a Contact form.

## Project structure

```
index.html
css/styles.css
js/script.js
images/   photo2.jpg, photo3.jpg, photo4.jpg
videos/   intro.mp4, voice.mp3, voice.ogg
```

## The four JavaScript features (all in `js/script.js`)

1. **Contact form validation and preview (compulsory).** Name, email and message are checked on submit. Empty or spaces-only name/message and badly formatted emails are rejected with an error beside the field. A valid form shows a preview on the page without reloading. The preview says the details were validated; nothing is sent. Typed text is displayed with `textContent`.
2. **Theme switch.** The button in the navigation switches between light and dark themes. The choice is saved in `localStorage`, and the first visit follows the visitor's system setting.
3. **Gallery viewer.** Previous and Next buttons change the displayed photo and its caption. Previous is disabled on the first photo and Next on the last.
4. **Project search and filter.** Type a keyword and/or choose a topic to filter the five projects. A Reset button restores the list, and a message appears when nothing matches.

## How to test

- **Form:** press *Check and Preview* with empty fields; enter spaces only; enter `abc@x` as the email; then enter valid details and check the preview.
- **Theme:** click the theme button, then refresh the page to see the choice remembered.
- **Gallery:** click Next twice to reach photo 3 (Next becomes disabled), then Previous back to photo 1.
- **Filter:** search for `flexbox`, then `zzz` (no-match message), then press Reset. Try the Topic list too.
- **Responsive and keyboard:** check at about 375 px and 1280 px wide; press Tab to see the visible focus outline.

## Deployment (Render static site)

| Setting | Value |
|---|---|
| Root Directory | *(blank)* |
| Build Command | `echo "No build required"` |
| Publish Directory | `.` |
| Auto Deploy | On, branch `main` |

## Sources and credits

- All photos, the video and the audio recording are my own.
- Learning resource: [MDN Web Docs – Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn).
- Code written by me for ICT251 Activity 3.
